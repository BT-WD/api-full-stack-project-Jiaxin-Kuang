import "../css/Landing.css";

const Landing = () => {
    return (
        <div className="landing-container">
            <h1>Welcome to FoodMatch</h1>
            <p>Find the best restaurants near you!</p>
            <button onClick={() => (window.location.href = "/login")}>
                Get Started
            </button>
        </div>
    );
}

export default Landing;
