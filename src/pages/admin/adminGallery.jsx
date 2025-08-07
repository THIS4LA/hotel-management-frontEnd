import axios from "axios";
import { useState, useEffect } from "react";

import AddGallery from "./prompts/addGallery.jsx";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadedGalleryList, setLoadedGalleryList] = useState(false);
  const [showAddPrompt, setShowAddPrompt] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/galleryItems/")
      .then((res) => {
        setGalleryItems(res.data.galleryItemList);
        setLoadedGalleryList(true);
      });
  }, [loadedGalleryList]);
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
            </tr>
          ))}
        </tbody>
      </table>
      {showAddPrompt && (
        <AddGallery
          onClose={() => setShowAddPrompt(false)}
          onSubmit={() => {
            setShowAddPrompt(false);
            setLoadedGalleryList(false);
          }}
        />
      )}
    </div>
  );
}
