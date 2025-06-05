import axios from "axios";
import profilePic from "./../assets/IMG_2436.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserData() {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/type",
          },
        })
        .then((res) => {
          const firstName = res.data.user.firstName;
          const lastName = res.data.user.lastName;
          const name = firstName + " " + lastName;
          setName(name);
          setUserFound(true);
        });
    } else {
      setName(" ");
    }
  }, [userFound]);

  const token = localStorage.getItem("token");
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <h1 className="text-[12px] text-white">{name}</h1>
      <img
        className="w-[35px] h-[35px] rounded-full object-cover"
        src={profilePic}
        alt="profilePic"
      />
      <button
        onClick={() => {
          localStorage.removeItem("token"),
            setUserFound(false),
            navigate("/login");
        }}
        className="bg-white text-red-500 text-sm px-3 py-1 rounded hover:bg-red-100"
      >
        Logout
      </button>
    </div>
  );
}

export default UserData;
