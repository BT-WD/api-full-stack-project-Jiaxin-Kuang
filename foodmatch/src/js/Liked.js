import "../css/Liked.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Heading from "../components/header/Heading";
import Display from "../components/display/Display";

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

const Liked = () => {
    const [likedRestaurants, setLikedRestaurants] = useState([]);
    const [clickedRestaurant, setClickedRestaurant] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
    
            if (!user) {
                window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/login`;
                return;
            }
        });
    
        return () => unsubscribe();
    }, []);

    async function loadLikedRestaurants() {
        try {
            const docRef = doc(db, "userlikes", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data().likes || [];
            } 
            else {
                return [];
            }
        } 
        catch (e) {
            console.error("Error fetching liked restaurants: ", e);
        }
    }

    useEffect(() => {
        if (!user) return;

        loadLikedRestaurants().then((likes) => {
            setLikedRestaurants(likes);
        });
    }, [user]);

    return (
        <div className="likedContainer">
            <Heading></Heading>
            <div id="likedRestaurants">
                <h2>Liked Restaurants</h2>

                {likedRestaurants.length === 0 ? (
                    <p>No liked restaurants yet!</p>
                ) : (
                    likedRestaurants.map((r, i) => (
                        <div className="oneRestaurant" key={i} onClick={() => setClickedRestaurant(r)}>
                            <b>{r.name}</b><br />
                            <img src={r.image_url} width="100" /><br />
                            Rating: {r.rating}<br />
                            Address: {r.location?.address1}, {r.location?.city}
                            <br/><br/>
                        </div>
                    ))
                )}
            </div>
            <Display
                currentRestaurant={clickedRestaurant} 
                likeButton={null} 
                dislikeButton={null}
            />
        </div>
    )
}

export default Liked;