import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await axios.get("/user/validate", { withCredentials: true }); // critical: send cookies
        if (isMounted) setIsAuthenticated(true);
      } catch (err) {
        if (isMounted) {
          console.error("Auth failed", err);
          window.location.href = "http://localhost:3000/login"; // full redirect to login app
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthenticated === null) return <p>Checking authentication...</p>;

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
