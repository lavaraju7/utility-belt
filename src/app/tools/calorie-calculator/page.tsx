'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FireIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface ActivityLevel {
  name: string;
  multiplier: number;
  description: string;
}

const activityLevels: ActivityLevel[] = [
  { name: 'Sedentary', multiplier: 1.2, description: 'Little or no exercise' },
  { name: 'Lightly Active', multiplier: 1.375, description: 'Light exercise 1-3 days/week' },
  { name: 'Moderately Active', multiplier: 1.55, description: 'Moderate exercise 3-5 days/week' },
  { name: 'Very Active', multiplier: 1.725, description: 'Hard exercise 6-7 days/week' },
  { name: 'Extra Active', multiplier: 1.9, description: 'Very hard exercise & physical job' },
];

export default function CalorieCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(activityLevels[0]);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    if (!weight || !height || !age) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseFloat(age);

    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) return;

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityLevel.multiplier;

    // Adjust based on goal
    let finalCalories = tdee;
    if (goal === 'lose') {
      finalCalories = tdee - 500; // 500 calorie deficit for ~0.5kg/week
    } else if (goal === 'gain') {
      finalCalories = tdee + 500; // 500 calorie surplus for ~0.5kg/week
    }

    setCalories(Math.round(finalCalories));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Calorie Calculator</h2>
          <p className="text-gray-400">Calculate your daily calorie needs</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGender('male')}
              className={`px-4 py-2 rounded-lg ${
                gender === 'male'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Male
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGender('female')}
              className={`px-4 py-2 rounded-lg ${
                gender === 'female'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Female
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Weight (kg)
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => handleInputChange(e, setWeight)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Height (cm)
              </label>
              <input
                type="text"
                value={height}
                onChange={(e) => handleInputChange(e, setHeight)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter height"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Age
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => handleInputChange(e, setAge)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Activity Level
            </label>
            <select
              value={activityLevel.name}
              onChange={(e) => {
                const level = activityLevels.find(l => l.name === e.target.value);
                if (level) setActivityLevel(level);
              }}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {activityLevels.map((level) => (
                <option key={level.name} value={level.name}>
                  {level.name} - {level.description}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGoal('lose')}
              className={`px-4 py-2 rounded-lg ${
                goal === 'lose'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Lose Weight
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGoal('maintain')}
              className={`px-4 py-2 rounded-lg ${
                goal === 'maintain'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Maintain Weight
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGoal('gain')}
              className={`px-4 py-2 rounded-lg ${
                goal === 'gain'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700'
              }`}
            >
              Gain Weight
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateCalories}
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate Calories
          </motion.button>

          {calories !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
            >
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <FireIcon className="h-8 w-8 text-orange-400" />
                  <h3 className="text-2xl font-bold text-gray-300">
                    {calories} calories
                  </h3>
                </div>
                <p className="text-sm text-gray-400">
                  {goal === 'lose' ? 'Calorie deficit for weight loss' :
                   goal === 'gain' ? 'Calorie surplus for weight gain' :
                   'Maintenance calories'}
                </p>
              </div>
            </motion.div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About Calorie Calculation</h3>
            <p className="text-sm text-gray-400">
              This calculator uses the Mifflin-St Jeor Equation to estimate your basal metabolic rate (BMR) 
              and then adjusts it based on your activity level and goals. The results are approximate and 
              may need to be adjusted based on your individual needs and progress.
            </p>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 