import { Route, Routes, Link } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaImages,
  FaBoxOpen,
  FaCommentDots,
  FaLayerGroup,
  FaHotel,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import Booking from "./booking.jsx";
import Category from "./category.jsx";
import Feedback from "./feedback.jsx";
import Gallery from "./gallery.jsx";
import Item from "./item.jsx";
import Room from "./room.jsx";
import User from "./user.jsx";

export default function Dashboard() {
  const menuItems = [
    { icon: <FaClipboardList />, label: "Bookings", path: "/admin/bookings" },
    { icon: <FaLayerGroup />, label: "Categories", path: "/admin/categories" },
    { icon: <FaHotel />, label: "Rooms", path: "/admin/rooms" },
    { icon: <FaUsers />, label: "Users", path: "/admin/users" },
    { icon: <FaCommentDots />, label: "Feedback", path: "/admin/feedback" },
    { icon: <FaImages />, label: "Gallery", path: "/admin/gallery" },
    { icon: <FaBoxOpen />, label: "Items", path: "/admin/items" },
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
            <Link
              key={index}
              to={item.path} // Use relative paths here
              className="flex items-center gap-5 w-full pl-10 pr-4 py-4 rounded-md border border-transparent hover:bg-[#E0F4FE] hover:text-[#009DDC] hover:border-[#009DDC] transition-colors"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="w-[80%] h-screen bg-[#F8F9FA] p-6 overflow-y-scroll">
        <Routes path="/*">
          <Route path="/bookings" element={<Booking />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/rooms" element={<Room />} />
          <Route path="/users" element={<User />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Item />} />
        </Routes>
      </div>
    </div>
  );
}
