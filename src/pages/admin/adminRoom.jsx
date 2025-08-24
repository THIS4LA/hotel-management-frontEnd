import { useState, useEffect } from "react";
import axios from "axios";

import AddRoom from "./prompts/addRoom.jsx";

import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlinePriceChange } from "react-icons/md";
import { GoSortDesc } from "react-icons/go";
import EditRoom from "./prompts/editRoom.jsx";

export default function Room() {
  const [rooms, setRooms] = useState([]);
  const [showRoomList, setShowRoomList] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [item, setItem] = useState({});
  const [showPricePicker, setShowPricePicker] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [pricePickerValues, setPricePickerValues] = useState({
    startPrice: "",
    endPrice: "",
  });
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const [filterArray, setFilterArray] = useState({
    sortBy: "roomId",
    startPrice: "",
    endPrice: "",
    page: "1",
    limit: 10,
    order: "asc",
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/", {
        params: filterArray,
      })
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.rooms);
        setShowRoomList(true);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadTrigger, showRoomList]);

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

  function applyPriceFilter() {
    setFilterArray((prevFilterArray) => ({
      ...prevFilterArray,
      startPrice: pricePickerValues.startPrice,
      endPrice: pricePickerValues.endPrice,
    }));
    setReloadTrigger((prev) => !prev);
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
      <div className="relative flex justify-end gap-5">
        <button
          onClick={() => setShowPricePicker((prev) => !prev)}
          className="px-3 py-1 text-gray-400 border-2 rounded hover:bg-gray-300 flex items-center gap-2 hover:text-white"
        >
          Select Price Range
          <MdOutlinePriceChange />
          <RiArrowDropDownLine />
        </button>

        {showPricePicker && (
          <div className="absolute mt-2 bg-white border rounded shadow-lg z-10 p-4 w-64">
            <label className="block text-sm text-gray-700">Start Price</label>
            <input
              type="float"
              className="w-full mt-1 mb-3 px-2 py-1 border rounded text-sm"
              value={pricePickerValues.startPrice}
              onChange={(e) =>
                setPricePickerValues({
                  ...pricePickerValues,
                  startPrice: e.target.value,
                })
              }
            />

            <label className="block text-sm text-gray-700">End Price</label>
            <input
              type="float"
              className="w-full mt-1 mb-3 px-2 py-1 border rounded text-sm"
              value={pricePickerValues.endPrice}
              onChange={(e) =>
                setPricePickerValues({
                  ...pricePickerValues,
                  endPrice: e.target.value,
                })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => {
                  applyPriceFilter();
                  setShowPricePicker(false);
                }}
                className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-700 text-sm"
              >
                Apply
              </button>
              <button
                onClick={() => {
                  setShowPricePicker(false);
                  setFilterArray((prev) => ({
                    ...prev,
                    startPrice: "",
                    endPrice: "",
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
                  sortBy: "roomId",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by RoomID
            </button>
            <button
              onClick={() => {
                setFilterArray({
                  ...filterArray,
                  sortBy: "roomName",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by Room Name
            </button>
            <button
              onClick={() => {
                setFilterArray({
                  ...filterArray,
                  sortBy: "price",
                });
                setShowFilter(false);
                setReloadTrigger((prev) => !prev);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sort by Room Price
            </button>
          </div>
        )}
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
            <th className="px-4 py-3 border border-gray-200 text-left">Edit</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Delete
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
                <ul className="list-disc list-inside">
                  {room.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.capacity}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {room.availability ? "Available" : "Unavailable"}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="px-3 py-1 text-white bg-blue-400 rounded hover:bg-blue-700"
                  onClick={() => {
                    setShowEditPrompt(true);
                    setItem(room);
                  }}
                >
                  Edit
                </button>
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
        <AddRoom
          onClose={() => {
            setShowAddPrompt(false);
          }}
          onSubmit={() => {
            setShowRoomList(false);
            setShowAddPrompt(false);
          }}
        />
      )}
      {showEditPrompt && (
        <EditRoom
          roomId={item.roomId}
          room={item}
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
