'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScaleIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface BMICategory {
  range: string;
  category: string;
  color: string;
  description: string;
}

const bmiCategories: BMICategory[] = [
  { range: '< 18.5', category: 'Underweight', color: 'text-blue-400', description: 'You may need to gain some weight' },
  { range: '18.5 - 24.9', category: 'Normal Weight', color: 'text-green-400', description: 'Maintain a healthy lifestyle' },
  { range: '25 - 29.9', category: 'Overweight', color: 'text-yellow-400', description: 'Consider losing some weight' },
  { range: '30 - 34.9', category: 'Obesity Class I', color: 'text-orange-400', description: 'Focus on weight management' },
  { range: '35 - 39.9', category: 'Obesity Class II', color: 'text-red-400', description: 'Consult a healthcare provider' },
  { range: '≥ 40', category: 'Obesity Class III', color: 'text-red-600', description: 'Seek medical advice' },
];

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<BMICategory | null>(null);

  const calculateBMI = () => {
    if (!weight || !height) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to meters

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBMI(bmiValue);

    // Find category
    let selectedCategory = bmiCategories[0];
    if (bmiValue >= 40) {
      selectedCategory = bmiCategories[5];
    } else if (bmiValue >= 35) {
      selectedCategory = bmiCategories[4];
    } else if (bmiValue >= 30) {
      selectedCategory = bmiCategories[3];
    } else if (bmiValue >= 25) {
      selectedCategory = bmiCategories[2];
    } else if (bmiValue >= 18.5) {
      selectedCategory = bmiCategories[1];
    }
    setCategory(selectedCategory);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">BMI Calculator</h2>
          <p className="text-gray-400">Calculate your Body Mass Index</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Weight (kg)
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => handleInputChange(e, setWeight)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Height (cm)
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => handleInputChange(e, setHeight)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateBMI}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate BMI
          </motion.button>

          {bmi !== null && category && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <ScaleIcon className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-300">Your BMI: {bmi.toFixed(1)}</h3>
                </div>
                <p className={`text-lg font-medium ${category.color}`}>
                  {category.category}
                </p>
                <p className="text-sm text-gray-400">{category.description}</p>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">BMI Categories</h3>
            <div className="space-y-2">
              {bmiCategories.map((cat) => (
                <div
                  key={cat.range}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-400">{cat.range}</span>
                  <span className={cat.color}>{cat.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About BMI</h3>
            <p className="text-sm text-gray-400">
              BMI (Body Mass Index) is a simple measure that uses your height and weight to work out if your weight is healthy. 
              The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Note: BMI is just one measure of health and may not be accurate for everyone, especially athletes, pregnant women, 
              or the elderly. Always consult with a healthcare provider for a comprehensive health assessment.
            </p>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 