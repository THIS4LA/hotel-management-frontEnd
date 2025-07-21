import axios from "axios";
import { useEffect, useState } from "react";
import AddBooking from "./prompts/addBooking.jsx";
import EditBooking from "./prompts/editBooking.jsx";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [item, setItem] = useState({});
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);

  useEffect(() => {
    if (!categoryIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/book/")
        .then((res) => {
          setBookings(res.data.bookings);
          setCategoryIsLoaded(true);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
        });
    }
  }, [categoryIsLoaded]);

  async function deleteItem(bookingId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/book/" + bookingId
      );
      setCategoryIsLoaded(false); // trigger re-fetch
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>
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
            <th className="px-4 py-3 border">Booking ID</th>
            <th className="px-4 py-3 border">Room ID</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Status</th>
            <th className="px-4 py-3 border">Reason</th>
            <th className="px-4 py-3 border">Check in Date</th>
            <th className="px-4 py-3 border">Check out Date</th>
            <th className="px-4 py-3 border">Note</th>
            <th className="px-4 py-3 border">Edit</th>
            <th className="px-4 py-3 border">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {bookings.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border">{item.bookingId}</td>
              <td className="px-4 py-3 border">{item.roomId}</td>
              <td className="px-4 py-3 border">{item.email}</td>
              <td className="px-4 py-3 border">{item.status}</td>
              <td className="px-4 py-3 border">{item.reason}</td>
              <td className="px-4 py-3 border">{item.startDate}</td>
              <td className="px-4 py-3 border">{item.endDate}</td>
              <td className="px-4 py-3 border">{item.notes}</td>
              <td className="px-4 py-3 border">
                <button
                  className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => {
                    setShowEditPrompt(true);
                    setItem(item);
                  }}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-3 border">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteItem(item.bookingId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddPrompt && (
        <AddBooking
          onClose={() => {
            setShowAddPrompt(false);
          }}
          onSubmit={() => {
            setCategoryIsLoaded(false);
            setShowAddPrompt(false);
          }}
        />
      )}
      {showEditPrompt && (
        <EditBooking
          booking={item}
          onClose={() => {
            setShowEditPrompt(false);
          }}
          onSubmit={() => {
            setCategoryIsLoaded(false);
            setShowEditPrompt(false);
          }}
        />
      )}
    </div>
  );
}
