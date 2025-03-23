'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

const units = {
  length: {
    meters: 1,
    kilometers: 1000,
    centimeters: 0.01,
    millimeters: 0.001,
    miles: 1609.34,
    yards: 0.9144,
    feet: 0.3048,
    inches: 0.0254,
  },
  weight: {
    kilograms: 1,
    grams: 0.001,
    milligrams: 0.000001,
    pounds: 0.453592,
    ounces: 0.0283495,
  },
  time: {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2629746,
    years: 31556952,
  },
  temperature: {
    celsius: 'celsius',
    fahrenheit: 'fahrenheit',
    kelvin: 'kelvin',
  },
};

type UnitType = keyof typeof units;

export default function UnitConverter() {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [fromUnit, setFromUnit] = useState<string>(Object.keys(units.length)[0]);
  const [toUnit, setToUnit] = useState<string>(Object.keys(units.length)[1]);
  const [value, setValue] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult(null);
      return;
    }

    if (unitType === 'temperature') {
      let celsius: number;
      // Convert to Celsius first
      switch (fromUnit) {
        case 'celsius':
          celsius = numValue;
          break;
        case 'fahrenheit':
          celsius = (numValue - 32) * (5 / 9);
          break;
        case 'kelvin':
          celsius = numValue - 273.15;
          break;
        default:
          celsius = numValue;
      }

      // Convert from Celsius to target unit
      switch (toUnit) {
        case 'celsius':
          setResult(celsius);
          break;
        case 'fahrenheit':
          setResult((celsius * 9) / 5 + 32);
          break;
        case 'kelvin':
          setResult(celsius + 273.15);
          break;
        default:
          setResult(celsius);
      }
    } else {
      const fromValue = units[unitType][fromUnit as keyof typeof units[typeof unitType]];
      const toValue = units[unitType][toUnit as keyof typeof units[typeof unitType]];
      setResult(numValue * fromValue / toValue);
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  React.useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit, unitType]);

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Unit Converter</h2>
          <p className="text-gray-400">Convert between different units of measurement</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center space-x-2">
            {Object.keys(units).map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUnitType(type as UnitType)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  unitType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {type}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="any"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                From Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(units[unitType]).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwap}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                <ArrowsRightLeftIcon className="h-6 w-6 text-gray-300" />
              </motion.button>
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
                {Object.keys(units[unitType]).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {result !== null && (
            <div className="text-center space-y-2">
              <div className="text-2xl font-semibold">
                {Number(value).toLocaleString()} {fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} =
              </div>
              <div className="text-3xl font-bold text-blue-500">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientPageTransition>
  );
} 