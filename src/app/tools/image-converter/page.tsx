'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import FileUpload from '../../../components/FileUpload';
import toast from 'react-hot-toast';
import { PhotoIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const supportedFormats = [
  { value: 'jpeg', label: 'JPEG' },
  { value: 'png', label: 'PNG' },
  { value: 'webp', label: 'WebP' },
  { value: 'avif', label: 'AVIF' },
  { value: 'tiff', label: 'TIFF' },
];

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('jpeg');
  const [converting, setConverting] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    setFile(selectedFile);
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setConverting(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', targetFormat);

    try {
      const response = await fetch('/api/convert/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.split('.')[0]}.${targetFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Conversion successful!');
    } catch (error) {
      toast.error('Failed to convert image');
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <ClientPageTransition>
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Image Format Converter</h1>
          <p className="text-gray-300">
            Convert your images between different formats
          </p>
        </motion.div>

        <div className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.tiff']
            }}
            maxSize={10485760} // 10MB
          />

          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800 rounded-lg p-4"
            >
              <p className="text-gray-300">
                Selected file: <span className="font-semibold">{file.name}</span>
              </p>
              <p className="text-sm text-gray-400">
                Current format: {file.name.split('.').pop()?.toUpperCase()}
              </p>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block text-gray-300">
              Convert to:
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="ml-2 px-3 py-2 bg-gray-700 rounded-lg text-white"
              >
                {supportedFormats.map((format) => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvert}
            disabled={!file || converting}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white
              ${!file || converting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors duration-200`}
          >
            {converting ? 'Converting...' : 'Convert Image'}
          </motion.button>
        </div>
      </div>
    </ClientPageTransition>
  );
} 