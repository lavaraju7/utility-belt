'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
}

export default function FileUpload({
  onFileSelect,
  accept,
  maxSize = 10485760, // 10MB default
  multiple = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <p className="text-gray-300 mb-1">
        {isDragActive
          ? 'Drop the file here'
          : 'Drag and drop a file here, or click to select'}
      </p>
      <p className="text-sm text-gray-400">
        Maximum file size: {maxSize / 1024 / 1024}MB
      </p>
    </motion.div>
  );
} 