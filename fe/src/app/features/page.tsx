"use client";

import Navbar from "../components/navbar";

const features = [
  {
    name: "Age",
    description:
      "Represents the age of the individual seeking insurance. Age is a critical factor as it correlates with health risks and the likelihood of incurring medical expenses.",
    influence:
      "As age increases, the predicted claim amount tends to rise. This is because older individuals are more likely to experience health issues, leading to higher medical costs.",
  },
  {
    name: "BMI (Body Mass Index)",
    description:
      "BMI measures the body fat of an individual based on height and weight. It indicates whether a person is underweight, healthy, overweight, or obese.",
    influence:
      "Higher BMI values often correlate with higher predicted claim amounts due to increased risks of chronic conditions like diabetes, hypertension, or cardiovascular diseases.",
  },
  {
    name: "Smoker Status",
    description:
      "Indicates whether the individual smokes regularly. Smoking is a known risk factor for various health conditions, such as respiratory diseases and cancer.",
    influence:
      "Smokers tend to have significantly higher predicted claim amounts due to the long-term health effects associated with smoking habits.",
  },
  {
    name: "Children",
    description:
      "The number of dependents or children covered under the insurance policy.",
    influence:
      "An increase in the number of children may lead to slightly higher claim amounts as the insurance might cover additional medical expenses for dependents.",
  },
  {
    name: "Region",
    description:
      "The geographical location of the individual. It represents where the individual resides and may reflect healthcare costs and access in that area.",
    influence:
    "The region is represented numerically: 0 for Northwest (e.g., Perlis, Kedah, Penang, Perak), 1 for Southwest (e.g., Selangor, Kuala Lumpur, Negeri Sembilan, Melaka), and 2 for Central (e.g., Johor, Pahang, Terengganu, Kelantan).",
  },   
  {
    name: "Blood Pressure",
    description:
      "Indicates the individual's blood pressure levels, which are categorized as normal, elevated, or high.",
    influence:
      "Higher blood pressure levels are associated with increased risks of cardiovascular diseases, strokes, and other health complications, leading to higher predicted claim amounts.",
  },
];

export default function Features() {
  return (
    <>
      <Navbar />
      <div className="bg-white text-gray-800 min-h-screen p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Feature Explanations</h1>
        <p className="text-lg text-center text-gray-600 mb-12">
          Each feature contributes uniquely to the prediction model. Below are
          detailed explanations of the features and their impact on the
          predicted claim amount.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{feature.name}</h2>
              <p className="text-gray-700 mb-2">{feature.description}</p>
              <p className="text-gray-800 mb-4">
                <strong className="text-gray-900">Influence:</strong> {feature.influence}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}