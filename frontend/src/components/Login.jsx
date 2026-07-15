import { useState } from "react";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8000/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (response.ok) {

        localStorage.setItem(
          "access_token",
          data.access_token
        );

        setMessage("✅ Login successful!");

      } else {

        setMessage(data.detail || "Login failed");

      }

    } catch (error) {

      console.error(error);
      setMessage("Server error");

    }

  };

  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <p>{message}</p>

    </div>

  );

}

export default Login;