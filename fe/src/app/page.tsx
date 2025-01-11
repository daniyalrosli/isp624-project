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
          <Link href="/tips" className="text-gray-700 hover:text-blue-500">Tips</Link>
          <Link href="/package" className="text-gray-700 hover:text-blue-500">Package</Link>
          <Link href="/contacts" className="text-gray-700 hover:text-blue-500">Contacts</Link>
          
          <Link href="/login" className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:shadow-lg transition-shadow">Login</Link>
        </div>
      </div>
    </nav>
  );
};
export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-serif text-gray-900">Welcome to InsureXpert</h1>
            <h2 className="text-xl text-gray-700">AI-Driven Insights for Smarter Insurance</h2>
            <p className="text-gray-600 leading-relaxed">
              InsureXpert is a state-of-the-art platform designed to revolutionize 
              the way you manage health insurance claims. Leveraging advanced AI 
              and predictive analytics, we simplify claim reviews, enhance transparency, 
              and deliver actionable insights tailored to your needs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform specializes in health insurance claim prediction helping 
              individuals and organizations accurately estimate claim amounts. Using 
              factors such as age, BMI, medical history, smoking habits, and more, 
              InsureXpert&apos;s prediction model empowers users to make informed decisions 
              and ensures a smoother, more efficient claims process.
            </p>
            <div className="flex space-x-4">
              <Link href="/features">
                <button className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">
                  Explore Features
                </button>
              </Link>
              <Link href="/info">
                <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 transition">
                  More Info
                </button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/img/img1.jpg" // Replace with an insurance or data analytics-themed image
              alt="InsureXpert Illustration"
              width={600}
              height={600}
              className="w-full"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}