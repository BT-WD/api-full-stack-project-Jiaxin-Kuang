import "../css/Login.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useState } from "react"; 
import stripes from "../assets/stripes.svg";
import login from "../assets/login.svg";
import banner from "../assets/banner.svg";

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
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, setSignIn] = useState(false);

    function createUserEmail() {
        console.log("Sign up with email and password")
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    function signInEmail() {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    function signInLinked(provider) {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user; 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/app`;
        }
    });

    return (
        <div id="loginContainer">
            <img
                id="banner"
                src={banner}
                alt="Login Banner"
            />
            <div id="loginBox">
                <div className="stripes top" style={{ backgroundImage: `url(${stripes})` }}></div>
                <form id="loginForm">
                    <img id="logo" src={login} alt="Logo"/>
                    <button onClick={() => {setSignIn(prev => !prev)}}>Switch to {signIn ? "Sign Up" : "Login"}</button>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div id="providers">
                        <button type="button" onClick={() => signInLinked(googleProvider)}>Sign in with Google</button>
                        <button type="button" onClick={() => signInLinked(githubProvider)}>Sign in with GitHub</button>
                    </div>
                    <button type="submit" onClick={() => signIn ? signInEmail(auth, email, password) : createUserEmail(auth, email, password)}>
                        Login or Sign Up
                    </button>
                </form>
                <div className="stripes bottom" style={{ backgroundImage: `url(${stripes})` }}></div>
            </div>
        </div>
    );
}

export default Login;