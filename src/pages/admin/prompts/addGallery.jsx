import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import { IoCloudUpload } from "react-icons/io5";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddGallery({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [imgUploading, setImgUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
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
      setUrl(data.secure_url);
      setFormData((prev) => ({ ...prev, img: data.secure_url }));
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setImgUploading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/galleryItems", formData)
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
        <h2 className="text-xl font-bold mb-4">Add Image</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            className="border px-3 py-2 rounded w-full"
          />

          <div className="w-full h-40 border border-dashed rounded">
            {imgUploading ? (
              <div className="flex justify-center items-center h-full w-full">
                <ScaleLoader color="#1E88E5" height={18} />
              </div>
            ) : formData.img ? (
              <div className="relative">
                <img
                  src={url}
                  alt="Uploaded"
                  className="rounded w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUrl(""), setFormData((prev) => ({ ...prev, img: "" }));
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
                  name="img"
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
              "Save Room"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
