import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";

export default function EditBooking({ onClose, onSubmit, booking }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    rooms: booking?.rooms || [],
    name: booking?.name || "",
    email: booking?.email || "",
    status: booking?.status || "pending",
    reason: booking?.reason || "",
    startDate: formatDate(booking?.startDate),
    endDate: formatDate(booking?.endDate),
    notes: booking?.notes || "",
  });
  const [loading, setLoading] = useState(false);
  const [roomFetchLoading, setRoomFetchLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);

  async function handleRoomFetch() {
    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (formData.startDate > formData.endDate) {
      toast.error("Start date cannot be after end date.");
      return;
    }
    setRoomFetchLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/book/available/",
        {
          params: {
            startDate: formData.startDate,
            endDate: formData.endDate,
            currentBookingId: booking.bookingId, // to exclude current booking's rooms
          },
        }
      );

      const fetchedRooms = response.data.availableRooms;

      if (fetchedRooms.length === 0) {
        toast.error("No rooms available for the selected dates.");
      } else {
        // check which of the selected rooms are still available
        const stillAvailable = formData.rooms.filter((r) =>
          fetchedRooms.some((fr) => fr._id === r._id)
        );

        const removedRooms = formData.rooms.filter(
          (r) => !fetchedRooms.some((fr) => fr._id === r._id)
        );

        if (removedRooms.length > 0) {
          toast.error(
            `Some rooms are not available for these dates and were removed: ${removedRooms
              .map((r) => r.roomName)
              .join(", ")}`
          );
        }

        // update formData to only keep still available ones
        setFormData((prev) => ({
          ...prev,
          rooms: stillAvailable,
        }));

        // update the available rooms list
        setAvailableRooms(fetchedRooms);

        toast.success("Available rooms fetched successfully.");
      }
    } catch (error) {
      toast.error("Error fetching available rooms: " + error.message);
    }
    finally {
      setRoomFetchLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //eslint-disable-next-line
    const { roomNamesText, ...dataToSubmit } = formData;
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/book/" + booking.bookingId,
        dataToSubmit
      )
      .then((res) => {
        toast.success(res.data.message);
        onSubmit();
        onClose(); // optionally close modal
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false); // stop loading
      });
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />
          <button
            onClick={handleRoomFetch}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center min-w-[120px] gap-2"
            disabled={loading}
          >
            {roomFetchLoading ? (
              <ScaleLoader color="#ffffff" height={18} />
            ) : (
              <>
                Search Available Rooms <IoSearchOutline />
              </>
            )}
          </button>
          <div
            className="overflow-y-auto border rounded p-2"
            style={{ maxHeight: "12rem" }}
          >
            {[...formData.rooms, ...availableRooms]
              // remove duplicates (in case a booked room is also in availableRooms)
              .filter(
                (room, index, self) =>
                  index === self.findIndex((r) => r._id === room._id)
              )
              .map((room) => {
                //in here we check if the room is already selected
                const isSelected = formData.rooms.some(
                  (r) => r._id === room._id
                );

                const handleToggleRoom = () => {
                  if (isSelected) {
                    setFormData({
                      ...formData,
                      //in here we remove the room from selectedRooms
                      rooms: formData.rooms.filter((r) => r._id !== room._id),
                    });
                  } else {
                    //in here we add the room to selectedRooms
                    setFormData({
                      ...formData,
                      rooms: [...formData.rooms, room],
                    });
                  }
                };

                return (
                  <div
                    key={room._id}
                    className={`flex items-center cursor-pointer p-2 border-b last:border-b-0 rounded ${
                      isSelected ? "bg-blue-50" : "border-gray-200"
                    }`}
                    onClick={handleToggleRoom}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="mr-2 cursor-pointer"
                    />
                    <span className="truncate">
                      {room.roomName} | {room.category} | ${room.price}
                    </span>
                  </div>
                );
              })}
          </div>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            name="reason"
            placeholder="Reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          />

          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            rows={3}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center min-w-[120px]"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <ScaleLoader color="#ffffff" height={18} />
            ) : (
              "Save Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
