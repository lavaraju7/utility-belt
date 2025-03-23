'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  DocumentTextIcon,
  PhotoIcon,
  ArrowPathIcon,
  CalculatorIcon,
  CodeBracketIcon,
  TableCellsIcon,
  ChevronRightIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

const categories = [
  {
    name: 'Document Tools',
    icon: DocumentTextIcon,
    tools: [
      {
        name: 'File Compressor',
        description: 'Compress files to reduce size while maintaining quality',
        href: '/tools/file-compressor',
      },
      {
        name: 'Text Extractor',
        description: 'Extract text from various file formats including PDF, Word, and images',
        href: '/tools/text-extractor',
      },
    ],
  },
  {
    name: 'Image Tools',
    icon: PhotoIcon,
    tools: [
      {
        name: 'Image Resizer',
        description: 'Resize images and adjust file size',
        href: '/tools/image-resizer',
      },
      {
        name: 'Image Converter',
        description: 'Convert between different image formats',
        href: '/tools/image-converter',
      },
    ],
  },
  {
    name: 'Data Format Tools',
    icon: TableCellsIcon,
    tools: [
      {
        name: 'JSON to Excel',
        description: 'Convert JSON data to Excel format',
        href: '/tools/json-to-excel',
      },
      {
        name: 'Excel to JSON',
        description: 'Convert Excel files to JSON format',
        href: '/tools/excel-to-json',
      },
      {
        name: 'CSV to JSON',
        description: 'Convert CSV files to JSON format',
        href: '/tools/csv-to-json',
      },
      {
        name: 'JSON to CSV',
        description: 'Convert JSON data to CSV format',
        href: '/tools/json-to-csv',
      },
    ],
  },
  {
    name: 'Code Tools',
    icon: CodeBracketIcon,
    tools: [
      {
        name: 'JSON Formatter',
        description: 'Format and validate JSON data',
        href: '/tools/json-formatter',
      },
      {
        name: 'XML to JSON',
        description: 'Convert XML data to JSON format',
        href: '/tools/xml-to-json',
      },
      {
        name: 'JSON to XML',
        description: 'Convert JSON data to XML format',
        href: '/tools/json-to-xml',
      },
      {
        name: 'YAML to JSON',
        description: 'Convert YAML data to JSON format',
        href: '/tools/yaml-to-json',
      },
    ],
  },
  {
    name: 'Conversion Tools',
    icon: ArrowPathIcon,
    tools: [
      {
        name: 'Length Converter',
        description: 'Convert between different units of length',
        href: '/tools/length-converter',
      },
      {
        name: 'Weight Converter',
        description: 'Convert between different units of weight',
        href: '/tools/weight-converter',
      },
      {
        name: 'Time Converter',
        description: 'Convert between different time zones',
        href: '/tools/time-converter',
      },
      {
        name: 'Temperature Converter',
        description: 'Convert between different temperature units',
        href: '/tools/temperature-converter',
      },
      {
        name: 'Speed Converter',
        description: 'Convert between different speed units',
        href: '/tools/speed-converter',
      },
      {
        name: 'Area Converter',
        description: 'Convert between different area units',
        href: '/tools/area-converter',
      },
      {
        name: 'Volume Converter',
        description: 'Convert between different volume units',
        href: '/tools/volume-converter',
      },
      {
        name: 'Color Converter',
        description: 'Convert between color formats',
        href: '/tools/color-converter',
      },
    ],
  },
  {
    name: 'Health & Fitness',
    icon: UserIcon,
    tools: [
      {
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index',
        href: '/tools/bmi-calculator',
      },
      {
        name: 'Body Fat Calculator',
        description: 'Calculate your body fat percentage using the U.S. Navy method',
        href: '/tools/body-fat-calculator',
      },
      {
        name: 'Body Surface Area Calculator',
        description: 'Calculate your body surface area using multiple formulas',
        href: '/tools/body-surface-area-calculator',
      },
      {
        name: 'TDEE Calculator',
        description: 'Calculate your Total Daily Energy Expenditure',
        href: '/tools/tdee-calculator',
      },
      {
        name: 'Calorie Calculator',
        description: 'Calculate your daily calorie needs',
        href: '/tools/calorie-calculator',
      },
      {
        name: 'Ideal Weight Calculator',
        description: 'Calculate your ideal weight using multiple formulas',
        href: '/tools/ideal-weight-calculator',
      },
    ],
  },
  {
    name: 'Utility Tools',
    icon: CalculatorIcon,
    tools: [
      {
        name: 'Password Generator',
        description: 'Generate secure passwords with customizable options',
        href: '/tools/password-generator',
      },
      {
        name: 'Unit Calculator',
        description: 'Calculate and convert various units',
        href: '/tools/unit-calculator',
      },
      {
        name: 'File Format Checker',
        description: 'Check and validate file formats',
        href: '/tools/format-checker',
      },
      {
        name: 'Base64 Converter',
        description: 'Encode and decode Base64',
        href: '/tools/base64',
      },
    ],
  },
];

export default function Documentation() {
  return (
    <ClientPageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn how to use all the tools in Utility Belt. Each tool is designed to be simple and efficient.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center space-x-3 mb-4">
                <category.icon className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-200">{category.name}</h2>
              </div>
              <div className="space-y-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors duration-200 group"
                  >
                    <div>
                      <h3 className="font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <h2 className="text-2xl font-semibold text-gray-200 mb-4">General Usage Tips</h2>
          <div className="space-y-4 text-gray-300">
            <p>• All tools process data locally in your browser for maximum security</p>
            <p>• Most tools support drag-and-drop file uploads</p>
            <p>• Use the search bar to quickly find specific tools</p>
            <p>• Each tool includes helpful tips and examples</p>
            <p>• For large files, consider using the compression tools first</p>
          </div>
        </motion.div>
      </div>
    </ClientPageTransition>
  );
} 