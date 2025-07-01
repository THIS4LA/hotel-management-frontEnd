import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/dashboard";
import Booking from "../pages/admin/adminBooking";
import Room from "../pages/admin/adminRoom";
import User from "../pages/admin/adminUser";
import Gallery from "../pages/admin/adminGallery";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<Navigate to="bookings" replace />} />
        <Route path="bookings" element={<Booking />} />
        <Route path="rooms" element={<Room />} />
        <Route path="users" element={<User />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}
