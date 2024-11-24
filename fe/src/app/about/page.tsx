'use client';

import Link from 'next/link';
import Image from 'next/image';

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

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-gray-900">About InsureXpert</h1>
          <p className="text-xl text-gray-700 mt-4">Transforming Insurance Claims with AI-Driven Predictions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At InsureXpert, we are revolutionizing the insurance industry by using machine learning and AI to predict insurance claims with remarkable accuracy. Our platform empowers insurance companies to predict claim amounts, helping them streamline their processes, improve risk management, and deliver better customer experiences. We enable insurers to make informed, data-driven decisions that lead to optimized claims handling and pricing strategies.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to be the global leader in insurance claim prediction. By leveraging the latest advancements in artificial intelligence, we aim to make the claims process more efficient, transparent, and cost-effective. Our goal is to create an AI-powered ecosystem that simplifies claims prediction, reduces fraud, and enhances trust between insurers and their customers.
            </p>
          </div>
          <div className="relative">
            <Image
              src="/img/img2.jpg" // Replace with an image relevant to the claim prediction concept
              alt="InsureXpert About"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Innovation</h3>
              <p className="text-gray-600">We use cutting-edge machine learning and predictive analytics to stay ahead of the curve and continually improve our claims prediction accuracy.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Accuracy</h3>
              <p className="text-gray-600">Our platform is built to provide highly accurate predictions, helping insurance providers make data-driven decisions and reduce operational risk.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Efficiency</h3>
              <p className="text-gray-600">We focus on making the claims process faster, more transparent, and cost-efficient, benefiting both insurers and policyholders.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}