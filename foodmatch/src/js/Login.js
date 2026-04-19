import "../css/Login.css";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useState } from "react"; 

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
        <div className="login-container">
            <h2>Login/Sign Up</h2>
            <button onClick={() => {setSignIn(prev => !prev)}}>Switch to {signIn ? "Sign Up" : "Login"}</button>
            <form className="login-form">
                <button onClick={() => signInLinked(googleProvider)}> Google </button>
                <button onClick={() => signInLinked(githubProvider)}> GitHub </button>
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
                <button type="submit" onClick={() => signIn ? signInEmail(auth, email, password) : createUserEmail(auth, email, password)}>
                    Login or Sign Up
                </button>
            </form>
        </div>
    );
}

export default Login;