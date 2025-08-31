import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { IoSearchOutline } from "react-icons/io5";

export default function AddBooking({
  onClose,
  onSubmit,
  room,
  bookingDetails,
  user,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    rooms: room?._id ? [room._id] : [],
    email: user?.email || "",
    name: user?.firstName || "",
    reason: "",
    startDate: bookingDetails?.startDate || "",
    endDate: bookingDetails?.endDate || "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/book/", formData)
      .then((res) => {
        toast.success(res.data.message);
        onSubmit();
        onClose();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <div className="flex flex-row justify-between mb-4">
          <h2 className="text-xl font-bold mb-4">Book Room {room.roomName}</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-400 text-white rounded-sm flex items-center justify-center hover:bg-red-500"
          >
            &#10005;
          </button>
        </div>

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

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center min-w-[120px]"
              disabled={loading}
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
    </div>
  );
}
