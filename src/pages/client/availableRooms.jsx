import { useState } from "react";
import BookingBar from "../../components/bookingBar";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const AvailableRooms = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({});
  const navigate = useNavigate();
  return (
    <div className="bg-blue-400 h-[100vh] pt-14 pb-5 px-10">
      <button
        className="flex items-center text-white pt-5 hover:text-blue-200"
        onClick={() => navigate("/")}
      >
        <MdKeyboardArrowLeft />
        Go Back
      </button>
      <BookingBar onRoomsFetched={setAvailableRooms} onDateFetched={setBookingDetails}  />
      <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-5">
        {availableRooms.map((room) => (
          <Link
            to={`/room/${room.roomId}`}
            state={{ bookingDetails }}
          >
            <div
              key={room.roomId}
              className="embla_slide flex-none basis-1/5 min-w-0"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {room.roomName}
                  </h2>
                  <p className="text-blue-600 font-bold">{room.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvailableRooms;
