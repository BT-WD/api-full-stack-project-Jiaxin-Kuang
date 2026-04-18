import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../css/App.css";

const App = () => {
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("2");
    const [radius, setRadius] = useState("5000");
    const [location, setLocation] = useState("");
    const [term, setTerm] = useState("");
    const [openNow, setOpenNow] = useState(false);

    const [restaurants, setRestaurants] = useState([]);

    const [offset, setOffset] = useState(0);
    const loadingRef = useRef(false);
    const [hasMore, setHasMore] = useState(true);

    async function getYelpRestaurants() {
        try {
            const res = await axios.get("https://api-full-stack-project-jiaxin-kuang.onrender.com/api/restaurants", {
                params: {
                    location: location,
                    category: category,
                    price: price,
                    radius: radius,
                    offset: offset,
                    open_now: openNow,
                },
            });

            console.log("Restaurants:", res.data);
            return res.data.businesses || [];
        } 
        catch (error) {
            console.error("Error fetching restaurants:", error.message);
            throw error;
        }
    }

    const handleFetch = async () => {
        if (loadingRef.current) return;

        loadingRef.current = true;
        setOffset(0);
        setHasMore(true);

        const data = await getYelpRestaurants(0);

        if (data.length > 0) {
            setRestaurants(data);
            displayRestaurant(data[0]);
        } 
        else {
            setRestaurants([]);
            setHasMore(false);
            document.getElementById("results").innerHTML = "No restaurants found!";
        }

        loadingRef.current = false;
    };

    const loadNextPage = async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;

        const nextOffset = offset + 50;
        const data = await getYelpRestaurants(nextOffset);

        if (data.length > 0) {
        setOffset(nextOffset);
            setRestaurants(data);
            displayRestaurant(data[0]);

            if (data.length < 50) {
                setHasMore(false);
            }
        } else {
        setHasMore(false);
            document.getElementById("results").innerHTML = "No more restaurants!";
        }

        loadingRef.current = false;
    };

    const displayRestaurant = async (restaurant) => {
        const resultsDiv = document.getElementById("results");

        if (!restaurant) return;

        resultsDiv.innerHTML = `
            <b>${restaurant.name}</b><br/>
            <img src="${restaurant.image_url}" alt="${restaurant.name}" width="200"/><br/>
            Rating: ${restaurant.rating}<br/>
            Address: ${restaurant.location.address1}, ${restaurant.location.city}<br/>
            Menu: ${restaurant.attributes.menu_url}<br/>
            Reviews: ${restaurant.url}<br/>
            Providing: ${restaurant.transactions}<br/>
        `;
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (loadingRef.current) return;
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;

            setRestaurants((prev) => {
            if (prev.length > 1) {
                const updated = prev.slice(1);
                displayRestaurant(updated[0]);
                return updated;
            }
            loadNextPage();
            return [];
        });
    };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [offset, loadingRef.current, hasMore]);

    return (
        <div className="App">
            <h1>Food Match</h1>
            <p>Find your perfect meal match!</p>

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Any</option>
                <option value="asianfusion">Asian Fusion</option>
                <option value="chinese">Chinese</option>
                <option value="cuban">Cuban</option>
                <option value="french">French</option>
                <option value="greek">Greek</option>
                <option value="indian">Indian</option>
                <option value="italian">Italian</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="latin">Latin American</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="mexican">Mexican</option>
                <option value="spanish">Spanish</option>
                <option value="thai">Thai</option>
                <option value="tex-mex">Tex-Mex</option>
                <option value="vietnamese">Vietnamese</option>
            </select>

            <select value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </select>

            <select value={radius} onChange={(e) => setRadius(e.target.value)}>
                <option value="1000">1 km</option>
                <option value="5000">5 km</option>
                <option value="10000">10 km</option>
                <option value="20000">20 km</option>
            </select>

            <input type="checkbox"
                checked={openNow}
                onChange={(e) => setOpenNow(e.target.checked)}

            /> Open Now

            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <input
                type="text"
                placeholder="Restaurant/Food (Optional)"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />

            <button onClick={handleFetch}>Search Restaurants</button>

            <div id="results"></div>
        </div>
    );
};

export default App;