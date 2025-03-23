'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
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
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0].message;
        setError(error);
        return;
      }

      setError(null);
      if (acceptedFiles.length > 0) {
        onFileSelect(multiple ? acceptedFiles : [acceptedFiles[0]]);
      }
    },
    [onFileSelect, multiple]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  const rootProps = getRootProps();

  return (
    <motion.div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={rootProps.onClick}
      onKeyDown={rootProps.onKeyDown}
      role={rootProps.role}
      tabIndex={rootProps.tabIndex}
    >
      <input {...getInputProps()} />
      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <p className="text-gray-300 mb-1">
        {isDragActive
          ? 'Drop the file(s) here'
          : `Drag and drop ${multiple ? 'files' : 'a file'} here, or click to select`}
      </p>
      <p className="text-sm text-gray-400">
        Maximum file size: {maxSize / 1024 / 1024}MB
      </p>
      {error && (
        <p className="text-sm text-red-500 mt-2">
          {error}
        </p>
      )}
    </motion.div>
  );
} 