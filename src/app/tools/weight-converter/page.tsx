'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toKilograms: (value: number) => number;
  fromKilograms: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Kilograms',
    symbol: 'kg',
    toKilograms: (value) => value,
    fromKilograms: (value) => value,
  },
  {
    name: 'Grams',
    symbol: 'g',
    toKilograms: (value) => value / 1000,
    fromKilograms: (value) => value * 1000,
  },
  {
    name: 'Milligrams',
    symbol: 'mg',
    toKilograms: (value) => value / 1000000,
    fromKilograms: (value) => value * 1000000,
  },
  {
    name: 'Pounds',
    symbol: 'lb',
    toKilograms: (value) => value * 0.453592,
    fromKilograms: (value) => value / 0.453592,
  },
  {
    name: 'Ounces',
    symbol: 'oz',
    toKilograms: (value) => value * 0.0283495,
    fromKilograms: (value) => value / 0.0283495,
  },
  {
    name: 'Metric Tons',
    symbol: 't',
    toKilograms: (value) => value * 1000,
    fromKilograms: (value) => value / 1000,
  },
  {
    name: 'US Tons',
    symbol: 'ton',
    toKilograms: (value) => value * 907.185,
    fromKilograms: (value) => value / 907.185,
  },
  {
    name: 'Stone',
    symbol: 'st',
    toKilograms: (value) => value * 6.35029,
    fromKilograms: (value) => value / 6.35029,
  },
];

export default function WeightConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');
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

    // Convert to kilograms first, then to target unit
    const kilograms = fromUnitObj.toKilograms(numericValue);
    const converted = toUnitObj.fromKilograms(kilograms);

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
          <h2 className="text-2xl font-semibold">Weight Converter</h2>
          <p className="text-gray-400">Convert between different weight units</p>
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
              <li>• 1 kilogram = 1000 grams</li>
              <li>• 1 gram = 1000 milligrams</li>
              <li>• 1 pound = 0.453592 kilograms</li>
              <li>• 1 ounce = 0.0283495 kilograms</li>
              <li>• 1 metric ton = 1000 kilograms</li>
              <li>• 1 US ton = 907.185 kilograms</li>
              <li>• 1 stone = 6.35029 kilograms</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 