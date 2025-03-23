'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '../../../components/FileUpload';
import toast from 'react-hot-toast';

export default function DocxToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      toast.error('Please upload a DOCX file');
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

    try {
      const response = await fetch('/api/convert/docx-to-pdf', {
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
      a.download = file.name.replace('.docx', '.pdf');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Conversion successful!');
    } catch (error) {
      toast.error('Failed to convert file');
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-2">DOCX to PDF Converter</h2>
        <p className="text-gray-300">
          Convert your Word documents to PDF format with ease
        </p>
      </motion.div>

      <div className="space-y-4">
        <FileUpload
          onFileSelect={handleFileSelect}
          accept={{
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
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
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleConvert}
          disabled={!file || converting}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-white
            ${!file || converting
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            } transition-colors duration-200`}
        >
          {converting ? 'Converting...' : 'Convert to PDF'}
        </motion.button>
      </div>
    </div>
  );
} 