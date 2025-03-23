'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';

interface BodyFatCategory {
  range: string;
  category: string;
  color: string;
  description: string;
}

const maleCategories: BodyFatCategory[] = [
  { range: '2-5%', category: 'Essential Fat', color: 'text-red-500', description: 'Extremely lean, visible striations and vascularity' },
  { range: '6-13%', category: 'Athletes', color: 'text-orange-500', description: 'Visible muscle definition, some vascularity' },
  { range: '14-17%', category: 'Fitness', color: 'text-yellow-500', description: 'Visible muscle definition, some abs visible' },
  { range: '18-24%', category: 'Average', color: 'text-green-500', description: 'Some muscle definition, softer look' },
  { range: '25%+', category: 'Overfat', color: 'text-red-500', description: 'Little muscle definition, rounder appearance' },
];

const femaleCategories: BodyFatCategory[] = [
  { range: '10-13%', category: 'Essential Fat', color: 'text-red-500', description: 'Extremely lean, visible striations' },
  { range: '14-20%', category: 'Athletes', color: 'text-orange-500', description: 'Visible muscle definition' },
  { range: '21-24%', category: 'Fitness', color: 'text-yellow-500', description: 'Visible muscle definition, some abs visible' },
  { range: '25-31%', category: 'Average', color: 'text-green-500', description: 'Some muscle definition, softer look' },
  { range: '32%+', category: 'Overfat', color: 'text-red-500', description: 'Little muscle definition, rounder appearance' },
];

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [category, setCategory] = useState<BodyFatCategory | null>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);

    if (isNaN(h) || isNaN(n) || isNaN(w) || (gender === 'female' && isNaN(hp))) {
      setBodyFat(null);
      setCategory(null);
      return;
    }

    let bodyFatPercentage: number;
    if (gender === 'male') {
      // U.S. Navy method for men
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      // U.S. Navy method for women
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }

    setBodyFat(bodyFatPercentage);

    // Determine category
    const categories = gender === 'male' ? maleCategories : femaleCategories;
    const foundCategory = categories.find(cat => {
      const [min, max] = cat.range.split('-').map(Number);
      return bodyFatPercentage >= min && bodyFatPercentage <= max;
    }) || categories[categories.length - 1];

    setCategory(foundCategory);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Body Fat Calculator</h1>
          <p className="text-gray-400">Calculate your body fat percentage using the U.S. Navy method</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    gender === 'male'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    gender === 'female'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Neck Circumference (cm)</label>
              <input
                type="number"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter neck circumference"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Waist Circumference (cm)</label>
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter waist circumference"
              />
            </div>

            {gender === 'female' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hip Circumference (cm)</label>
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter hip circumference"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateBodyFat}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate Body Fat
            </motion.button>

            {bodyFat !== null && category && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Your Results</h2>
                  <div className="text-4xl font-bold mb-2">{bodyFat.toFixed(1)}%</div>
                  <div className={`text-xl font-semibold mb-2 ${category.color}`}>
                    {category.category}
                  </div>
                  <p className="text-gray-400">{category.description}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Body Fat Categories</h2>
          <div className="space-y-2">
            {(gender === 'male' ? maleCategories : femaleCategories).map((cat) => (
              <div key={cat.range} className="flex items-center space-x-2">
                <span className={`font-medium ${cat.color}`}>{cat.range}</span>
                <span className="text-gray-400">-</span>
                <span className="text-gray-300">{cat.category}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">About Body Fat Percentage</h2>
          <p className="text-sm text-gray-400">
            Body fat percentage is a measure of the amount of fat in your body compared to your total body weight.
            The U.S. Navy method is a simple way to estimate body fat percentage using circumference measurements.
            While this calculator provides a good estimate, it's important to note that:
          </p>
          <ul className="mt-2 text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>Results may vary based on measurement accuracy</li>
            <li>Different methods may give different results</li>
            <li>Consult with a healthcare professional for accurate measurements</li>
            <li>Body fat percentage is just one indicator of health</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default BodyFatCalculator; 