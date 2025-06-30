import { useEffect, useState } from "react";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/").then((res) => {
      setUsers(res.data.userList);
      console.log(res.data.userList);
    });
  }, []);

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
                  className={
                    user.disabled ? "text-green-600" : "text-red-600"
                  }
                >
                  {user.disabled ? "Active" : "InActive"}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
