'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScaleIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface WeightRange {
  min: number;
  max: number;
  formula: string;
}

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [weightRanges, setWeightRanges] = useState<WeightRange[] | null>(null);

  const calculateIdealWeight = () => {
    if (!height) return;

    const heightNum = parseFloat(height);
    if (isNaN(heightNum) || heightNum <= 0) return;

    // Convert height to inches for calculations
    const heightInches = heightNum / 2.54;

    const ranges: WeightRange[] = [
      // Robinson Formula (1983)
      {
        min: Math.round((52 + 1.9 * (heightInches - 60)) * 0.453592),
        max: Math.round((52 + 1.9 * (heightInches - 60)) * 0.453592 * 1.1),
        formula: 'Robinson Formula',
      },
      // Miller Formula (1983)
      {
        min: Math.round((56.2 + 1.41 * (heightInches - 60)) * 0.453592),
        max: Math.round((56.2 + 1.41 * (heightInches - 60)) * 0.453592 * 1.1),
        formula: 'Miller Formula',
      },
      // Devine Formula (1974)
      {
        min: Math.round((50 + 2.3 * (heightInches - 60)) * 0.453592),
        max: Math.round((50 + 2.3 * (heightInches - 60)) * 0.453592 * 1.1),
        formula: 'Devine Formula',
      },
      // Hamwi Formula (1964)
      {
        min: Math.round((48 + 2.7 * (heightInches - 60)) * 0.453592),
        max: Math.round((48 + 2.7 * (heightInches - 60)) * 0.453592 * 1.1),
        formula: 'Hamwi Formula',
      },
    ];

    // Adjust for gender
    if (gender === 'male') {
      ranges.forEach(range => {
        range.min += 2.5;
        range.max += 2.5;
      });
    }

    setWeightRanges(ranges);
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
          <h2 className="text-2xl font-semibold">Ideal Weight Calculator</h2>
          <p className="text-gray-400">Calculate your ideal weight using multiple formulas</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGender('male')}
              className={`px-4 py-2 rounded-lg ${
                gender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Male
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGender('female')}
              className={`px-4 py-2 rounded-lg ${
                gender === 'female'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Female
            </motion.button>
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

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateIdealWeight}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate Ideal Weight
          </motion.button>

          {weightRanges && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <ScaleIcon className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-300">
                    Ideal Weight Ranges
                  </h3>
                </div>
                <div className="space-y-3">
                  {weightRanges.map((range, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-300 mb-1">
                        {range.formula}
                      </p>
                      <p className="text-sm text-gray-400">
                        {range.min} - {range.max} kg
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About Ideal Weight</h3>
            <p className="text-sm text-gray-400">
              This calculator provides ideal weight ranges using multiple formulas developed over the years. 
              Each formula has its own methodology and may produce slightly different results. The ranges shown 
              include a 10% buffer above the calculated ideal weight to account for individual variations.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Note: These calculations are estimates and should be used as general guidelines. Factors such as 
              muscle mass, body composition, and overall health should be considered when determining your 
              ideal weight. Always consult with a healthcare provider for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 