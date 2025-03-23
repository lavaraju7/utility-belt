'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FireIcon } from '@heroicons/react/24/outline';

interface ActivityLevel {
  name: string;
  multiplier: number;
  description: string;
}

const activityLevels: ActivityLevel[] = [
  {
    name: 'Sedentary',
    multiplier: 1.2,
    description: 'Little or no exercise, desk job',
  },
  {
    name: 'Lightly Active',
    multiplier: 1.375,
    description: 'Light exercise 1-3 days/week',
  },
  {
    name: 'Moderately Active',
    multiplier: 1.55,
    description: 'Moderate exercise 3-5 days/week',
  },
  {
    name: 'Very Active',
    multiplier: 1.725,
    description: 'Hard exercise 6-7 days/week',
  },
  {
    name: 'Extra Active',
    multiplier: 1.9,
    description: 'Very hard exercise & physical job or training twice/day',
  },
];

const TDEECalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(activityLevels[0]);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      setCalories(null);
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
    }

    // Calculate TDEE
    let tdee = bmr * activityLevel.multiplier;

    // Adjust based on goal
    switch (goal) {
      case 'lose':
        tdee -= 500; // 500 calorie deficit for ~0.5kg/week weight loss
        break;
      case 'gain':
        tdee += 500; // 500 calorie surplus for ~0.5kg/week weight gain
        break;
      default:
        // maintain - no adjustment needed
        break;
    }

    setCalories(Math.round(tdee));
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
          <h1 className="text-3xl font-bold mb-2">TDEE Calculator</h1>
          <p className="text-gray-400">Calculate your Total Daily Energy Expenditure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    gender === 'male'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    gender === 'female'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Activity Level</label>
              <select
                value={activityLevel.name}
                onChange={(e) => {
                  const level = activityLevels.find((l) => l.name === e.target.value);
                  if (level) setActivityLevel(level);
                }}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {activityLevels.map((level) => (
                  <option key={level.name} value={level.name}>
                    {level.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-400">{activityLevel.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Goal</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGoal('lose')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    goal === 'lose'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Lose Weight
                </button>
                <button
                  onClick={() => setGoal('maintain')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    goal === 'maintain'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Maintain
                </button>
                <button
                  onClick={() => setGoal('gain')}
                  className={`flex-1 py-2 px-4 rounded-lg ${
                    goal === 'gain'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Gain Weight
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateCalories}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate TDEE
            </motion.button>

            {calories !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
              >
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Your Daily Calorie Needs</h2>
                  <div className="text-4xl font-bold mb-2">{calories}</div>
                  <div className="text-xl font-semibold mb-2">calories</div>
                  <p className="text-gray-400">
                    {goal === 'lose' && 'To lose weight (500 calorie deficit)'}
                    {goal === 'maintain' && 'To maintain current weight'}
                    {goal === 'gain' && 'To gain weight (500 calorie surplus)'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">About TDEE</h2>
          <p className="text-sm text-gray-400">
            Total Daily Energy Expenditure (TDEE) is the total number of calories you burn each day.
            It's calculated using the Mifflin-St Jeor equation and adjusted based on your activity level.
            The calculator provides estimates for:
          </p>
          <ul className="mt-2 text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>Weight loss: 500 calorie deficit per day (~0.5kg/week)</li>
            <li>Weight maintenance: Your exact TDEE</li>
            <li>Weight gain: 500 calorie surplus per day (~0.5kg/week)</li>
          </ul>
          <p className="mt-2 text-sm text-gray-400">
            Note: These are estimates and individual results may vary. Consult with a healthcare professional
            for personalized advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TDEECalculator; 