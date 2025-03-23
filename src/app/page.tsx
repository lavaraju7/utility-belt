'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DocumentTextIcon,
  DocumentIcon,
  PhotoIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  ArrowsRightLeftIcon,
  CalculatorIcon,
  ClockIcon,
  ScaleIcon,
  GlobeAltIcon,
  ChartBarIcon,
  KeyIcon,
  DocumentCheckIcon,
  CodeBracketIcon,
  SwatchIcon,
  TableCellsIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  DocumentMagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  UserIcon,
  FireIcon,
  QrCodeIcon,
} from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

const tools = [
  // Document Tools
  {
    name: 'DOCX to PDF',
    description: 'Convert Word documents to PDF format',
    icon: DocumentTextIcon,
    href: '/tools/docx-to-pdf',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'File Compressor',
    description: 'Compress files to reduce size',
    icon: ArrowDownTrayIcon,
    href: '/tools/file-compressor',
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Text Extractor',
    description: 'Extract text from various file formats',
    icon: DocumentMagnifyingGlassIcon,
    href: '/tools/text-extractor',
    gradient: 'from-purple-500 to-purple-600',
  },
  // Image Tools
  {
    name: 'Image Resizer',
    description: 'Resize images and adjust file size',
    icon: PhotoIcon,
    href: '/tools/image-resizer',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Image Converter',
    description: 'Convert between different image formats',
    icon: ArrowPathIcon,
    href: '/tools/image-converter',
    gradient: 'from-green-500 to-green-600',
  },
  // Conversion Tools
  {
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options',
    icon: KeyIcon,
    href: '/tools/password-generator',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    icon: CodeBracketIcon,
    href: '/tools/json-formatter',
    gradient: 'from-indigo-500 to-purple-500',
  },
  // Additional tools (hidden initially)
  {
    name: 'Length Converter',
    description: 'Convert between different units of length',
    icon: ArrowsRightLeftIcon,
    href: '/tools/length-converter',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    name: 'Weight Converter',
    description: 'Convert between different units of weight',
    icon: ScaleIcon,
    href: '/tools/weight-converter',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Time Converter',
    description: 'Convert between different time zones',
    icon: ClockIcon,
    href: '/tools/time-converter',
    gradient: 'from-violet-500 to-violet-600',
  },
  {
    name: 'Temperature Converter',
    description: 'Convert between different temperature units',
    icon: ChartBarIcon,
    href: '/tools/temperature-converter',
    gradient: 'from-rose-500 to-rose-600',
  },
  {
    name: 'Speed Converter',
    description: 'Convert between different speed units',
    icon: BoltIcon,
    href: '/tools/speed-converter',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    name: 'Area Converter',
    description: 'Convert between different area units',
    icon: ArrowsRightLeftIcon,
    href: '/tools/area-converter',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Volume Converter',
    description: 'Convert between different volume units',
    icon: ArrowsRightLeftIcon,
    href: '/tools/volume-converter',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Unit Calculator',
    description: 'Calculate and convert various units',
    icon: CalculatorIcon,
    href: '/tools/unit-calculator',
    gradient: 'from-teal-500 to-teal-600',
  },
  {
    name: 'File Format Checker',
    description: 'Check and validate file formats',
    icon: DocumentCheckIcon,
    href: '/tools/format-checker',
    gradient: 'from-sky-500 to-sky-600',
  },
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    icon: ScaleIcon,
    href: '/tools/bmi-calculator',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    name: 'Body Fat Calculator',
    description: 'Calculate your body fat percentage',
    icon: UserIcon,
    href: '/tools/body-fat-calculator',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'Base64 Converter',
    description: 'Encode and decode Base64',
    icon: DocumentDuplicateIcon,
    href: '/tools/base64',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Color Converter',
    description: 'Convert between color formats',
    icon: SwatchIcon,
    href: '/tools/color-converter',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    name: 'JSON to Excel',
    description: 'Convert JSON data to Excel format',
    icon: TableCellsIcon,
    href: '/tools/json-to-excel',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Excel to JSON',
    description: 'Convert Excel files to JSON format',
    icon: TableCellsIcon,
    href: '/tools/excel-to-json',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'CSV to JSON',
    description: 'Convert CSV files to JSON format',
    icon: TableCellsIcon,
    href: '/tools/csv-to-json',
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'JSON to CSV',
    description: 'Convert JSON data to CSV format',
    icon: TableCellsIcon,
    href: '/tools/json-to-csv',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'XML to JSON',
    description: 'Convert XML data to JSON format',
    icon: CodeBracketIcon,
    href: '/tools/xml-to-json',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'JSON to XML',
    description: 'Convert JSON data to XML format',
    icon: CodeBracketIcon,
    href: '/tools/json-to-xml',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    name: 'YAML to JSON',
    description: 'Convert YAML data to JSON format',
    icon: CodeBracketIcon,
    href: '/tools/yaml-to-json',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    name: 'JSON to YAML',
    description: 'Convert JSON data to YAML format',
    icon: CodeBracketIcon,
    href: '/tools/json-to-yaml',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    name: 'Body Surface Area Calculator',
    description: 'Calculate your body surface area using multiple formulas',
    icon: UserIcon,
    href: '/tools/body-surface-area-calculator',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'TDEE Calculator',
    description: 'Calculate your Total Daily Energy Expenditure',
    icon: FireIcon,
    href: '/tools/tdee-calculator',
    gradient: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs',
    icon: FireIcon,
    href: '/tools/calorie-calculator',
    gradient: 'from-red-500 to-red-600',
  },
  {
    name: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight using multiple formulas',
    icon: ScaleIcon,
    href: '/tools/ideal-weight-calculator',
    gradient: 'from-blue-500 to-blue-600',
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTools, setShowAllTools] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedTools = showAllTools ? filteredTools : filteredTools.slice(0, 12);

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: requestEmail,
          description: requestDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRequestSubmitted(true);
        setRequestEmail('');
        setRequestDescription('');
        setTimeout(() => setRequestSubmitted(false), 3000);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center space-x-2">
            <SparklesIcon className="h-8 w-8 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Utility Belt
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one toolkit for file conversions, data transformations, and utility functions. 
            Fast, secure, and easy to use - all in one place.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <BoltIcon className="h-5 w-5 text-blue-400" />
                <span className="text-2xl font-bold text-gray-200">30+</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Tools Available</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-400" />
                <span className="text-2xl font-bold text-gray-200">100%</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Secure Processing</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <UserGroupIcon className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold text-gray-200">15k+</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Active Users</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-center space-x-2">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="text-2xl font-bold text-gray-200">4.9/5</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">User Rating</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>Get Started</span>
            </motion.button>
            <Link href="/docs">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"
              >
                <GlobeAltIcon className="h-5 w-5" />
                <span>Documentation</span>
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"
              >
                <EnvelopeIcon className="h-5 w-5" />
                <span>Contact Support</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-20"></div>
            <div className="relative bg-[#2a1f1f] backdrop-blur-sm rounded-full p-1 border-2 border-[#3a2f2f] shadow-lg">
              <div className="flex items-center space-x-2 bg-[#2a1f1f] rounded-full p-2">
                {/* Left Buckle */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#4a3f3f] to-[#2a1f1f] border-2 border-[#3a2f2f] shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5a4f4f] to-[#3a2f2f] flex items-center justify-center border border-[#4a3f3f]">
                    <MagnifyingGlassIcon className="h-5 w-5 text-[#8a7f7f]" />
                  </div>
                </div>
                
                {/* Belt Strap */}
                <div className="flex-1 h-8 border-l-2 border-[#3a2f2f]"></div>
                
                {/* Search Input */}
                <div className="flex-1 bg-[#2a1f1f] rounded-full px-4 py-1">
                  <input
                    type="text"
                    placeholder="Search utilities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-gray-300 placeholder-[#8a7f7f]"
                  />
                </div>
                
                {/* Belt Strap */}
                <div className="flex-1 h-8 border-l-2 border-[#3a2f2f]"></div>
                
                {/* Right Buckle */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#4a3f3f] to-[#2a1f1f] border-2 border-[#3a2f2f] shadow-inner">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5a4f4f] to-[#3a2f2f] flex items-center justify-center border border-[#4a3f3f]">
                    <MagnifyingGlassIcon className="h-5 w-5 text-[#8a7f7f]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={tool.href} className="block h-full">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 h-full border border-gray-700 hover:border-gray-600 transition-all duration-200 group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tool.gradient} group-hover:scale-110 transition-transform duration-200`}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">{tool.name}</h3>
                      <p className="text-gray-400 text-xs">{tool.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredTools.length > 12 && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAllTools(!showAllTools)}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"
            >
              {showAllTools ? (
                <>
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                  <span>Hide Tools</span>
                </>
              ) : (
                <>
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                  <span>Show All Tools</span>
                </>
              )}
            </motion.button>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-300">Why Choose Utility Belt?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Comprehensive Toolset</h3>
              <p className="text-sm text-gray-400">From file conversions to health calculators, we've got you covered</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-400">All processing is done locally in your browser</p>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">User-Friendly</h3>
              <p className="text-sm text-gray-400">Simple interface with helpful tips and examples</p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRequestForm(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-gray-700 border border-gray-700"
          >
            <EnvelopeIcon className="h-5 w-5" />
            <span>Request a New Utility</span>
          </motion.button>
        </div>

        {showRequestForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 max-w-md w-full border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Request a New Utility</h3>
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Utility Description
                  </label>
                  <textarea
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                    placeholder="Describe the utility you'd like to see..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Submit Request
                  </motion.button>
                </div>
              </form>
              {requestSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg"
                >
                  Request submitted successfully!
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </ClientPageTransition>
  );
} 