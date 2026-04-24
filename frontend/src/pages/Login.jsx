import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        form
      );

      const token = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", form.email);

      alert("Login Success");

      navigate("/chat");

    } catch (error) {
      alert("Invalid Login");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Chattingo</h1>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>
          New User? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;