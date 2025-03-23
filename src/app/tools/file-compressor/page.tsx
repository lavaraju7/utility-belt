'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FolderArrowDownIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface CompressionOption {
  name: string;
  value: number;
  description: string;
}

const compressionOptions: CompressionOption[] = [
  {
    name: 'Maximum',
    value: 20,
    description: 'Smallest file size, lower quality',
  },
  {
    name: 'High',
    value: 40,
    description: 'Small file size, good quality',
  },
  {
    name: 'Medium',
    value: 60,
    description: 'Balanced size and quality',
  },
  {
    name: 'Low',
    value: 80,
    description: 'Larger file size, high quality',
  },
];

const FileCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionOption>(compressionOptions[2]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setCompressedFile(null);
    setError(null);
  }, []);

  const handleCompress = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('compressionLevel', compressionLevel.value.toString());

      const response = await fetch('/api/compress-file', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to compress file');
      }

      const blob = await response.blob();
      setCompressedFile(blob);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress file');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCompressedFile = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${file?.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">File Compressor</h1>
          <p className="text-gray-400">Compress files to reduce their size</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload File
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg tracking-wide border border-gray-700 cursor-pointer hover:bg-gray-700">
                  <ArrowUpTrayIcon className="w-8 h-8" />
                  <span className="mt-2 text-base">Select a file</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </label>
              </div>
            </div>

            {file && (
              <div className="w-full max-w-md">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Compression Level
                </label>
                <select
                  value={compressionLevel.name}
                  onChange={(e) => {
                    const option = compressionOptions.find((opt) => opt.name === e.target.value);
                    if (option) setCompressionLevel(option);
                  }}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {compressionOptions.map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-400">{compressionLevel.description}</p>
              </div>
            )}

            {file && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompress}
                disabled={isLoading}
                className="w-full max-w-md py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Compressing...' : 'Compress File'}
              </motion.button>
            )}

            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-gray-400">Compressing file...</span>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {compressedFile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-md space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Compressed File</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCompressedFile}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <FolderArrowDownIcon className="h-5 w-5" />
                    <span>Download</span>
                  </motion.button>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-300">
                    {file && (
                      <>
                        <p>Original Size: {(file.size / 1024).toFixed(2)} KB</p>
                        <p>Compressed Size: {(compressedFile.size / 1024).toFixed(2)} KB</p>
                        <p>Reduction: {((1 - compressedFile.size / file.size) * 100).toFixed(1)}%</p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Supported Formats</h2>
          <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>Images (JPG, PNG, GIF, etc.)</li>
            <li>PDF Documents</li>
            <li>Word Documents (DOC, DOCX)</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">About File Compression</h2>
          <p className="text-sm text-gray-400">
            File compression reduces the size of files while maintaining acceptable quality.
            The compression level determines the balance between file size and quality.
            Higher compression results in smaller files but may affect quality.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FileCompressor; 