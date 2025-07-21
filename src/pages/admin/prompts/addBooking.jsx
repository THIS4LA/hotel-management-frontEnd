import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

export default function AddBooking({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    roomId: "",
    email: "",
    status: "pending",
    reason: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // start loading

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/book/", formData)
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
        <h2 className="text-xl font-bold mb-4">Add New Booking</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="roomId"
            placeholder="Room ID"
            value={formData.roomId}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
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
  );
}
