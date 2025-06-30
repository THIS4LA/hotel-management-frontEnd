import { Route, Routes, Link, NavLink } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaImages,
  FaBoxOpen,
  FaCommentDots,
  FaHotel,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import Booking from "./adminBooking.jsx";
import Gallery from "./adminGallery.jsx";
import Room from "./adminRoom.jsx";
import User from "./adminUser.jsx";

export default function Dashboard() {
  const menuItems = [
    { icon: <FaClipboardList />, label: "Bookings", path: "/admin/bookings" },
    { icon: <FaHotel />, label: "Rooms", path: "/admin/rooms" },
    { icon: <FaUsers />, label: "Users", path: "/admin/users" },
    { icon: <FaImages />, label: "Gallery", path: "/admin/gallery" }
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-[#FFFFFF] text-[#6D6D6D] text-lg flex flex-col items-center pt-10 shadow-lg">
        <div className="mb-8 text-2xl font-bold flex items-center gap-2">
          <MdDashboard className="text-[#6D6D6D]" />
          Dashboard
        </div>

        {/* Navigation Items */}
        <div className="w-full flex flex-col gap-2 px-4">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-5 w-full pl-10 pr-4 py-4 rounded-md border ${
                  isActive
                    ? "bg-[#E0F4FE] text-[#009DDC] border-[#009DDC]"
                    : "border-transparent text-[#6D6D6D]"
                } hover:bg-[#E0F4FE] hover:text-[#009DDC] hover:border-[#009DDC] transition-colors`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="w-[80%] h-screen bg-[#F8F9FA] p-6 overflow-y-scroll">
        <Routes>
          <Route path="/bookings" element={<Booking />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/users" element={<User />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}
