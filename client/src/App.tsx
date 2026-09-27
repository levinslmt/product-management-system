import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Report from "./pages/Report";
import MainLayout from "./layouts/MainLayout";
import Register from "./pages/Register";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/products" replace />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={token ? <Navigate to="/products" replace /> : <Register />}
        />

        {/* Protected pages */}
        <Route element={<MainLayout setToken={setToken} />}>
          <Route
            path="/products"
            element={token ? <Products /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/report"
            element={token ? <Report /> : <Navigate to="/login" replace />}
          />
        </Route>

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to={token ? "/products" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
