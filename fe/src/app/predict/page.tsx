'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-gray-800">InsureXpert</Link>
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link href="/predict" className="text-gray-700 hover:text-blue-500">Predict</Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-500">Contacts</Link>
          <Link href="/package" className="text-gray-700 hover:text-blue-500">Package</Link>
        </div>
      </div>
    </nav>
  );
};

const Predict = () => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    bloodpressure: '',
    children: '',
    smoker: 'No',
    region: ''
  });

  const [prediction, setPrediction] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.age || !formData.bmi || !formData.bloodpressure || !formData.children || !formData.region) {
      setError('Please fill in all the fields correctly.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setRecommendations('');
    setPrediction('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5001/predict', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      }

      if (response.data.recommendations && response.data.recommendations.length > 0) {
        setRecommendations(response.data.recommendations.join('\n'));
      } else {
        setRecommendations('No specific recommendations available.');
      }

      if (response.data.report_file) {
        setFormData({
          age: '',
          bmi: '',
          bloodpressure: '',
          children: '',
          smoker: 'No',
          region: ''
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data?.error || 'An unknown error occurred.';
        setError(`Unable to process your request: ${serverError}`);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-8 flex space-x-8">
        {/* Main Form Section */}
        <div className="flex-1">
          <h1 className="text-4xl font-serif text-gray-900 text-center">Insurance Claim Prediction</h1>
          <p className="text-lg text-gray-700 text-center mt-4">Get an estimate of your potential insurance claim based on your details.</p>

          <form onSubmit={handleSubmit} className="mt-12 space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="age" className="text-gray-700">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="bmi" className="text-gray-700">BMI</label>
                <input
                  type="number"
                  id="bmi"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  placeholder="Enter your BMI"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="bloodpressure" className="text-gray-700">Blood Pressure</label>
                <input
                  type="number"
                  id="bloodpressure"
                  name="bloodpressure"
                  value={formData.bloodpressure}
                  onChange={handleChange}
                  placeholder="Enter your blood pressure"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="children" className="text-gray-700">Children</label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  placeholder="Number of children"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="smoker" className="text-gray-700">Smoker</label>
              <select
                id="smoker"
                name="smoker"
                value={formData.smoker}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="region" className="text-gray-700">Region</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="" disabled>Select a region</option>
                <option value="northwest">Northwest</option>
                <option value="northeast">Northeast</option>
                <option value="southeast">Southeast</option>
                <option value="southwest">Southwest</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:shadow-lg transition-shadow"
                disabled={loading}
              >
                {loading ? 'Predicting...' : 'Get Prediction'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-6 text-center text-red-500">{error}</div>
          )}

{prediction && (
  <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-sm">
    <h3 className="text-xl font-medium text-gray-800 mb-2">Estimated Claim Amount</h3>
    <p className="text-lg text-gray-600">{prediction}</p>
    <Link href="/package">
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
        Check Recommended Packages
      </button>
    </Link>
  </div>
)}

{recommendations && (
  <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-sm">
    <h3 className="text-xl font-medium text-gray-800 mb-2">Recommendations</h3>
    <ul className="list-disc list-inside text-base text-gray-600">
      {recommendations.split('\n').map((rec, index) => (
        <li key={index}>{rec}</li>
      ))}
    </ul>
  </div>
)}
          
        </div>

     {/* Tips Section */}
<div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 max-w-md mx-auto">
  <h3 className="text-2xl font-semibold text-blue-800 mb-4">Understanding Regions in Insurance Claims</h3>
  <p className="text-sm text-gray-700 mb-6">
    The regions used in our predictions represent different geographical areas:
    <ul className="list-disc pl-5 text-gray-700">
      <li>
        <strong>Northeast:</strong> States in the northeastern part of the country, known for diverse climates and urban density.
      </li>
      <li>
        <strong>Northwest:</strong> Areas in the northwestern region, often characterized by forests, mountains, and cooler climates.
      </li>
      <li>
        <strong>Southwest:</strong> States in the southwest with arid climates, deserts, and sunny weather.
      </li>
      <li>
        <strong>Southeast:</strong> Regions in the southeast, known for humid weather and a mix of coastal and inland areas.
      </li>
    </ul>
  </p>
  <p className="text-sm text-gray-700 mb-6">
    Understanding your region can help you better interpret insurance claim predictions, as regional factors like healthcare costs and lifestyle can influence the outcomes.
  </p>
  <Link href="/info">
    <button className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300">
      Learn More About Regions
    </button>
  </Link>
</div>
      </section>
    </div>
  );
};

export default Predict;