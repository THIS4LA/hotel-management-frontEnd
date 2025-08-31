import { BrowserRouter, Route, Routes } from "react-router";
import ClientRoutes from "./routes/clientRoutes.jsx";
import AdminRoutes from "./routes/adminRoutes.jsx";
import Login from "./pages/authentication/login.jsx";
import "./App.css";
import { AuthProvider } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoutes.jsx";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-left" toastOptions={{ duration: 3000 }} />
      <AuthProvider>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
