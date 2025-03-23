'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toCelsius: (value: number) => number;
  fromCelsius: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Celsius',
    symbol: '°C',
    toCelsius: (value) => value,
    fromCelsius: (value) => value,
  },
  {
    name: 'Fahrenheit',
    symbol: '°F',
    toCelsius: (value) => (value - 32) * (5 / 9),
    fromCelsius: (value) => (value * 9 / 5) + 32,
  },
  {
    name: 'Kelvin',
    symbol: 'K',
    toCelsius: (value) => value - 273.15,
    fromCelsius: (value) => value + 273.15,
  },
  {
    name: 'Rankine',
    symbol: '°R',
    toCelsius: (value) => (value - 491.67) * (5 / 9),
    fromCelsius: (value) => (value * 9 / 5) + 491.67,
  },
];

export default function TemperatureConverter() {
  const [fromValue, setFromValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('°C');
  const [toUnit, setToUnit] = useState<string>('°F');
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

    // Convert to Celsius first, then to target unit
    const celsius = fromUnitObj.toCelsius(numericValue);
    const converted = toUnitObj.fromCelsius(celsius);

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
          <h2 className="text-2xl font-semibold">Temperature Converter</h2>
          <p className="text-gray-400">Convert between different temperature units</p>
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
            <h3 className="text-sm font-medium text-gray-300 mb-2">Common Temperature Points</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Water boils at 100°C (212°F)</li>
              <li>• Room temperature is about 20°C (68°F)</li>
              <li>• Water freezes at 0°C (32°F)</li>
              <li>• Absolute zero is 0K (-273.15°C)</li>
              <li>• Body temperature is 37°C (98.6°F)</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 