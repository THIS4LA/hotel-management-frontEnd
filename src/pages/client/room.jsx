import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import axios from "axios";
import AddBooking from "./prompts/addBooking.jsx";
import toast from "react-hot-toast";

const Room = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails } = location.state || {};
  const [showBookingPrompt, setShowBookingPrompt] = useState(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`
        );
        setRoom(res.data.room);
      } catch (err) {
        toast.error("Failed to fetch room details."+ err.message);
        navigate(-1);
      }
    }
    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);
  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/type",
          },
        })
        .then((res) => {
          setUser(res.data.user);
        });
    } else {
      setUser(null);
    }
  }, [token]);

  if (!room) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="bg-blue-400 min-h-screen py-14 px-10">
      {/* Back Button */}
      <button
        className="flex items-center text-white pt-5 hover:text-blue-200"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardArrowLeft size={22} />
        Go Back
      </button>

      <div className="mx-auto mt-16 grid md:grid-cols-2 max-w-[1240px] gap-10 items-center">
        {/* Room Image */}
        <div className="w-full h-[500px]">
          <img
            className="w-full h-full object-cover rounded-2xl shadow-lg"
            src={room.image}
            alt={room.roomName}
          />
        </div>

        {/* Room Details */}
        <div className="flex flex-col gap-5 bg-white rounded-2xl p-6 shadow-md">
          <h1 className="text-blue-500 text-[32px] font-bold">
            {room.roomName}
          </h1>
          <p className="text-gray-600 text-lg">
            Category: <span className="font-semibold">{room.category}</span>
          </p>
          <p className="text-gray-600 text-lg">
            Capacity:{" "}
            <span className="font-semibold">{room.capacity} Guests</span>
          </p>
          <p className="text-gray-600 text-lg">
            Price:{" "}
            <span className="font-bold text-blue-600">${room.price}</span> /
            night
          </p>

          {/* Features */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Features
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {room.features?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <button
            className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
            onClick={() => setShowBookingPrompt(true)}
          >
            Book Now
          </button>
        </div>
      </div>
      {showBookingPrompt && (
        <AddBooking
          onClose={() => setShowBookingPrompt(false)}
          onSubmit={() => setShowBookingPrompt(false)}
          bookingDetails={bookingDetails}
          room={room}
          user={user}
        />
      )}
    </div>
  );
};

export default Room;
