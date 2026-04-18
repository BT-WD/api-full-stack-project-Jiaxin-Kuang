import "../css/Login.css";

const Login = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form">
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;