'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Meters per Second',
    symbol: 'm/s',
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
  },
  {
    name: 'Kilometers per Hour',
    symbol: 'km/h',
    toBase: (value: number) => value / 3.6,
    fromBase: (value: number) => value * 3.6,
  },
  {
    name: 'Miles per Hour',
    symbol: 'mph',
    toBase: (value: number) => value * 0.44704,
    fromBase: (value: number) => value / 0.44704,
  },
  {
    name: 'Knots',
    symbol: 'kn',
    toBase: (value: number) => value * 0.514444,
    fromBase: (value: number) => value / 0.514444,
  },
  {
    name: 'Mach Number',
    symbol: 'M',
    toBase: (value: number) => value * 340.3, // At sea level, standard conditions
    fromBase: (value: number) => value / 340.3,
  },
  {
    name: 'Feet per Second',
    symbol: 'ft/s',
    toBase: (value: number) => value * 0.3048,
    fromBase: (value: number) => value / 0.3048,
  },
  {
    name: 'Kilometers per Second',
    symbol: 'km/s',
    toBase: (value: number) => value * 1000,
    fromBase: (value: number) => value / 1000,
  },
  {
    name: 'Miles per Second',
    symbol: 'mi/s',
    toBase: (value: number) => value * 1609.34,
    fromBase: (value: number) => value / 1609.34,
  },
];

const SpeedConverter: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<Unit>(units[0]);
  const [toUnit, setToUnit] = useState<Unit>(units[1]);
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    if (value === '') {
      setResult(null);
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setResult(null);
      return;
    }

    // Convert to base unit (m/s) first
    const baseValue = fromUnit.toBase(numericValue);
    // Then convert from base unit to target unit
    const convertedValue = toUnit.fromBase(baseValue);
    setResult(convertedValue);
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
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
          <h1 className="text-3xl font-bold mb-2">Speed Converter</h1>
          <p className="text-gray-400">Convert between different speed units</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">From</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
              <select
                value={fromUnit.symbol}
                onChange={(e) => {
                  const unit = units.find((u) => u.symbol === e.target.value);
                  if (unit) setFromUnit(unit);
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">To</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={result !== null ? result.toFixed(6) : ''}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={toUnit.symbol}
                onChange={(e) => {
                  const unit = units.find((u) => u.symbol === e.target.value);
                  if (unit) setToUnit(unit);
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {units.map((unit) => (
                  <option key={unit.symbol} value={unit.symbol}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={swapUnits}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"
          >
            <ArrowsRightLeftIcon className="h-5 w-5" />
            <span>Swap Units</span>
          </motion.button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">About Speed Conversion</h2>
          <p className="text-sm text-gray-400">
            Speed conversion is essential in various fields, from physics to everyday life. 
            The base unit for speed in the International System of Units (SI) is meters per second (m/s). 
            Common conversions include:
          </p>
          <ul className="mt-2 text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>1 km/h = 0.277778 m/s</li>
            <li>1 mph = 0.44704 m/s</li>
            <li>1 knot = 0.514444 m/s</li>
            <li>1 Mach (at sea level) = 340.3 m/s</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SpeedConverter; 