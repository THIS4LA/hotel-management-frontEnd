import { useEffect, useState } from "react";
import axios from "axios";
import EditUser from "./prompts/editUser";

export default function User() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [showEditPrompt, setShowEditPrompt] = useState(false);
  const [loadedUserList, setLoadedUserList] = useState(false);
  const [filterArray, setFilterArray] = useState({
    sortBy: "firstName",
    startDate: "",
    endDate: "",
    page: "1",
    limit: 10,
    order: "asc",
  });
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/",{
        params: filterArray,
      }).then((res) => {
      console.log(res.data);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setLoadedUserList(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUserList]);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

      <table className="w-full table-auto border border-gray-200 rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 border border-gray-200 text-left">Img</th>
            <th className="px-4 py-3 border border-gray-200 text-left">Name</th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Whatsapp
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Phone
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Disabled
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              EmailVerified
            </th>
            <th className="px-4 py-3 border border-gray-200 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-3 border border-gray-200">
                <img
                  src={user.image}
                  alt={user.roomName}
                  className="w-20 h-14 object-cover rounded-full"
                />
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-4 py-3 border border-gray-200">
                {user.whatsapp}
              </td>
              <td className="px-4 py-3 border border-gray-200">{user.phone}</td>
              <td className="px-4 py-3 border border-gray-200">
                <span
                  className={user.disabled ? "text-red-600" : "text-green-600"}
                >
                  {user.disabled ? "Inactive" : "Active"}
                </span>
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <span
                  className={
                    user.emailVerified ? "text-green-600" : "text-red-600"
                  }
                >
                  {user.emailVerified ? "Verified" : "Not Verified"}
                </span>
              </td>
              <td className="px-4 py-3 border border-gray-200">
                <button
                  className="px-3 py-1 text-white bg-blue-400 rounded hover:bg-blue-700"
                  onClick={() => {
                    setUser(user);
                    setUserId(user._id);
                    setShowEditPrompt(true);
                  }}
                >
                  Edit
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
              setLoadedUserList(false);
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {showEditPrompt && (
        <EditUser
          user={user}
          userId={userId}
          onClose={() => setShowEditPrompt(false)}
          onSubmit={() => {
            setShowEditPrompt(false);
            setLoadedUserList(false);
          }}
        />
      )}
    </div>
  );
}
