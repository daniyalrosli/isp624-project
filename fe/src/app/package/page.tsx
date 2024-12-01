"use client";

import { useState } from 'react';
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

const PackageSection = ({ claimPrediction }: { claimPrediction: string }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const packages = [
    {
      name: 'Basic Coverage',
      price: 'RM 150 - RM 200/month',
      features: [
        'Basic medical coverage',
        'Accident protection',
        'Emergency services',
        '24/7 helpline support',
        'Annual health screening'
      ],
      recommended: false,
      claimRange: [0, 200]
    },
    {
      name: 'Premium Coverage',
      price: 'RM 200 - RM 350/month',
      features: [
        'Comprehensive medical coverage',
        'Enhanced accident protection',
        'Emergency services worldwide',
        'Priority medical support',
        'Quarterly health screening',
        'Dental coverage',
        'Vision coverage'
      ],
      recommended: false,
      claimRange: [200, 350]
    },
    {
      name: 'Elite Coverage',
      price: 'RM 350 - RM 500/month',
      features: [
        'Comprehensive medical coverage',
        'Enhanced accident protection',
        'Emergency services worldwide',
        'Priority medical support',
        'Quarterly health screening',
        'Dental & vision coverage',
        'Personalized health coach'
      ],
      recommended: true,
      claimRange: [350, 500]
    }
  ];

  // Recommend a package based on the claim result
  const recommendedPackage = claimPrediction === 'High' ? 'Elite Coverage' : claimPrediction === 'Medium' ? 'Premium Coverage' : 'Basic Coverage';

  const nearestBranch = "Bayan Lepas Branch"; // Replace with actual logic to determine nearest branch

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-serif text-gray-900 text-center mb-4">Insurance Packages</h1>
        <p className="text-lg text-gray-700 text-center mb-12">Choose the perfect insurance package that suits your needs based on your claim prediction.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-lg p-8 border-2 transition-all duration-300 hover:shadow-xl
                ${selectedPackage === pkg.name ? 'border-blue-500' : 'border-transparent'}
                ${pkg.recommended ? 'relative transform hover:-translate-y-2' : 'hover:-translate-y-1'}`}
            >
              {pkg.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{pkg.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPackage(pkg.name)}
                className={`w-full py-3 rounded-lg transition-colors duration-200 
                  ${selectedPackage === pkg.name 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white'}`}
              >
                {selectedPackage === pkg.name ? 'Selected' : 'Select Package'}
              </button>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-4">Based on your claim prediction, we recommend the {recommendedPackage}.</p>
            <p className="text-lg text-gray-700 mb-6">To learn more or sign up, visit your nearest branch:</p>
            <p className="text-xl font-semibold text-blue-600 mb-6">{nearestBranch}</p>
            <Link href="/contacts">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Get More Information
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Package({ claimPrediction }: { claimPrediction: string }) {
  return <PackageSection claimPrediction={claimPrediction} />;
}