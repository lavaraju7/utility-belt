'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface BSAFormula {
  name: string;
  value: number;
  description: string;
}

export default function BodySurfaceAreaCalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bsaResults, setBsaResults] = useState<BSAFormula[] | null>(null);

  const calculateBSA = () => {
    if (!weight || !height) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) return;

    const results: BSAFormula[] = [
      // Mosteller Formula (1987) - Most accurate
      {
        name: 'Mosteller Formula',
        value: Math.sqrt((weightNum * heightNum) / 3600),
        description: 'Most accurate and widely used formula',
      },
      // Du Bois Formula (1916)
      {
        name: 'Du Bois Formula',
        value: 0.007184 * Math.pow(weightNum, 0.425) * Math.pow(heightNum, 0.725),
        description: 'One of the earliest formulas developed',
      },
      // Haycock Formula (1978)
      {
        name: 'Haycock Formula',
        value: 0.024265 * Math.pow(weightNum, 0.5378) * Math.pow(heightNum, 0.3964),
        description: 'Good for both adults and children',
      },
      // Gehan & George Formula (1970)
      {
        name: 'Gehan & George Formula',
        value: 0.0235 * Math.pow(weightNum, 0.51456) * Math.pow(heightNum, 0.42246),
        description: 'Based on a large sample size',
      },
      // Fujimoto Formula (1968)
      {
        name: 'Fujimoto Formula',
        value: 0.008883 * Math.pow(weightNum, 0.444) * Math.pow(heightNum, 0.663),
        description: 'Developed for Japanese population',
      },
    ];

    setBsaResults(results);
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
          <h2 className="text-2xl font-semibold">Body Surface Area Calculator</h2>
          <p className="text-gray-400">Calculate your body surface area using multiple formulas</p>
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
            onClick={calculateBSA}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate BSA
          </motion.button>

          {bsaResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <UserIcon className="h-8 w-8 text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-300">
                    Body Surface Area
                  </h3>
                </div>
                <div className="space-y-3">
                  {bsaResults.map((result, index) => (
                    <div key={index} className="bg-gray-800/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-gray-300 mb-1">
                        {result.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {result.value.toFixed(2)} m²
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {result.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About Body Surface Area</h3>
            <p className="text-sm text-gray-400">
              Body Surface Area (BSA) is the total surface area of the human body. It's used in various 
              medical calculations, including drug dosages, fluid requirements, and metabolic rate estimation.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Note: Different formulas may produce slightly different results. The Mosteller formula is 
              generally considered the most accurate for most populations. Always consult with healthcare 
              professionals for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 