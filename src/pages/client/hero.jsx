import React from "react";
import BookingBar from "../../components/bookingBar";
import HeroNo from "../../components/heroNo";

export default function Hero() {
  return (
    <div id="home" className="w-full h-[100vh] bg-[url('/Vector.jpg')]  bg-cover bg-center flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/30"></div>
        <h1 className="text-[36px] md:text-[52px] font-bold text-white drop-shadow-2xl backdrop:blur-md">
          <span className="text-blue-400">
          The Best
        </span>{" "} Luxury Hotel
        </h1>
        <p className="text-[24px] text-white">
          Experience luxury and comfort with us
        </p>
        <BookingBar/>
        <HeroNo/>
    </div>
  );
}
