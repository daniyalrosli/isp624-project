import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif text-gray-800">
             InsureXpert
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">
                Home
              </Link>
              <Link href="/about" className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">
                About
              </Link>
              <Link href="/predict" className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">
                Predict
              </Link>
              <Link href="/contacts" className="text-black hover:text-red-500 px-3 py-2 rounded-md text-md font-medium">
                Contacts
              </Link>
              <Link href="/login" className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-md font-medium">
                Login
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-red-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-red-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? 'true' : 'false'}
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/predict" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Predict
            </Link>
            <Link href="/dashboard" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </Link>
            <Link href="/report" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Report
            </Link>
            <Link href="/contacts" className="text-black hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Contacts
            </Link>
            <Link href="/login" className="text-white bg-red-500 hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;