'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toLiters: (value: number) => number;
  fromLiters: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Liters',
    symbol: 'L',
    toLiters: (value) => value,
    fromLiters: (value) => value,
  },
  {
    name: 'Milliliters',
    symbol: 'mL',
    toLiters: (value) => value / 1000,
    fromLiters: (value) => value * 1000,
  },
  {
    name: 'Cubic Meters',
    symbol: 'm³',
    toLiters: (value) => value * 1000,
    fromLiters: (value) => value / 1000,
  },
  {
    name: 'Gallons (US)',
    symbol: 'gal',
    toLiters: (value) => value * 3.78541,
    fromLiters: (value) => value / 3.78541,
  },
  {
    name: 'Gallons (UK)',
    symbol: 'gal (UK)',
    toLiters: (value) => value * 4.54609,
    fromLiters: (value) => value / 4.54609,
  },
  {
    name: 'Quarts (US)',
    symbol: 'qt',
    toLiters: (value) => value * 0.946353,
    fromLiters: (value) => value / 0.946353,
  },
  {
    name: 'Pints (US)',
    symbol: 'pt',
    toLiters: (value) => value * 0.473176,
    fromLiters: (value) => value / 0.473176,
  },
  {
    name: 'Fluid Ounces (US)',
    symbol: 'fl oz',
    toLiters: (value) => value * 0.0295735,
    fromLiters: (value) => value / 0.0295735,
  },
  {
    name: 'Cups',
    symbol: 'cup',
    toLiters: (value) => value * 0.236588,
    fromLiters: (value) => value / 0.236588,
  },
  {
    name: 'Tablespoons',
    symbol: 'tbsp',
    toLiters: (value) => value * 0.0147868,
    fromLiters: (value) => value / 0.0147868,
  },
  {
    name: 'Teaspoons',
    symbol: 'tsp',
    toLiters: (value) => value * 0.00492892,
    fromLiters: (value) => value / 0.00492892,
  },
];

export default function VolumeConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('L');
  const [toUnit, setToUnit] = useState<string>('gal');
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

    // Convert to liters first, then to target unit
    const liters = fromUnitObj.toLiters(numericValue);
    const converted = toUnitObj.fromLiters(liters);

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
          <h2 className="text-2xl font-semibold">Volume Converter</h2>
          <p className="text-gray-400">Convert between different volume units</p>
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
            <h3 className="text-sm font-medium text-gray-300 mb-2">Common Volume Conversions</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 1 L = 1000 mL</li>
              <li>• 1 m³ = 1000 L</li>
              <li>• 1 US gal = 3.78541 L</li>
              <li>• 1 UK gal = 4.54609 L</li>
              <li>• 1 US qt = 0.946353 L</li>
              <li>• 1 US pt = 0.473176 L</li>
              <li>• 1 US fl oz = 0.0295735 L</li>
              <li>• 1 cup = 0.236588 L</li>
              <li>• 1 tbsp = 0.0147868 L</li>
              <li>• 1 tsp = 0.00492892 L</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 