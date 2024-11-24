"use client";

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Risk = () => {
  interface Customer {
    id: number;
    age: number;
    smoker: string;
    bmi: number;
    region: string;
  }

  const [customerData, setCustomerData] = useState<Customer[]>([]);
  interface RiskCustomer extends Customer {
    riskScore: number;
  }

  const [riskData, setRiskData] = useState<RiskCustomer[] | null>(null);

  useEffect(() => {
    // Fetch the customer data from the backend
    axios.get('/api/customers') // Adjust the API endpoint accordingly
      .then(response => {
        setCustomerData(response.data);
      })
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  useEffect(() => {
    const calculateRisk = (customer: Customer) => {
      let riskScore = 0;
      if (customer.age > 50) riskScore += 2;
      if (customer.smoker === 'yes') riskScore += 3;
      if (customer.bmi > 30) riskScore += 2;
      if (customer.region === 'high-risk') riskScore += 1;
      return riskScore;
    };

    const riskScores = customerData.map((customer) => ({
      ...customer,
      riskScore: calculateRisk(customer)
    }));
    setRiskData(riskScores);
  }, [customerData]);

  const chartData = {
    labels: riskData ? riskData.map((customer: RiskCustomer) => `Customer ${customer.id}`) : [],
    datasets: [{
      label: 'Risk Score',
      data: riskData ? riskData.map((customer: RiskCustomer) => customer.riskScore) : [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Risk Assessment</h1>
      {riskData ? (
        <>
          <div className="mt-8">
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
          <table className="table-auto w-full mt-8">
            <thead>
              <tr>
                <th className="border px-4 py-2">Customer ID</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Smoker</th>
                <th className="border px-4 py-2">BMI</th>
                <th className="border px-4 py-2">Region</th>
                <th className="border px-4 py-2">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {riskData.map((customer: RiskCustomer) => (
                <tr key={customer.id}>
                  <td className="border px-4 py-2">{customer.id}</td>
                  <td className="border px-4 py-2">{customer.age}</td>
                  <td className="border px-4 py-2">{customer.smoker}</td>
                  <td className="border px-4 py-2">{customer.bmi}</td>
                  <td className="border px-4 py-2">{customer.region}</td>
                  <td className="border px-4 py-2">{customer.riskScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Risk;