import React, { useState, useEffect } from "react";
import axios from "axios";
import profilePic from "../../assets/contact.png";
import { ScaleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    image: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/type",
          },
        })
        .then((res) => {
          setProfile(res.data.user);
        });
    } else {
      setProfile(null);
    }
  }, [token, loading]);
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        image: profile.image || "",
      });
    }
  }, [profile, editMode]);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/book/" + user.email)
      .then((res) => {
        setBookings(res.data.bookings);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function imageChange(e) {
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
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      toast.error("Image upload failed. Please try again." + err.message);
    } finally {
      setImgUploading(false);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setEditMode((prev) => !prev);
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + user._id,
        formData
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-blue-400 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b pb-6">
          <div className="flex items-start gap-6">
            <img
              src={formData.image || profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {formData.firstName}
              </h1>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>
          <button
            className="px-10 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
            disabled={loading}
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-10 mt-6 border-b">
          <button
            className={`pb-2 text-lg font-medium ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            My Profile
          </button>
          <button
            className={`pb-2 text-lg font-medium ${
              activeTab === "bookings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-lg"
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className="w-full mt-1 p-2 border rounded-lg"
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full mt-1 p-2 border rounded-lg"
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium">
                  Contact
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full mt-1 p-2 border rounded-lg"
                  readOnly={!editMode}
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Your Photo
                </label>
                <div className="flex items-center gap-4">
                  {imgUploading ? (
                    <ScaleLoader color="#1E88E5" height={16} />
                  ) : (
                    <img
                      src={formData.image || profilePic}
                      alt="Profile"
                      className="rounded-full object-cover shadow-md w-16 h-16"
                    />
                  )}
                  {editMode && (
                    <input
                      id="fileUpload"
                      type="file"
                      name="Image"
                      onChange={imageChange}
                      required
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                {editMode ? (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-4">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.bookingId}
                      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-xl border border-gray-300 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="mb-2 md:mb-0">
                        <p className="font-semibold text-gray-900 text-lg">
                          {booking.rooms && booking.rooms.length > 0
                            ? booking.rooms
                                .map((room) => room.roomName)
                                .join(", ")
                            : "No rooms booked"}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-1 text-gray-500 text-sm">
                          <span>Start: {booking.startDate}</span>
                          <span>End: {booking.endDate}</span>
                        </div>
                      </div>
                      <p
                        className={`mt-2 md:mt-0 font-bold px-3 py-1 rounded-full text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-6">
                  No bookings yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
