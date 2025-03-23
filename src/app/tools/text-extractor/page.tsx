'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const TextExtractor: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setExtractedText('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract text');
      }

      const data = await response.json();
      setExtractedText(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract text');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
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
          <h1 className="text-3xl font-bold mb-2">Text Extractor</h1>
          <p className="text-gray-400">Extract text from various file formats</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-md">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload File
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800 text-gray-300 rounded-lg shadow-lg tracking-wide border border-gray-700 cursor-pointer hover:bg-gray-700">
                  <DocumentTextIcon className="w-8 h-8" />
                  <span className="mt-2 text-base">Select a file</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                  />
                </label>
              </div>
            </div>

            {isLoading && (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-gray-400">Extracting text...</span>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            {extractedText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Extracted Text</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadText}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5" />
                    <span>Download</span>
                  </motion.button>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{extractedText}</pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Supported Formats</h2>
          <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
            <li>PDF Documents (.pdf)</li>
            <li>Word Documents (.doc, .docx)</li>
            <li>Text Files (.txt)</li>
            <li>Rich Text Format (.rtf)</li>
          </ul>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">About Text Extraction</h2>
          <p className="text-sm text-gray-400">
            Text extraction is the process of converting document content into plain text.
            This tool supports various file formats and preserves the text content while
            removing formatting. The extracted text can be downloaded as a plain text file.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TextExtractor; 