import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { IoCloudUpload } from "react-icons/io5";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditRoom({ onClose, onSubmit, room, roomId }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [formData, setFormData] = useState({
    roomName: room?.roomName || "",
    category: room?.category || "Standard",
    price: room?.price || "",
    features: room?.features || [],
    capacity: room?.capacity ||"",
    availability: room?.availability || "",
    image: room?.image || ""
  });

  async function handleImgChange(e) {
    const file = e.target.files[0];
    setImgUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log(data);
      setUrl(data.secure_url);
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImgUploading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "features") {
      const featureArray = value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      setFormData((prev) => ({ ...prev, [name]: featureArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        onSubmit();
        onClose();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Room</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="roomName"
            placeholder="Room Name"
            value={formData.roomName}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          />

          <textarea
            name="features"
            placeholder="Features(Optional)"
            value={formData.features.join(", ")}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            rows={3}
          ></textarea>

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />

          <select
            name="availability"
            value={formData.availability ? "Yes" : "No"}
            onChange={(e) =>
              setFormData({
                ...formData,
                availability: e.target.value === "Yes",
              })
            }
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Yes">Available</option>
            <option value="No">N/A</option>
          </select>

          <div className="w-full h-40 border border-dashed rounded">
            {imgUploading ? (
              <div className="flex justify-center items-center h-full w-full">
                <ScaleLoader color="#1E88E5" height={18} />
              </div>
            ) : formData.image ? (
              <div className="relative">
                <img
                  src={url|| formData.image}
                  alt="Uploaded"
                  className="rounded w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUrl(""), setFormData((prev) => ({ ...prev, image: "" }));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label
                htmlFor="fileUpload"
                className="w-full h-full flex justify-center items-center cursor-pointer"
              >
                <div className="flex flex-col items-center text-gray-500 hover:text-blue-600">
                  <IoCloudUpload className="text-3xl mb-1" />
                  <span className="text-sm font-medium">Upload an image</span>
                </div>
                <input
                  id="fileUpload"
                  type="file"
                  name="Image"
                  onChange={handleImgChange}
                  className="hidden"
                  required
                />
              </label>
            )}
          </div>
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
              "Update Room"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
