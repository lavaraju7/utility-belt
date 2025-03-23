'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toSquareMeters: (value: number) => number;
  fromSquareMeters: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Square Meters',
    symbol: 'm²',
    toSquareMeters: (value) => value,
    fromSquareMeters: (value) => value,
  },
  {
    name: 'Square Kilometers',
    symbol: 'km²',
    toSquareMeters: (value) => value * 1000000,
    fromSquareMeters: (value) => value / 1000000,
  },
  {
    name: 'Square Centimeters',
    symbol: 'cm²',
    toSquareMeters: (value) => value / 10000,
    fromSquareMeters: (value) => value * 10000,
  },
  {
    name: 'Square Millimeters',
    symbol: 'mm²',
    toSquareMeters: (value) => value / 1000000,
    fromSquareMeters: (value) => value * 1000000,
  },
  {
    name: 'Square Miles',
    symbol: 'mi²',
    toSquareMeters: (value) => value * 2589988.11,
    fromSquareMeters: (value) => value / 2589988.11,
  },
  {
    name: 'Square Yards',
    symbol: 'yd²',
    toSquareMeters: (value) => value * 0.836127,
    fromSquareMeters: (value) => value / 0.836127,
  },
  {
    name: 'Square Feet',
    symbol: 'ft²',
    toSquareMeters: (value) => value * 0.092903,
    fromSquareMeters: (value) => value / 0.092903,
  },
  {
    name: 'Square Inches',
    symbol: 'in²',
    toSquareMeters: (value) => value * 0.00064516,
    fromSquareMeters: (value) => value / 0.00064516,
  },
  {
    name: 'Acres',
    symbol: 'ac',
    toSquareMeters: (value) => value * 4046.86,
    fromSquareMeters: (value) => value / 4046.86,
  },
  {
    name: 'Hectares',
    symbol: 'ha',
    toSquareMeters: (value) => value * 10000,
    fromSquareMeters: (value) => value / 10000,
  },
];

export default function AreaConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m²');
  const [toUnit, setToUnit] = useState<string>('km²');
  const [result, setResult] = useState<string>('');

  const convert = () => {
    if (!fromValue) {
      setResult('');
      return;
    }

    const numericValue = parseFloat(fromValue);
    if (isNaN(numericValue)) {
      setResult('Invalid input');
      return;
    }

    const fromUnitObj = units.find((u) => u.symbol === fromUnit);
    const toUnitObj = units.find((u) => u.symbol === toUnit);

    if (!fromUnitObj || !toUnitObj) {
      setResult('Invalid units');
      return;
    }

    // Convert to square meters first, then to target unit
    const squareMeters = fromUnitObj.toSquareMeters(numericValue);
    const converted = toUnitObj.fromSquareMeters(squareMeters);

    setResult(converted.toFixed(6));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  React.useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit]);

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Area Converter</h2>
          <p className="text-gray-400">Convert between different area units</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                From Value
              </label>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapUnits}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                <ArrowsRightLeftIcon className="h-5 w-5 text-gray-300" />
              </motion.button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                To Value
              </label>
              <input
                type="text"
                value={result}
                readOnly
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Result"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                From Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                To Unit
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Common Conversions</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 1 square kilometer = 1,000,000 square meters</li>
              <li>• 1 square meter = 10,000 square centimeters</li>
              <li>• 1 square centimeter = 100 square millimeters</li>
              <li>• 1 square mile = 2,589,988.11 square meters</li>
              <li>• 1 square yard = 0.836127 square meters</li>
              <li>• 1 square foot = 0.092903 square meters</li>
              <li>• 1 square inch = 0.00064516 square meters</li>
              <li>• 1 acre = 4,046.86 square meters</li>
              <li>• 1 hectare = 10,000 square meters</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 