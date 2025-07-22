import { useState, useEffect } from "react";
import axios from "axios";

import AddRoom from "./prompts/addRoom.jsx";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [showRoomList, setShowRoomList] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);

  useEffect(() => {
    if (!showRoomList) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/")
        .then((res) => {
          setRooms(res.data.roomlist);
          setShowRoomList(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showRoomList]);

  async function deleteRoom(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/rooms/" + id);
      setShowRoomList(false);
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Rooms</h1>
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowAddPrompt(true)}
        >
          Add Booking
        </button>
      </div>

      <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border border-gray-200 text-left">Img</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Room ID
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Room Name
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Category
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Price
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Features
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Capacity
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Availability
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {rooms.map((room, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border border-gray-200">
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.roomId}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.roomName}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.category}
              </td>
              <td className="px-4 py-3 border border-gray-200">{room.price}</td>
              <td className="px-4 py-3 border border-gray-200">
                {room.features.join(", ")}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.capacity}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.availability ? "Available" : "Unavailable"}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    deleteRoom(room.roomId);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPrompt && (
              <AddRoom
                // onClose={() => {
                //   setShowAddPrompt(false);
                // }}
                // onSubmit={() => {
                //   setCategoryIsLoaded(false);
                //   setShowAddPrompt(false);
                // }}
              />
            )}
    </div>
  );
}
