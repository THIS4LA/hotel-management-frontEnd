import { Link } from "react-router-dom";
import UserData from "./userData";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "" },
    { name: "About", path: "" },
    { name: "Rooms", path: "" },
    { name: "Contact", path: "" },
  ];

  function toggleMenu() {
    setIsMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="w-full px-10 py-2 h-[64px] flex justify-between items-center border-b border-gray-100">
      <h1 className="text-[20px] font-semibold text-white">
        Hotel Management System
      </h1>
      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex gap-8 pr-10 items-center">
            {menuItems.map((menuItem) => (
              <Link
                className="text-white text-base hover:text-blue-300 transition-colors"
                key={menuItem.name}
                to={menuItem.path}
              >
                {menuItem.name}
              </Link>
            ))}
          </div>

          <UserData />
        </div>
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white cursor-pointer z-20"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <IoMdClose size={24} /> : <RiMenu3Fill size={24} />}
          </button>
          <div
            className={`flex flex-col fixed right-0 top-0 w-[200px] pt-[60px] px-8 gap-4 bg-black h-full transition-all duration-500 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {menuItems.map((menuItem) => (
              <Link
                className="text-white text-base hover:text-blue-300 transition-colors"
                key={menuItem.name}
                to={menuItem.path}
                onClick={closeMenu}
              >
                {menuItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
