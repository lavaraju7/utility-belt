'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

export default function Base64Tool() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encode = (text: string) => {
    try {
      const encoded = btoa(text);
      setOutput(encoded);
      setError(null);
    } catch (err) {
      setError('Unable to encode text. Please check your input.');
      setOutput('');
    }
  };

  const decode = (base64: string) => {
    try {
      const decoded = atob(base64);
      setOutput(decoded);
      setError(null);
    } catch (err) {
      setError('Invalid Base64 string. Please check your input.');
      setOutput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    if (mode === 'encode') {
      encode(value);
    } else {
      decode(value);
    }
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    setInput('');
    setOutput('');
    setError(null);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Base64 Converter</h2>
          <p className="text-gray-400">Encode and decode Base64 strings</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeChange('encode')}
              className={`px-4 py-2 rounded-lg ${
                mode === 'encode'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Encode
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleModeChange('decode')}
              className={`px-4 py-2 rounded-lg ${
                mode === 'decode'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Decode
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {mode === 'encode' ? 'Input Text' : 'Base64 String'}
              </label>
              <textarea
                value={input}
                onChange={handleInputChange}
                placeholder={
                  mode === 'encode'
                    ? 'Enter text to encode to Base64...'
                    : 'Enter Base64 string to decode...'
                }
                className="w-full h-96 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
                </label>
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
              <textarea
                value={output}
                readOnly
                placeholder={
                  mode === 'encode'
                    ? 'Base64 encoded text will appear here...'
                    : 'Decoded text will appear here...'
                }
                className="w-full h-96 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {error && (
                <div className="flex items-center space-x-1 text-red-500 text-sm mt-2">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">About Base64</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Base64 is a binary-to-text encoding scheme</li>
              <li>• Commonly used for encoding binary data in email attachments</li>
              <li>• Uses 64 characters: A-Z, a-z, 0-9, +, and /</li>
              <li>• Padding with = is used to ensure the string length is a multiple of 4</li>
              <li>• Not suitable for sensitive data as it's easily reversible</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 