import axios from "axios";
import { useEffect, useState } from "react";
import AddBooking from "./prompts/addBooking.jsx";
import EditBooking from "./prompts/editBooking.jsx";
import { GoSortDesc } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toast } from "react-hot-toast";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [item, setItem] = useState({});
  const [categoryIsLoaded, setCategoryIsLoaded] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRangeForm, setDateRangeForm] = useState({
    startDate: "",
    endDate: "",
  });

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

  async function handleSort(sortBy) {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/book",
        {
          params: { sortBy },
          order: "asc",
        }
      );
      setBookings(response.data.bookings);
      toast.success(`Bookings sorted by ${sortBy}`);
    } catch (err) {
      toast.error("Error sorting bookings: " + err.message);
    }
  }

  async function handleDateFilter() {
    if (!dateRangeForm.startDate || !dateRangeForm.endDate) {
      return toast.error("Please select both start and end dates.");
    }
    console.log("Filtering bookings from", dateRangeForm.startDate, "to", dateRangeForm.endDate);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/book/date",
        {params: dateRangeForm}
      );
      setShowDatePicker(false);
      setBookings(response.data.bookings);
      toast.success(
        `Get bookings from ${dateRangeForm.startDate} to ${dateRangeForm.endDate}`
      );
    } catch (err) {
      toast.error("Error get bookings by given time range: " + err.message);
      setShowDatePicker(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Bookings</h1>

        <button
          className="px-4 py-2 text-white bg-blue-400 rounded hover:bg-blue-700"
          onClick={() => setShowAddPrompt(true)}
        >
          Add Booking
        </button>
      </div>
      <div className="relative flex justify-end gap-5">
        <button
          onClick={() => setShowDatePicker((prev) => !prev)}
          className="px-3 py-1 text-gray-400 border-2 rounded hover:bg-gray-300 flex items-center gap-2 hover:text-white"
        >
          Select Date Range
          <MdDateRange />
          <RiArrowDropDownLine />
        </button>

        {showDatePicker && (
          <div className="absolute mt-2 bg-white border rounded shadow-lg z-10 p-4 w-64">
            <label className="block text-sm text-gray-700">Start Date</label>
            <input
              type="date"
              className="w-full mt-1 mb-3 px-2 py-1 border rounded text-sm"
              value={dateRangeForm.startDate}
              onChange={(e) =>
                setDateRangeForm({
                  ...dateRangeForm,
                  startDate: e.target.value,
                })
              }
            />

            <label className="block text-sm text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full mt-1 mb-3 px-2 py-1 border rounded text-sm"
              value={dateRangeForm.endDate}
              onChange={(e) =>
                setDateRangeForm({ ...dateRangeForm, endDate: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={handleDateFilter}
                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  // setStartDate("");
                  // setEndDate("");
                  setShowDatePicker(false);
                }}
                className="px-3 py-1 text-gray-600 border rounded hover:bg-gray-100 text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        )}
        <button
          className="px-3 py-1 text-gray-400 border-2 rounded hover:bg-gray-300 flex items-center gap-2"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Sort By
          <GoSortDesc />
        </button>

        {showFilter && (
          <div className="absolute mt-11 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              onClick={() => {
                setShowFilter(false), handleSort("startDate");
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by Date
            </button>
            <button
              onClick={() => {
                setShowFilter(false), handleSort("endDate");
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by Name
            </button>
            <button
              onClick={() => {
                setShowFilter(false), handleSort("roomId");
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by Room ID
            </button>
          </div>
        )}
      </div>

      <table className="w-full overflow-hidden border border-gray-200 rounded-md table-auto">
        <thead className="text-gray-700 bg-gray-100">
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
                  className="px-3 py-1 text-white bg-blue-400 rounded hover:bg-blue-700"
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
                  className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
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
