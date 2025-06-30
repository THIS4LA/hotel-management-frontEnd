import axios from "axios";
import { useEffect, useState } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);

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
  const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
  
  if (!confirmDelete) return; // Stop if user cancels

  try {
    await axios.delete(
      import.meta.env.VITE_BACKEND_URL + "/api/book/" + bookingId
    );
    setCategoryIsLoaded(false);
  } catch (err) {
    console.error("Error deleting bookings:", err);
  }
}


  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>

      <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Booking ID
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Room ID
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Email
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Status
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Reason
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Check in Date
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Check out Date
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">Note</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {bookings.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border border-gray-200">
                {item.bookingId}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {item.roomId}
              </td>
              <td className="px-4 py-3 border border-gray-200">{item.email}</td>
              <td className="px-4 py-3 border border-gray-200">
                {item.status}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {item.reason}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {item.startDate}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {item.endDate}
              </td>
              <td className="px-4 py-3 border border-gray-200">{item.notes}</td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    deleteItem(item.bookingId);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
