import React, { useState } from 'react';
import { FaCalculator } from 'react-icons/fa';

export default function MortgageCalculator({ propertyPrice }) {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('12');
  const [loanTerm, setLoanTerm] = useState('20');
  const [downPayment, setDownPayment] = useState('20');

  // Extract numeric price from property price string
  const extractPrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
  };

  const price = extractPrice(propertyPrice);
  const downPaymentAmount = price * (parseFloat(downPayment) / 100);
  const principal = loanAmount || (price - downPaymentAmount);
  const monthlyRate = parseFloat(interestRate) / 100 / 12;
  const numPayments = parseFloat(loanTerm) * 12;

  const calculateMonthlyPayment = () => {
    if (!principal || principal <= 0 || !monthlyRate || monthlyRate <= 0 || !numPayments) {
      return 0;
    }
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <FaCalculator className="text-green-600" />
        <h3 className="text-xl font-bold">Mortgage Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Property Price</label>
          <div className="text-2xl font-bold text-green-600">{propertyPrice}</div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Down Payment (%)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            min="0"
            max="100"
          />
          <p className="text-sm text-gray-500 mt-1">
            Down Payment: ₦{downPaymentAmount.toLocaleString()}
          </p>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Loan Amount (₦)</label>
          <input
            type="number"
            value={loanAmount || (price - downPaymentAmount)}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Interest Rate (%)</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            step="0.1"
            min="0"
            max="30"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Loan Term (Years)</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="15">15 Years</option>
            <option value="20">20 Years</option>
            <option value="25">25 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>

        {monthlyPayment > 0 && (
          <div className="bg-green-50 rounded-lg p-4 space-y-2 border border-green-200">
            <div className="flex justify-between">
              <span className="text-gray-700">Monthly Payment:</span>
              <span className="text-2xl font-bold text-green-600">
                ₦{monthlyPayment.toLocaleString('en-NG', { maximumFractionDigits: 0 })}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Payment:</span>
              <span>₦{totalPayment.toLocaleString('en-NG', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Interest:</span>
              <span>₦{totalInterest.toLocaleString('en-NG', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
