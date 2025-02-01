import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import "./register.css"; // Import the CSS file

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    graduationYear: "",
    course: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = "https://project-s-nuaq.onrender.com/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className="form_register" onSubmit={handleSignup}>
        <h3>Signup</h3>
        <div
          className="flex_mobile"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "30px",
            marginLeft: "-10px",
            marginTop: "-40px",
          }}
        >
          <div style={{ width: "45%" }}>
            <div>
              <label className="label_register" htmlFor="name">
                Name
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                className="input-field input_field_register"
                type="text"
                name="name"
                autoFocus
                placeholder="Enter your name"
                value={signupInfo.name}
              />
            </div>
            <div>
              <label className="label_register" htmlFor="email">
                Email
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                type="email"
                className="input-field input_field_register"
                name="email"
                placeholder="Enter your email"
                value={signupInfo.email}
              />
            </div>
            <div>
              <label className="label_register" htmlFor="password">
                Password
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                type="password"
                className="input-field input_field_register"
                name="password"
                placeholder="Enter your password"
                value={signupInfo.password}
              />
            </div>
          </div>
          <div style={{ width: "45%" }}>
            <div>
              <label className="label_register" htmlFor="college">
                College
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                type="text"
                name="college"
                className="input-field input_field_register"
                autoFocus
                placeholder="Enter your college name"
                value={signupInfo.college}
              />
            </div>
            <div>
              <label className="label_register" htmlFor="course">
                Course/Degree
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                type="text"
                name="course"
                className="input-field input_field_register"
                placeholder="Enter your Course/Degree"
                value={signupInfo.course}
              />
            </div>
            <div>
              <label className="label_register" htmlFor="graduationYear">
                Graduation Year
              </label>
              <input
                style={{ height: "50px" }}
                onChange={handleChange}
                type="text"
                name="graduationYear"
                className="input-field input_field_register"
                placeholder="Enter your graduation year"
                value={signupInfo.graduationYear}
              />
            </div>
          </div>
        </div>
        <button className="button_login_register" type="submit">
          Signup
        </button>
        <p className="form-footer">
          Already have an account?{" "}
          <Link className="form-link" to="/login">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Signup;
