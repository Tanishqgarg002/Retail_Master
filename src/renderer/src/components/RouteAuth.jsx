/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function RouteAuth({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
      const loggedIn = localStorage.getItem("loggedin");
      console.log(loggedIn)
    if (!loggedIn) {
      navigate("/login");
    }
  });
  return children;
}

export default RouteAuth;
