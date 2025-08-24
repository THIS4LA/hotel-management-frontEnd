import axios from "axios";
import { useEffect, useState } from "react";
import AddBooking from "./prompts/addBooking.jsx";
import EditBooking from "./prompts/editBooking.jsx";
import { GoSortDesc } from "react-icons/go";
import { MdDateRange } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [item, setItem] = useState({});
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerValues, setDatePickerValues] = useState({
    startDate: "",
    endDate: "",
  });

  const [filterArray, setFilterArray] = useState({
    sortBy: "startDate",
    startDate: "",
    endDate: "",
    page: "1",
    limit: 10,
    order: "asc",
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/book/", {
        params: filterArray,
      })
      .then((res) => {
        console.log("Bookings fetched successfully:", res.data);
        console.log("Total docs:", res.totalDocs);
        console.log("Limit per page:", res.limit);

        setBookings(res.data.bookings);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTrigger]);

  async function deleteItem(bookingId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/book/" + bookingId
      );
      setReloadTrigger((prev) => !prev);
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  }

  function applyDateFilter() {
    setFilterArray((prevFilterArray) => ({
      ...prevFilterArray,
      startDate: datePickerValues.startDate,
      endDate: datePickerValues.endDate,
    }));
    setReloadTrigger((prev) => !prev);
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
              value={datePickerValues.startDate}
              onChange={(e) =>
                setDatePickerValues({
                  ...datePickerValues,
                  startDate: e.target.value,
                })
              }
            />

            <label className="block text-sm text-gray-700">End Date</label>
            <input
              type="date"
              className="w-full mt-1 mb-3 px-2 py-1 border rounded text-sm"
              value={datePickerValues.endDate}
              onChange={(e) =>
                setDatePickerValues({
                  ...datePickerValues,
                  endDate: e.target.value,
                })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => {
                  applyDateFilter();
                  setShowDatePicker(false);
                }}
                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowDatePicker(false);
                  setFilterArray((prev) => ({
                    ...prev,
                    startDate: "",
                    endDate: "",
                  }));
                  setReloadTrigger((prev) => !prev);
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
                setFilterArray({
                  ...filterArray,
                  sortBy: "startDate",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by CheckIn
            </button>
            <button
              onClick={() => {
                setFilterArray({
                  ...filterArray,
                  sortBy: "endDate",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by CheckOut
            </button>
            <button
              onClick={() => {
                setFilterArray({
                  ...filterArray,
                  sortBy: "roomId",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
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
            <th className="px-4 py-3 border">Name</th>
            <th className="px-4 py-3 border">Booked Rooms</th>
            <th className="px-4 py-3 border">Status</th>
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
              <td className="px-4 py-3 border">{item.name}</td>
              <td className="px-4 py-3 border">
                <ul className="list-disc pl-4">
                  {item.rooms.map((r) => (
                    <li key={r._id}>{r.roomName}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 border">{item.status}</td>
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
      <div className="flex justify-start mt-4 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              Number(filterArray.page) === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => {
              setFilterArray((prev) => ({ ...prev, page: String(index + 1) }));
              setReloadTrigger((prev) => !prev);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {showAddPrompt && (
        <AddBooking
          onClose={() => {
            setShowAddPrompt(false);
          }}
          onSubmit={() => {
            setReloadTrigger((prev) => !prev);
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
            setReloadTrigger((prev) => !prev);
            setShowEditPrompt(false);
          }}
        />
      )}
    </div>
  );
}
