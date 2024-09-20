import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handelsubmit = () => {
    navigate("/login");
  };
  const handelsubmitsign = () => {
    navigate("/signup");
  };
  
  return (
    <div className="home-container">
      <div className="image-container">
        <img
          src="./src/images/pexels-fotios-photos-1279330.jpg"
          alt="img"
          className="background-image"
        />
        <button onClick={handelsubmit} className="login-button">
          Login 
        </button>
        <button onClick={handelsubmitsign} className="login-button-1">
          sign up 
        </button>
      </div>
    </div>
  );
};
export default Home;
