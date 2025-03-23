'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardIcon, CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`fixed bottom-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white`}
    >
      <ExclamationTriangleIcon className="h-5 w-5" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:text-gray-200 focus:outline-none"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export default function JsonFormatter() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const formatJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setOutput(JSON.stringify(parsed, null, 2));
      showToast('JSON formatted successfully!', 'success');
    } catch (err) {
      setOutput('');
      showToast('Unable to format JSON. Please check your input for syntax errors.', 'error');
    }
  };

  const minifyJson = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setOutput(JSON.stringify(parsed));
      showToast('JSON minified successfully!', 'success');
    } catch (err) {
      setOutput('');
      showToast('Unable to minify JSON. Please check your input for syntax errors.', 'error');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">JSON Formatter</h2>
          <p className="text-gray-400">Format, validate, and minify JSON data</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Input JSON
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => formatJson(input)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Format
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => minifyJson(input)}
                    className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Minify
                  </motion.button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-96 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Output
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
                placeholder="Formatted JSON will appear here..."
                className="w-full h-96 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Paste your JSON into the input field</li>
              <li>• Click "Format" to beautify the JSON with proper indentation</li>
              <li>• Click "Minify" to remove all whitespace</li>
              <li>• Use the copy button to copy the formatted output</li>
              <li>• Invalid JSON will show an error message</li>
            </ul>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </ClientPageTransition>
  );
} 