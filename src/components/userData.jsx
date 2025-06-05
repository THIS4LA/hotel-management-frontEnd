import axios from "axios";
import profilePic from "./../assets/IMG_2436.jpg";
import { useState } from "react";

function UserData() {
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");
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
        const name = firstName +" "+ lastName;
        setName(name);
      });
  }
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <h1 className="text-[12px] text-white">{name}</h1>
      <img className="w-[35px] h-[35px] rounded-full object-cover" src={profilePic} alt="profilePic" />
    </div>
  );
}

export default UserData;
