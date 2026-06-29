import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const apiUrl =
    import.meta.env.VITE_API_URL ||
    "https://food-delivery-backend-5b6g.onrender.com";

  useEffect(() => {
    function loadData() {
      const savedToken = localStorage.getItem("token");
      const savedAdmin = localStorage.getItem("admin");

      if (savedToken) {
        setToken(savedToken);
      }
      if (savedAdmin) {
        setAdmin(savedAdmin === "true");
      }
    }
    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    apiUrl,
    isAuthenticated: Boolean(token) && admin === true,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
