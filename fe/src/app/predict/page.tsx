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
  const [reportFile, setReportFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations('');
    setPrediction('');

    try {
      const response = await axios.post('http://127.0.0.1:5001/predict', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.prediction) {
        setPrediction(response.data.prediction);
      }

      if (response.data.recommendations) {
        setRecommendations(response.data.recommendations.join('\n'));
      }

      if (response.data.report_file) {
        setReportFile(response.data.report_file);
      }

      setFormData({
        age: '',
        bmi: '',
        bloodpressure: '',
        children: '',
        smoker: 'No',
        region: ''
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError('Error predicting claim amount: ' + (error.response?.data?.error || error.message));
      } else {
        setError('Error predicting claim amount: ' + error);
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
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
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
            </div>
          )}

          {recommendations && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Recommendations</h3>
              <p className="text-base text-gray-600">{recommendations}</p>
            </div>
          )}
        </div>

     {/* Sidenote Section */}
{/* Sidenote Section */}
{/* Sidenote Section */}
<div className="flex-1 bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-200 max-w-md mx-auto">
  <h3 className="text-2xl font-semibold text-blue-800 mb-4">Claim Prediction Tips</h3>
  <p className="text-sm text-gray-700 mb-6">
    After receiving your claim prediction, you can visit our tips page for advice and recommendations on how to handle your claim effectively.
  </p>
  <Link href="/tips">
    <button className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300">
      Go to Tips
    </button>
  </Link>
</div>
      </section>
    </div>
  );
};

export default Predict;