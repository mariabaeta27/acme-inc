'use client'
import { useState } from "react";
import { Client } from "../../../types/types";
import { logout } from "../../api/Clients";
import { clearCart } from "../../api/Ecomerce";

const Dropdown = ({ data }: { data: Client }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutCLient = () => {
    logout()
    clearCart()
    setIsOpen(!isOpen);
    window.location.reload();
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-green font-semibold pl-2 pb-2 inline-flex items-end"
      >
        <p className="w-28 truncate break-all sm:w-auto">
          {data.name}
        </p>
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.293 13.293a1 1 0 0 0 1.414 0l4-4a1 1 0 1 0-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 1 0-1.414 1.414l4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-2 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg">
          <li>
            <p
              className="block px-4 py-2 text-green hover:text-gray"
              onClick={() => logoutCLient()}
            >
              Deslogar
            </p>
          </li>
        </ul>
      )}
    </div>

  )
}

export default Dropdown