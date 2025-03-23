'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toMeters: (value: number) => number;
  fromMeters: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Meters',
    symbol: 'm',
    toMeters: (value) => value,
    fromMeters: (value) => value,
  },
  {
    name: 'Kilometers',
    symbol: 'km',
    toMeters: (value) => value * 1000,
    fromMeters: (value) => value / 1000,
  },
  {
    name: 'Centimeters',
    symbol: 'cm',
    toMeters: (value) => value / 100,
    fromMeters: (value) => value * 100,
  },
  {
    name: 'Millimeters',
    symbol: 'mm',
    toMeters: (value) => value / 1000,
    fromMeters: (value) => value * 1000,
  },
  {
    name: 'Miles',
    symbol: 'mi',
    toMeters: (value) => value * 1609.34,
    fromMeters: (value) => value / 1609.34,
  },
  {
    name: 'Yards',
    symbol: 'yd',
    toMeters: (value) => value * 0.9144,
    fromMeters: (value) => value / 0.9144,
  },
  {
    name: 'Feet',
    symbol: 'ft',
    toMeters: (value) => value * 0.3048,
    fromMeters: (value) => value / 0.3048,
  },
  {
    name: 'Inches',
    symbol: 'in',
    toMeters: (value) => value * 0.0254,
    fromMeters: (value) => value / 0.0254,
  },
];

export default function LengthConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('km');
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

    // Convert to meters first, then to target unit
    const meters = fromUnitObj.toMeters(numericValue);
    const converted = toUnitObj.fromMeters(meters);

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
          <h2 className="text-2xl font-semibold">Length Converter</h2>
          <p className="text-gray-400">Convert between different length units</p>
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
              <li>• 1 kilometer = 1000 meters</li>
              <li>• 1 meter = 100 centimeters</li>
              <li>• 1 centimeter = 10 millimeters</li>
              <li>• 1 mile = 1609.34 meters</li>
              <li>• 1 yard = 0.9144 meters</li>
              <li>• 1 foot = 0.3048 meters</li>
              <li>• 1 inch = 0.0254 meters</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 