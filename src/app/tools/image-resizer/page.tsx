'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import FileUpload from '../../../components/FileUpload';
import toast from 'react-hot-toast';
import sharp from 'sharp';
import { PhotoIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [targetSize, setTargetSize] = useState<number>(1000); // Target size in KB
  const [resizing, setResizing] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    setFile(selectedFile);
  };

  const handleResize = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setResizing(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetSize', targetSize.toString());

    try {
      const response = await fetch('/api/resize/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Resizing failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resized_${file.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Image resized successfully!');
    } catch (error) {
      toast.error('Failed to resize image');
      console.error(error);
    } finally {
      setResizing(false);
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
          <h1 className="text-3xl font-bold mb-4">Image Resizer</h1>
          <p className="text-gray-300">
            Resize your images to a specific file size
          </p>
        </motion.div>

        <div className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
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
                Current size: {(file.size / 1024).toFixed(2)} KB
              </p>
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block text-gray-300">
              Target size (KB):
              <input
                type="number"
                value={targetSize}
                onChange={(e) => setTargetSize(Number(e.target.value))}
                min="1"
                max="10000"
                className="ml-2 px-3 py-2 bg-gray-700 rounded-lg text-white w-32"
              />
            </label>
            <p className="text-sm text-gray-400">
              Enter the desired file size in kilobytes (1-10000 KB)
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleResize}
            disabled={!file || resizing}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white
              ${!file || resizing
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors duration-200`}
          >
            {resizing ? 'Resizing...' : 'Resize Image'}
          </motion.button>
        </div>
      </div>
    </ClientPageTransition>
  );
} 