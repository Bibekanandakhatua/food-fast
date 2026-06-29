import { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Shops from "./pages/Shops/Shops";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login";
import { StoreContext } from "./context/StoreContext";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { isAuthenticated } = useContext(StoreContext);

  return (
    <div className="admin-shell">
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        {isAuthenticated ? <Sidebar /> : null}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/dashboard/add" replace /> : <Login />
            }
          />
          <Route
            path="/dashboard/add"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/list"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <List />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/shops"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Shops />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/dashboard/add" : "/"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
