import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]); // Initialized to an empty array

  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken);
  };

  const isLoggedIn = !!token;

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth/user", {
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.status === 200) {
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch services data from the database
  const getServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/data/service"
      );
      if (response.status === 200) {
        console.log("Services data fetched successfully:", response.data);
        setServices(response.data);
      }
    } catch (error) {
      console.error(`Services fetch error: ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    if (token) {
      userAuthentication();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services,authorizationToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
