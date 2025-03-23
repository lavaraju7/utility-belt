'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const units: Unit[] = [
  {
    name: 'Meters',
    symbol: 'm',
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  {
    name: 'Kilometers',
    symbol: 'km',
    toBase: (value) => value * 1000,
    fromBase: (value) => value / 1000,
  },
  {
    name: 'Centimeters',
    symbol: 'cm',
    toBase: (value) => value / 100,
    fromBase: (value) => value * 100,
  },
  {
    name: 'Millimeters',
    symbol: 'mm',
    toBase: (value) => value / 1000,
    fromBase: (value) => value * 1000,
  },
  {
    name: 'Kilograms',
    symbol: 'kg',
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  {
    name: 'Grams',
    symbol: 'g',
    toBase: (value) => value / 1000,
    fromBase: (value) => value * 1000,
  },
  {
    name: 'Milligrams',
    symbol: 'mg',
    toBase: (value) => value / 1000000,
    fromBase: (value) => value * 1000000,
  },
  {
    name: 'Liters',
    symbol: 'L',
    toBase: (value) => value,
    fromBase: (value) => value,
  },
  {
    name: 'Milliliters',
    symbol: 'mL',
    toBase: (value) => value / 1000,
    fromBase: (value) => value * 1000,
  },
  {
    name: 'Cubic Meters',
    symbol: 'm³',
    toBase: (value) => value * 1000,
    fromBase: (value) => value / 1000,
  },
];

type Operation = '+' | '-' | '*' | '/';

export default function UnitCalculator() {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [unit1, setUnit1] = useState<string>('m');
  const [unit2, setUnit2] = useState<string>('m');
  const [operation, setOperation] = useState<Operation>('+');
  const [result, setResult] = useState<string>('');
  const [resultUnit, setResultUnit] = useState<string>('m');

  const calculate = () => {
    if (!value1 || !value2) {
      setResult('');
      return;
    }

    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Invalid input');
      return;
    }

    const unit1Obj = units.find((u) => u.symbol === unit1);
    const unit2Obj = units.find((u) => u.symbol === unit2);
    const resultUnitObj = units.find((u) => u.symbol === resultUnit);

    if (!unit1Obj || !unit2Obj || !resultUnitObj) {
      setResult('Invalid units');
      return;
    }

    // Convert both values to base units
    const base1 = unit1Obj.toBase(num1);
    const base2 = unit2Obj.toBase(num2);

    // Perform calculation
    let baseResult: number;
    switch (operation) {
      case '+':
        baseResult = base1 + base2;
        break;
      case '-':
        baseResult = base1 - base2;
        break;
      case '*':
        baseResult = base1 * base2;
        break;
      case '/':
        if (base2 === 0) {
          setResult('Division by zero');
          return;
        }
        baseResult = base1 / base2;
        break;
      default:
        setResult('Invalid operation');
        return;
    }

    // Convert result to desired unit
    const finalResult = resultUnitObj.fromBase(baseResult);
    setResult(finalResult.toFixed(2));
  };

  const swapUnits = () => {
    setUnit1(unit2);
    setUnit2(unit1);
  };

  React.useEffect(() => {
    calculate();
  }, [value1, value2, unit1, unit2, operation, resultUnit]);

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Unit Calculator</h2>
          <p className="text-gray-400">Perform calculations with different units</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                First Value
              </label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
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
                Second Value
              </label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                First Unit
              </label>
              <select
                value={unit1}
                onChange={(e) => setUnit1(e.target.value)}
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
                Second Unit
              </label>
              <select
                value={unit2}
                onChange={(e) => setUnit2(e.target.value)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value as Operation)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="+">Addition (+)</option>
                <option value="-">Subtraction (-)</option>
                <option value="*">Multiplication (×)</option>
                <option value="/">Division (÷)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Result Unit
              </label>
              <select
                value={resultUnit}
                onChange={(e) => setResultUnit(e.target.value)}
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Result
            </label>
            <input
              type="text"
              value={result}
              readOnly
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Result"
            />
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Supported Units</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Length: m, km, cm, mm</li>
              <li>• Mass: kg, g, mg</li>
              <li>• Volume: L, mL, m³</li>
              <li>• All calculations are performed in base units</li>
              <li>• Results are converted to the selected unit</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 