
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import "./Login.css";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("Email and password are required");
    }

    setIsLoading(true);

    try {
      const url = import.meta.env.VITE_LOGIN_API;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setIsAuthenticated(true);

        // Use a single navigation call with a slight delay
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 100);
      } else if (error) {
        handleError(error?.details[0]?.message || "An error occurred");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={handleLogin} className="login-form">
        <h3>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="input-field"
          name="email"
          placeholder="Enter your email"
          value={loginInfo.email}
          onChange={handleChange}
          disabled={isLoading}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="input-field"
          name="password"
          placeholder="Enter your password"
          value={loginInfo.password}
          onChange={handleChange}
          disabled={isLoading}
        />

        <button
          className="button_login_register"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <p className="form-footer">
          Don't have an account?{" "}
          <Link className="form-link" to="/signup">
            Signup
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;