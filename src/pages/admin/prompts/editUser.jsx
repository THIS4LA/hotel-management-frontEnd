import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { IoCloudUpload } from "react-icons/io5";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditUser({ onClose, onSubmit, user, userId }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    whatsapp: user?.whatsapp || "",
    phone: user?.phone || "",
    image: user?.image || "",
    disabled: user?.disabled || false,
  });

  function handleSubmit() {
    setLoading(true);

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        disabled: formData.disabled,
      })
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
        <h2 className="text-xl font-bold mb-4">Edit Gallery</h2>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            disabled
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            disabled
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            disabled
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="Whatsapp"
            value={formData.whatsapp}
            disabled
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            disabled
            className="border px-3 py-2 rounded w-full"
          />

          <select
            name="disabled"
            value={formData.disabled ? "Yes" : "No"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                disabled: e.target.value === "Yes",
              }))
            }
            className="border px-3 py-2 rounded w-full"
          >
            <option value="No">Active</option>
            <option value="Yes">Disabled</option>
          </select>
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
