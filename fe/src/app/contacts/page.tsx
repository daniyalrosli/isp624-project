"use client";

import Navbar from "../components/navbar";

export default function Contacts() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Have any questions or need support? Reach out to us below.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Send us a Message</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message here"
                    rows={6}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
              <div className="mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> support@insurexpert.com
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> +1 (800) 123-4567
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Office Address:</strong> 123 Insurance Lane, Suite 100, City, Country
                </p>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/insurexpert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/insurexpert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Twitter
                </a>
                <a
                  href="https://www.facebook.com/insurexpert"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}