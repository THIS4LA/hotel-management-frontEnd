import React from "react";
import Wyndham from "../../assets/wyndam.jpg";

const About = () => {
  return (
    <div id="about" className="w-full bg-white py-16 px-4">
      <div className="mx-auto grid md:grid-cols-2 max-w-[1240px] gap-10 items-center justify-center">
        <img className="rounded-2xl" src={Wyndham} />
        <div className="flex flex-col gap-5">
          <h1 className="text-blue-400 text-[36px] font-medium">
            About Us
          </h1>
          <p className="text-justify">
            Welcome to Wyndham Hotel Maldives, where comfort meets genuine
            hospitality. Conveniently located in the heart of Malé, we offer
            a relaxing escape just minutes from business hubs, shopping, and
            cultural landmarks.<br/><br/>With modern rooms, thoughtful amenities, and
            warm service, our goal is to make every stay memorable—whether
            you're here for business, leisure, or a family getaway. At Wyndham,
            you'll always feel right at home.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
