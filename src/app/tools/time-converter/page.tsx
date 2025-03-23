'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toSeconds: (value: number) => number;
  fromSeconds: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Seconds',
    symbol: 's',
    toSeconds: (value) => value,
    fromSeconds: (value) => value,
  },
  {
    name: 'Minutes',
    symbol: 'min',
    toSeconds: (value) => value * 60,
    fromSeconds: (value) => value / 60,
  },
  {
    name: 'Hours',
    symbol: 'h',
    toSeconds: (value) => value * 3600,
    fromSeconds: (value) => value / 3600,
  },
  {
    name: 'Days',
    symbol: 'd',
    toSeconds: (value) => value * 86400,
    fromSeconds: (value) => value / 86400,
  },
  {
    name: 'Weeks',
    symbol: 'wk',
    toSeconds: (value) => value * 604800,
    fromSeconds: (value) => value / 604800,
  },
  {
    name: 'Months',
    symbol: 'mo',
    toSeconds: (value) => value * 2629746, // Average month length
    fromSeconds: (value) => value / 2629746,
  },
  {
    name: 'Years',
    symbol: 'yr',
    toSeconds: (value) => value * 31556952, // Average year length
    fromSeconds: (value) => value / 31556952,
  },
  {
    name: 'Decades',
    symbol: 'dec',
    toSeconds: (value) => value * 315569520,
    fromSeconds: (value) => value / 315569520,
  },
  {
    name: 'Centuries',
    symbol: 'cent',
    toSeconds: (value) => value * 3155695200,
    fromSeconds: (value) => value / 3155695200,
  },
  {
    name: 'Milliseconds',
    symbol: 'ms',
    toSeconds: (value) => value / 1000,
    fromSeconds: (value) => value * 1000,
  },
  {
    name: 'Microseconds',
    symbol: 'μs',
    toSeconds: (value) => value / 1000000,
    fromSeconds: (value) => value * 1000000,
  },
];

export default function TimeConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('h');
  const [toUnit, setToUnit] = useState<string>('min');
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

    // Convert to seconds first, then to target unit
    const seconds = fromUnitObj.toSeconds(numericValue);
    const converted = toUnitObj.fromSeconds(seconds);

    setResult(converted.toFixed(2));
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
          <h2 className="text-2xl font-semibold">Time Converter</h2>
          <p className="text-gray-400">Convert between different time units</p>
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
            <h3 className="text-sm font-medium text-gray-300 mb-2">Common Time Conversions</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 1 minute = 60 seconds</li>
              <li>• 1 hour = 3600 seconds</li>
              <li>• 1 day = 86400 seconds</li>
              <li>• 1 week = 604800 seconds</li>
              <li>• 1 month ≈ 2629746 seconds</li>
              <li>• 1 year ≈ 31556952 seconds</li>
              <li>• 1 decade = 315569520 seconds</li>
              <li>• 1 century = 3155695200 seconds</li>
              <li>• 1 millisecond = 0.001 seconds</li>
              <li>• 1 microsecond = 0.000001 seconds</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 