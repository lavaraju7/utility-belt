'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { DocumentTextIcon, ArrowDownTrayIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import yaml from 'js-yaml';

const YamlToJson = () => {
  const [yamlInput, setYamlInput] = useState<string>('');
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convertYamlToJson = () => {
    try {
      const jsonData = yaml.load(yamlInput);
      setJsonOutput(JSON.stringify(jsonData, null, 2));
      setError(null);
    } catch (err) {
      setError('Invalid YAML format');
      setJsonOutput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setYamlInput(e.target?.result as string);
        setJsonOutput('');
      };
      reader.readAsText(file);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadJson = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">YAML to JSON Converter</h2>
          <p className="text-gray-400">Convert YAML data to JSON format</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  YAML Input
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={convertYamlToJson}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Convert
                  </motion.button>
                </div>
              </div>
              <div className="space-y-2">
                <textarea
                  value={yamlInput}
                  onChange={(e) => setYamlInput(e.target.value)}
                  placeholder="Paste your YAML data here..."
                  className="w-full h-48 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex items-center justify-center">
                  <label className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Upload YAML File</span>
                    <input
                      type="file"
                      accept=".yml,.yaml"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  JSON Output
                </label>
                <div className="flex space-x-2">
                  {jsonOutput && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadJson}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span>Download JSON</span>
                      </motion.button>
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
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={jsonOutput}
                  readOnly
                  placeholder="Converted JSON will appear here..."
                  className="w-full h-48 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                {error && (
                  <div className="absolute top-2 right-2 text-red-500 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Paste your YAML data or upload a YAML file</li>
              <li>• Click Convert to generate the JSON output</li>
              <li>• Download the converted JSON file</li>
              <li>• Use the copy button to copy the JSON output</li>
              <li>• Make sure your YAML is properly formatted</li>
            </ul>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
};

export default YamlToJson; 