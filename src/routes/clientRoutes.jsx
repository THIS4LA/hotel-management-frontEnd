import { Route, Routes, Router } from "react-router";
import Home from "../pages/client/home.jsx";
import Footer from "../components/footer.jsx";
import Header from "../components/header.jsx";
import AvailableRooms from "../pages/client/availableRooms.jsx";
import Room from "../pages/client/room.jsx";
import ProfilePage from "../pages/client/profile.jsx";
import Login from "../pages/authentication/login.jsx";
import SignUp from "../pages/authentication/signUp.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";

export default function ClientRoutes() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/available" element={<AvailableRooms />} />
          <Route path="/room/:roomId" element={<Room />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
