

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-14">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <p className="mt-4 text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="mt-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <p className="mt-4 text-gray-400">
              123 Main Street <br />
              City, State ZIP <br />
              info@example.com <br />
              (123) 456-7890
            </p>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold text-white">Stay Connected</h3>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="mr-4 text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 1.5A1.5 1.5 0 0 1 4.5 0h16A1.5 1.5 0 0 1 22 1.5v16a1.5 1.5 0 0 1-1.5 1.5h-6.529l-.473 2.818A1.5 1.5 0 0 1 12.5 24h-3a1.5 1.5 0 0 1-1.498-1.682L7.028 19.5H0a1.5 1.5 0 0 1-1.5-1.5V1.5zM17.294 0c.804 0 1.406.725 1.206 1.514l-1.54 9.229c-.08.491-.15 1.029-.211 1.542-.244.268-.536.478-.849.625-.312.147-.673.221-1.071.221h-2.87l.003-5.382H12.5c0-.74.07-1.442.207-2.102.137-.661.362-1.284.682-1.87a5.587 5.587 0 0 1 1.13-1.633c.478-.441 1.039-.789 1.682-1.043.645-.256 1.345-.383 2.1-.383h1.39z"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="mr-4 text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.498 4.586c-.713.317-1.48.53-2.287.625.821-.482 1.451-1.246 1.749-2.155a9.17 9.17 0 0 1-2.918 1.115 4.567 4.567 0 0 0-7.803 4.157 12.955 12.955 0 0 1-9.404-4.767 4.515 4.515 0 0 0-.617 2.29 4.564 4.564 0 0 0 2.028 3.803 4.513 4.513 0 0 1-2.064-.573v.057a4.565 4.565 0 0 0 3.643 4.468c-.67.182-1.377.182-2.047-.007a4.563 4.563 0 0 0 4.253 3.162 9.154 9.154 0 0 1-5.66 1.953c-.367 0-.732-.022-1.092-.067a12.92 12.92 0 0 0 7.01 2.06c8.38 0 12.954-6.944 12.954-12.954 0-.197-.005-.393-.013-.587a9.266 9.266 0 0 0 2.274-2.354"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M21.245 0H2.753C1.234 0 0 1.224 0 2.731v18.538C0 22.776 1.234 24 2.753 24h18.492C22.765 24 24 22.776 24 21.269V2.731C24 1.224 22.765 0 21.245 0zM7.924 20.465H4.244V9.212h3.68v11.253h-.001zM5.084 7.946a1.61 1.61 0 1 1-3.221 0 1.61 1.61 0 0 1 3.221 0zm15.382 12.519h-3.68v-5.68c0-1.352-.026-3.094-1.882-3.094-1.884 0-2.173 1.473-2.173 2.993v5.782H9.958V9.212h3.493v1.59h.05a3.83 3.83 0 0 1 3.444-1.896c3.684 0 4.371 2.43 4.371 5.587v6.972z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
