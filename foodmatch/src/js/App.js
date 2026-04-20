import { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, setDoc, arrayUnion, doc, getDoc } from "firebase/firestore";
import axios from "axios";
import "../css/App.css";

const firebaseConfig = {
    apiKey: "AIzaSyD7LJYn6jkV0XSpCO5gIJRDdUoPoHOKPpk",
    authDomain: "food-match-4be2d.firebaseapp.com",
    projectId: "food-match-4be2d",
    storageBucket: "food-match-4be2d.firebasestorage.app",
    messagingSenderId: "754437707554",
    appId: "1:754437707554:web:b50fc48c002bfcde78377b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("2");
    const [radius, setRadius] = useState("5000");
    const [location, setLocation] = useState("");
    const [term, setTerm] = useState("");
    const [openNow, setOpenNow] = useState(false);

    const [currentRestaurant, setCurrentRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [likedRestaurants, setLikedRestaurants] = useState([]);

    const [offset, setOffset] = useState(0);
    const loadingRef = useRef(false);
    const [hasMore, setHasMore] = useState(true);
    const [user, setUser] = useState(null);

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

    const displayRestaurant = (restaurant) => {
        if (!restaurant) return;
        setCurrentRestaurant(restaurant);
    };
    
    async function loadLikedRestaurants() {
        try {
            const docRef = doc(db, "userlikes", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setLikedRestaurants(docSnap.data().likes || []);
            } 
            else {
                setLikedRestaurants([]);
            }
        } 
        catch (e) {
            console.error("Error fetching liked restaurants: ", e);
        }
    }

    const goNext = () => {
        if (loadingRef.current) return;

        setRestaurants((prev) => {
            if (prev.length <= 1) {
                loadNextPage();
                return [];
            }

            const updated = prev.slice(1);
            setCurrentRestaurant(updated[0]);
            return updated;
        });
    };

    async function addRestaurant(restaurant) {
        try {
            await setDoc(
                doc(db, "userlikes", user.uid),
                {
                    likes: arrayUnion(restaurant)
                },
                { merge: true }
            );
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleLike = async () => {
        const current = restaurants[0];
        if (!current || !user) return;

        await addRestaurant(current);   
        goNext();                       
        await loadLikedRestaurants();   
    };

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (loadingRef.current || !restaurants.length) return;

            if (e.key === "ArrowRight") {
                await handleLike();
            }

            if (e.key === "ArrowLeft") {
                goNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [restaurants, user]);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (!user) {
                window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/login`;
                return;
            }

            const ref = doc(db, "userlikes", user.uid);
            const snap = await getDoc(ref);

            const likes = snap.exists() ? snap.data().likes || [] : [];
            setLikedRestaurants(likes);
        });

        return () => unsubscribe();
    }, []);

    function authSignOut() { 
        signOut(auth).then(() => {
            window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/login`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="App">
            <h1>Food Match</h1>
            <p>Find your perfect meal match!</p>
            <button onClick={authSignOut}>Sign Out</button>

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

            <div id="results">
                {currentRestaurant && (
                    <>
                        <b>{currentRestaurant.name}</b><br/>
                        <img src={currentRestaurant.image_url} width="200"/><br/>
                        Rating: {currentRestaurant.rating}<br/>
                        Address: {currentRestaurant.location.address1}, {currentRestaurant.location.city}<br/>
                        Reviews: {currentRestaurant.url}<br/>
                    </>
                )}
            </div>
            <button onClick={goNext}>Dislike</button>
            <button onClick={handleLike}>Like</button>

            <div id="likedRestaurants">
                <h2>Liked Restaurants</h2>

                {likedRestaurants.length === 0 ? (
                    <p>No liked restaurants yet!</p>
                ) : (
                    likedRestaurants.map((r, i) => (
                        <div key={i}>
                            <b>{r.name}</b><br />
                            <img src={r.image_url} width="100" /><br />
                            Rating: {r.rating}<br />
                            Address: {r.location?.address1}, {r.location?.city}
                            <br/><br/>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default App;