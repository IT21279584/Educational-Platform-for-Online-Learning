// Header.jsx

import React, { useState } from "react";
import { Container } from "reactstrap";

const navLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About",
    url: "#",
  },
  {
    display: "Courses",
    url: "#",
    sublinks: [
      {
        display: "Web Development",
        url: "#",
      },
      {
        display: "Data Science",
        url: "#",
      },
      {
        display: "UI/UX Design",
        url: "#",
      },
    ],
  },
  {
    display: "Book Store",
    url: "books",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  const menuToggle = () => setIsMenuOpen(!isMenuOpen);

  const toggleCoursesMenu = () => setIsCoursesOpen(!isCoursesOpen);

  return (
    <header className="bg-white text-gray-900 shadow-md py-3 font-semibold">
      <Container className="">
        <div className="flex items-center justify-between">
          <div className="logo">
            <h2 className="flex items-center gap-1 text-gray-500">
              <i className="ri-pantone-line text-blue-600"></i> Learners.
            </h2>
          </div>

          <nav className="nav md:flex md:items-center md:gap-5">
            <div className="hidden md:block">
              <ul className="flex gap-5">
                {navLinks.map((item, index) => (
                  <li key={index} className="relative">
                    {item.sublinks ? (
                      <button
                        className="hover:text-blue-600 focus:outline-none"
                        onClick={
                          item.display === "Courses"
                            ? toggleCoursesMenu
                            : null
                        }
                      >
                        {item.display}
                      </button>
                    ) : (
                      <button
                        className="hover:text-blue-600 focus:outline-none"
                        onClick={() => window.location.href = item.url}
                      >
                        {item.display}
                      </button>
                    )}
                    {item.sublinks && isCoursesOpen && (
                      <ul className="absolute top-full left-0 bg-white p-2 mt-1 rounded-md shadow-lg">
                        {item.sublinks.map((sublink, subIndex) => (
                          <li key={subIndex}>
                            <button
                              onClick={() => window.location.href = sublink.url}
                              className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                            >
                              {sublink.display}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="nav__right md:ml-auto">
              <p className="mb-0 flex items-center gap-2">
                <i className="ri-phone-line"></i> 0717159789
              </p>
            </div> */}
          </nav>

          <div className="mobile__menu md:hidden">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <ul className="mt-2">
              {navLinks.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.sublinks ? (
                    <button
                      className="block w-full py-2 px-4 text-left text-gray-900 hover:text-blue-600 focus:outline-none"
                      onClick={toggleCoursesMenu}
                    >
                      {item.display}
                    </button>
                  ) : (
                    <button
                      className="block w-full py-2 px-4 text-left text-gray-900 hover:text-blue-600 focus:outline-none"
                      onClick={() => window.location.href = item.url}
                    >
                      {item.display}
                    </button>
                  )}
                  {item.sublinks && isCoursesOpen && (
                    <ul className="ml-4">
                      {item.sublinks.map((sublink, subIndex) => (
                        <li key={subIndex}>
                          <button
                            onClick={() => window.location.href = sublink.url}
                            className="block py-2 px-4 text-gray-900 hover:bg-gray-100 rounded-md"
                          >
                            {sublink.display}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
