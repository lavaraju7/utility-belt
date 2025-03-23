'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentCheckIcon, DocumentIcon, PhotoIcon, DocumentTextIcon, TableCellsIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import ClientPageTransition from '@/components/ClientPageTransition';

interface FileInfo {
  name: string;
  type: string;
  size: number;
  extension: string;
  mimeType: string;
  isValid: boolean;
  icon: any;
}

const supportedFormats = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff'],
  documents: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'md'],
  spreadsheets: ['xls', 'xlsx', 'csv', 'ods'],
  code: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'html', 'css', 'json', 'xml', 'yaml', 'yml'],
};

export default function FormatChecker() {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState<string>('');

  const getFileIcon = (extension: string) => {
    if (supportedFormats.images.includes(extension)) return PhotoIcon;
    if (supportedFormats.documents.includes(extension)) return DocumentTextIcon;
    if (supportedFormats.spreadsheets.includes(extension)) return TableCellsIcon;
    if (supportedFormats.code.includes(extension)) return CodeBracketIcon;
    return DocumentIcon;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const checkFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    const mimeType = file.type;
    
    // Check if file type is supported
    const isSupported = Object.values(supportedFormats).some(formats => 
      formats.includes(extension)
    );

    const fileInfo: FileInfo = {
      name: file.name,
      type: file.type || 'Unknown',
      size: file.size,
      extension,
      mimeType,
      isValid: isSupported,
      icon: getFileIcon(extension),
    };

    setFileInfo(fileInfo);
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      checkFile(selectedFile);
    }
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">File Format Checker</h2>
          <p className="text-gray-400">Validate and check file formats</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Upload File
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <DocumentCheckIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="mb-1 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">Any file type</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {fileInfo && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <fileInfo.icon className={`h-8 w-8 ${fileInfo.isValid ? 'text-green-400' : 'text-red-400'}`} />
                <div>
                  <h3 className="text-lg font-medium text-gray-300">{fileInfo.name}</h3>
                  <p className="text-sm text-gray-400">{formatFileSize(fileInfo.size)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">File Type</p>
                  <p className="text-sm text-gray-300">{fileInfo.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Extension</p>
                  <p className="text-sm text-gray-300">{fileInfo.extension}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">MIME Type</p>
                  <p className="text-sm text-gray-300">{fileInfo.mimeType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Status</p>
                  <p className={`text-sm ${fileInfo.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    {fileInfo.isValid ? 'Supported Format' : 'Unsupported Format'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Supported Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Images</h4>
                <p className="text-xs text-gray-500">{supportedFormats.images.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Documents</h4>
                <p className="text-xs text-gray-500">{supportedFormats.documents.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Spreadsheets</h4>
                <p className="text-xs text-gray-500">{supportedFormats.spreadsheets.join(', ')}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Code</h4>
                <p className="text-xs text-gray-500">{supportedFormats.code.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 