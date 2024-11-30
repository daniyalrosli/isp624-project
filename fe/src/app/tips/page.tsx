'use client';

import { useState } from 'react';
import Link from 'next/link';

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-serif text-gray-800">InsureXpert</Link>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">About</Link>
          <Link href="/predict" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Predict</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Contacts</Link>
        </div>
      </div>
    </nav>
  );
};

// Tips and Advice Page Component
const Tips = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto p-6 lg:px-12 mt-8">
        <h1 className="text-4xl font-semibold text-center mb-10 text-gray-800">Health Tips & Advice</h1>
        
        <div className="bg-white shadow-2xl rounded-lg p-8 mb-10">
          <h2 className="text-3xl font-semibold text-gray-700">How to Improve Your Health and Reduce Your Claims</h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Following these health tips can improve your well-being and potentially lower your healthcare costs.
            The tips below are based on scientific evidence and aim to help you make healthier lifestyle choices.
          </p>
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Individual Tip Cards */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">1. Maintain a Healthy Weight</h3>
            <p className="mt-4 text-gray-600">
              Keeping a healthy weight reduces your risk of many chronic conditions such as heart disease and diabetes.
              Tracking your BMI can help you understand your current health status and make informed decisions.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">2. Quit Smoking</h3>
            <p className="mt-4 text-gray-600">
              Smoking is a leading cause of preventable health issues. Quitting can significantly improve your lung health, cardiovascular system, and reduce the likelihood of costly medical conditions.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">3. Regular Exercise</h3>
            <p className="mt-4 text-gray-600">
              Regular exercise improves cardiovascular health, maintains a healthy weight, and boosts overall well-being. Aim for at least 150 minutes of moderate activity each week.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">4. Healthy Eating</h3>
            <p className="mt-4 text-gray-600">
              Eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins supports your immune system and reduces your risk of chronic disease.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">5. Regular Health Check-ups</h3>
            <p className="mt-4 text-gray-600">
              Regular health check-ups can detect issues early, helping you manage health conditions before they become severe and expensive to treat.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300">
            <h3 className="text-2xl font-semibold text-gray-700">6. Manage Stress</h3>
            <p className="mt-4 text-gray-600">
              Stress is linked to various health problems, including heart disease and high blood pressure. Practice stress management techniques like deep breathing, yoga, or meditation.
            </p>
          </div>
        </div>

        {/* More Tips Toggle */}
        <div className="mt-8 text-center">
          <button 
            onClick={handleToggleMore} 
            className="text-blue-600 font-medium hover:underline focus:outline-none"
          >
            {showMore ? 'Show Less' : 'Show More Tips'}
          </button>

          {showMore && (
            <div className="mt-4 text-gray-600">
              <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">7. Stay Hydrated</h3>
                <p className="mt-4 text-gray-600">
                  Staying hydrated is essential for bodily functions, improving digestion, and maintaining healthy skin. Drink plenty of water and reduce sugary beverage intake.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">8. Get Enough Sleep</h3>
                <p className="mt-4 text-gray-600">
                  Quality sleep supports immune function, memory, and overall health. Aim for 7-9 hours of sleep each night for optimal health.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;