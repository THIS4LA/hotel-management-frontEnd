import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import axios from "axios";

export default function RoomCarousel() {
  const [rooms, setRooms] = useState([]);
  //eslint-disable-next-line
  const [filterArray, setFilterArray] = useState({
    sortBy: "price",
    startPrice: "",
    endPrice: "",
    page: "1",
    limit: 10,
    order: "asc",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms/", {
        params: filterArray,
      })
      .then((res) => {
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div id="rooms" className="h-auto py-5 bg-blue-400 flex flex-col items-center justify-center text-center">
      <h1 className="text-white text-[36px] font-medium">Rooms</h1>
      <p className="text-blue-100">
        Relax in modern, spacious rooms with plush bedding, free Wi-Fi, and
        stunning city views designed to make every stay
        <br />
        at Wyndham Hotel Maldives comfortable and memorable.
      </p>
      <div className="overflow-hidden max-w-[1240px] my-10" ref={emblaRef}>
        <div className="embla__container flex gap-5">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className="embla_slide flex-none basis-1/5 min-w-0"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={room.image}
                  alt={room.roomName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold line-clamp-1">{room.roomName}</h2>
                  <p className="text-blue-600 font-bold">{room.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
