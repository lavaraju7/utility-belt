'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { KeyIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy password:', err);
    }
  };

  React.useEffect(() => {
    generatePassword();
  }, [options]);

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Password Generator</h2>
          <p className="text-gray-400">Generate secure passwords with customizable options</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <ClipboardIcon className="h-5 w-5 text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">
                  Password Length: {options.length}
                </label>
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                  className="w-48"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                  className="rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Uppercase Letters</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                  className="rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Lowercase Letters</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                  className="rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Numbers</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.symbols}
                  onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                  className="rounded border-gray-700 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Symbols</span>
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePassword}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Generate New Password
          </motion.button>
        </div>
      </div>
    </ClientPageTransition>
  );
} 