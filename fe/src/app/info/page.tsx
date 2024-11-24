"use client";

import Navbar from "../components/navbar";


export default function Info() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-indigo-100 to-blue-50 text-gray-800 min-h-screen p-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-6">More About InsureXpert</h1>

        <p className="text-lg text-center text-gray-600 mb-12">
          Discover how InsureXpert benefits both users and businesses while offering great potential for growth and profitability.
        </p>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
             
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personalized Predictions</h2>
            <p className="text-gray-700 mb-2">Provides accurate claim predictions based on key individual factors like age, health, and lifestyle.</p>
            <p className="text-gray-600">Helps users understand their insurance needs, leading to more tailored coverage.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
              
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Health Insights</h2>
            <p className="text-gray-700 mb-2">Offers valuable health insights by analyzing personal data and predicting future health risks.</p>
            <p className="text-gray-600">Helps users take proactive measures to reduce health risks and manage medical expenses.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
             
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cost Efficiency</h2>
            <p className="text-gray-700 mb-2">Predicts claim amounts to help users optimize insurance policies and save on premiums.</p>
            <p className="text-gray-600">By predicting potential claims, users can avoid overpaying for insurance coverage.</p>
          </div>
        </div>

        {/* Business Potential Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
              
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data-Driven Decision Making</h2>
            <p className="text-gray-700 mb-2">Allows insurance companies to make data-backed decisions for pricing, underwriting, and customer retention.</p>
            <p className="text-gray-600">Improves operational efficiency and profitability for businesses using predictive data.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
             
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Customer Retention</h2>
            <p className="text-gray-700 mb-2">Personalized solutions increase customer satisfaction, boosting retention rates.</p>
            <p className="text-gray-600">By offering tailored services, businesses can build long-term relationships with clients.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="text-indigo-600 text-3xl mb-4">
           
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Scalability</h2>
            <p className="text-gray-700 mb-2">InsureXpert can scale across global markets, tapping into new customer bases with diverse insurance needs.</p>
            <p className="text-gray-600">Expands market reach and revenue potential for insurance businesses worldwide.</p>
          </div>
        </div>
      </div>
    </>
  );
}