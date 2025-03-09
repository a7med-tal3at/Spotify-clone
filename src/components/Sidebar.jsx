import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

import { links } from "../assets/constants";
import { logo } from "../assets";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((link, index) => (
      <NavLink
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
        to={link.to}
        key={index}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobleMenuOpen, setMobleMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobleMenuOpen ? (
          <RiCloseLine
            className="text-white hover:text-gray-300 w-6 h-6 cursor-pointer"
            onClick={() => setMobleMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="text-white hover:text-gray-300 w-6 h-6 cursor-pointer"
            onClick={() => setMobleMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobleMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobleMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
