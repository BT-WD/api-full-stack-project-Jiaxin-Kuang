import "./Heading.css";
import logoname from "../../assets/logoname.svg";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

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

const Heading = () => {
    function authSignOut() { 
        signOut(auth).then(() => {
            window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/login`;
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div id="headingContainer">
            <div>
                <div id="logoname">
                    <img src={logoname}/>
                </div>
                <nav>
                    <a href="#/app">Search</a>
                    <a href="#/liked">Liked Restaurants</a>
                </nav>
                <button onClick={authSignOut}>Sign Out</button>
            </div>
        </div>
    );
}

export default Heading;