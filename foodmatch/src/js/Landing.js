import "../css/Landing.css";
import stripes from "../assets/stripes.svg";
import logoname2 from "../assets/logoname2.svg";
import cookie from "../assets/cookie.svg";

const Landing = () => {
    return (
        <div id="landingPage">
            <div id="landingStripes" style={{ backgroundImage: `url(${stripes})` }}></div>
            <div id="topHeading">
                <img src={logoname2}></img>
                <button onClick={() => (window.location.href = `${window.location.origin}/api-full-stack-project-Jiaxin-Kuang/#/login`)}>
                    Log In/Sign Up
                </button>
            </div>
            <div id="hero">
                <div id="heroText">
                    <h1>Swipe, Go, Eat. All in One.</h1>
                    <p>Looking to fufill your cravings? We’re here to help you find just what you need! Sign up and find the hottest food spots near you that fit your unique taste palate!</p>
                </div>

                <div id="heroImage">
                    <img src={cookie} alt="cookie"/>
                    <div id="textOverlay">
                        <p><b>1 Million+ Total Restuarants</b></p>
                        <p><b>32 Countries</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
