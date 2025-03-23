'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface FileFormat {
  name: string;
  extensions: string[];
  mimeTypes: string[];
  description: string;
}

const fileFormats: FileFormat[] = [
  {
    name: 'Images',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'],
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
    ],
    description: 'Common image formats',
  },
  {
    name: 'Documents',
    extensions: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'ppt', 'pptx'],
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf',
      'application/vnd.oasis.opendocument.text',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    description: 'Document and spreadsheet formats',
  },
  {
    name: 'Audio',
    extensions: ['mp3', 'wav', 'ogg', 'm4a', 'flac'],
    mimeTypes: [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/mp4',
      'audio/flac',
    ],
    description: 'Audio file formats',
  },
  {
    name: 'Video',
    extensions: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'],
    mimeTypes: [
      'video/mp4',
      'video/x-msvideo',
      'video/quicktime',
      'video/x-ms-wmv',
      'video/x-flv',
      'video/webm',
    ],
    description: 'Video file formats',
  },
  {
    name: 'Archives',
    extensions: ['zip', 'rar', '7z', 'tar', 'gz'],
    mimeTypes: [
      'application/zip',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip',
    ],
    description: 'Compressed file formats',
  },
];

export default function FileFormatChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{
    format: FileFormat | null;
    isValid: boolean;
    message: string;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const checkFileFormat = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    for (const format of fileFormats) {
      if (
        format.extensions.includes(extension || '') ||
        format.mimeTypes.includes(mimeType)
      ) {
        return {
          format,
          isValid: true,
          message: `Valid ${format.name} file`,
        };
      }
    }

    return {
      format: null,
      isValid: false,
      message: 'Unsupported file format',
    };
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setResult(checkFileFormat(droppedFile));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(checkFileFormat(selectedFile));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">File Format Checker</h2>
        <p className="text-gray-400">Check if your file matches common format specifications</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileInput}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <DocumentIcon className="h-12 w-12 text-gray-400" />
            <div className="text-gray-300">
              <span className="text-blue-500">Click to upload</span> or drag and drop
            </div>
            <div className="text-sm text-gray-400">
              Any file type, max 10MB
            </div>
          </label>
        </div>

        {file && result && (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              {result.isValid ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500" />
              )}
              <div>
                <div className="text-gray-300 font-medium">{file.name}</div>
                <div className="text-sm text-gray-400">
                  {result.message}
                  {result.format && ` (${result.format.description})`}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Supported Formats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fileFormats.map((format) => (
              <div
                key={format.name}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
              >
                <div className="font-medium text-gray-300">{format.name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {format.extensions.join(', ')}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {format.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 