import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

export default function BookingBar({ onRoomsFetched, onDateFetched }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate } = location.state || {};
  const [bookingData, setBookingData] = useState({
    startDate: startDate || "",
    endDate: endDate || "",
  });
  //eslint-disable-next-line
  const [availableRooms, setAvailableRooms] = useState([]);
  const [roomFetchLoading, setRoomFetchLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setRoomFetchLoading(true);

    if (!bookingData.startDate || !bookingData.endDate) {
      toast.error("Please select both start and end dates.");
      setRoomFetchLoading(false);
      return;
    }

    if (bookingData.startDate > bookingData.endDate) {
      toast.error("Start date cannot be after end date.");
      setRoomFetchLoading(false);
      return;
    }

    if (location.pathname === "/") {
      // Redirect to AvailableRooms page with query params
      navigate("/available", {
        state: {
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,
        },
      });
    } else {
      // Already on AvailableRooms, fetch directly
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/book/available/",
          { params: bookingData }
        );
        
        if (response.data.availableRooms.length === 0) {
          toast.error("No rooms available for the selected dates.");
        } else {
          setAvailableRooms(response.data.availableRooms);
          console.log(response.data.availableRooms);
          onRoomsFetched(response.data.availableRooms);
          onDateFetched(bookingData);
          toast.success("Available rooms fetched successfully.");
        }
      } catch (error) {
        toast.error("Error fetching available rooms: " + error.message);
      } finally {
        setRoomFetchLoading(false);
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 pb-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-md border border-gray-300 rounded-xl shadow-md overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Check In */}
          <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-300">
            <label
              htmlFor="checkIn"
              className="block text-sm font-semibold text-white mb-1"
            >
              Check In
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={bookingData.startDate}
                onChange={handleInputChange}
                className="w-full bg-white/70 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <i className="fas fa-calendar-day absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-300">
            <label
              htmlFor="checkOut"
              className="block text-sm font-semibold text-white mb-1"
            >
              Check Out
            </label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={bookingData.endDate}
                onChange={handleInputChange}
                className="w-full bg-white/70 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <i className="fas fa-calendar-check absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-300">
            <label
              htmlFor="guests"
              className="block text-sm font-semibold text-white mb-1"
            >
              Guests
            </label>
            <div className="relative">
              <select
                id="guests"
                name="guests"
                className="w-full bg-white/70 border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Adult" : "Adults"}
                  </option>
                ))}
              </select>
              <i className="fas fa-user absolute right-3 top-3 text-gray-500 pointer-events-none"></i>
            </div>
          </div>

          {/* Book Now Button */}
          <div className="px-6 py-4 flex items-center justify-center md:justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-400 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-600 hover:text-white transition w-full md:w-auto"
            >
              {roomFetchLoading ? (
                <ScaleLoader color="#ffffff" height={18} />
              ) : (
                <>Search Available</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
