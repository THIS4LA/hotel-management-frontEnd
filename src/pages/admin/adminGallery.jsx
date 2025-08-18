import axios from "axios";
import { useState, useEffect } from "react";

import AddGallery from "./prompts/addGallery.jsx";
import EditGallery from "./prompts/editGallery.jsx";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadedGalleryList, setLoadedGalleryList] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [item, setItem] = useState({});
    const [filterArray, setFilterArray] = useState({
    sortBy: "name",
    startDate: "",
    endDate: "",
    page: "1",
    limit: 2,
    order: "asc",
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/galleryItems/",{
        params: filterArray,
      })
      .then((res) => {
        setGalleryItems(res.data.galleryItems);
        setLoadedGalleryList(true);
        setTotalPages(res.data.totalPages);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedGalleryList]);

  async function deleteGalleryItem(name) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/galleryItems/" + name);
      setLoadedGalleryList(false);
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
          Add Image
        </button>
      </div>

      <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border border-gray-200 text-left">Img</th>
            <th className="px-4 py-3 border border-gray-200 text-left">Name</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Description
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">Edit</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {galleryItems.map((galleryItem, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border border-gray-200">
                <img
                  src={galleryItem.img}
                  alt={galleryItem.name}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {galleryItem.name}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {galleryItem.description}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="px-3 py-1 text-white bg-blue-400 rounded hover:bg-blue-700"
                  onClick={() => {
                    setShowEditPrompt(true);
                    setItem(galleryItem);
                  }}
                >
                  Edit
                </button>
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => {
                    deleteGalleryItem(galleryItem.name);
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
              setLoadedGalleryList(false);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showAddPrompt && (
        <AddGallery
          onClose={() => setShowAddPrompt(false)}
          onSubmit={() => {
            setShowAddPrompt(false);
            setLoadedGalleryList(false);
          }}
        />
      )}
      {showEditPrompt && (
        <EditGallery
          gallery={item}
          galleryName={item.name}
          onClose={() => setShowEditPrompt(false)}
          onSubmit={() => {
            setShowAddPrompt(false);
            setLoadedGalleryList(false);
          }}
        />
      )}
    </div>
  );
}
