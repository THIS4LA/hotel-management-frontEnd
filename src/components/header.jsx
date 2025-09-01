import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import UserData from "./userData";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import logo from '../../public/logo.png';
import { useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems =
    location.pathname === "/"
      ? [
          { name: "Home", path: "home", type: "scroll" },
          { name: "About", path: "about", type: "scroll" },
          { name: "Rooms", path: "rooms", type: "scroll" },
          { name: "Contact", path: "contact", type: "scroll" },
        ]
      : [{ name: "Home", path: "/", type: "route" }];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const renderMenuLink = (menuItem) => {
    if (menuItem.type === "scroll") {
      return (
        <ScrollLink
          key={menuItem.name}
          to={menuItem.path}
          smooth={true}
          duration={500}
          offset={-64}
          className="text-white text-base hover:text-blue-400 transition-colors cursor-pointer"
          onClick={closeMenu}
        >
          {menuItem.name}
        </ScrollLink>
      );
    } else {
      return (
        <Link
          key={menuItem.name}
          to={menuItem.path}
          className="text-white text-base hover:text-blue-400 transition-colors cursor-pointer"
          onClick={closeMenu}
        >
          {menuItem.name}
        </Link>
      );
    }
  };

  return (
    <div className="w-full px-10 py-2 h-[64px] flex justify-between items-center border-b border-gray-100 backdrop-blur-sm fixed z-10">
      <img src={logo} className="h-[76px] drop-shadow-2xl" />
      <div className="flex items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <div className="flex gap-8 pr-10 items-center">
            {menuItems.map(renderMenuLink)}
          </div>
          <UserData />
        </div>

        {/* Mobile Menu */}
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
            {menuItems.map(renderMenuLink)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
