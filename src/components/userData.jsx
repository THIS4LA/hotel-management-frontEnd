import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserData() {
  const [user, setUser] = useState({});

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
          setUser(res.data.user);
        });
    } else {
      setUser(null);
    }
  }, [token]);
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      {!user ? (
        <Link className="w-auto h-auto py-1 px-3 border rounded-2xl border-gray-100 text-white hover:text-blue-400 hover:border-blue-400" to={"/login"}>
          Sign in
        </Link>
      ) : (
        <Link to={"/profile"} className="flex items-center space-x-2">
          <h1 className="text-[12px] text-white">{user.firstName}</h1>
          <img
            className="w-[35px] h-[35px] rounded-full object-cover"
            src={user.image}
            alt="profilePic"
          />
        </Link>
      )}

      {/* <button
        onClick={() => {
          localStorage.removeItem("token"),
            setUserFound(false),
            navigate("/login");
        }}
        className="bg-white text-red-500 text-sm px-3 py-1 rounded hover:bg-red-100"
      >
        Logout
      </button> */}
    </div>
  );
}

export default UserData;
