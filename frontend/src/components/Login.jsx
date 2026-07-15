import { useState } from "react";
import "../styles/Login.css";

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
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify(formData),
        }
      );


      const data = await response.json();


      if(response.ok){

        localStorage.setItem(
          "access_token",
          data.access_token
        );

        setMessage("✅ Login successful");


      }else{

        setMessage(
          data.detail || "Login failed"
        );

      }


    }catch(error){

      console.log(error);

      setMessage(
        "Server connection failed"
      );

    }

  };


  return (

    <div className="login-page">


      <div className="login-card">


        <div className="login-logo">
          🎓
        </div>


        <h1>
          Welcome Back
        </h1>


        <p className="subtitle">
          Login to AI Academic Success Champion
        </p>



        <form onSubmit={handleSubmit}>


          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          <button type="submit">
            Login
          </button>


        </form>


        <p className="message">
          {message}
        </p>


      </div>


    </div>

  );

}


export default Login;