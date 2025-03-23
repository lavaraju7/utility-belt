'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import toast from 'react-hot-toast';

interface RequestData {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers: Record<string, string>;
  body: string;
  params: Record<string, string>;
}

interface ResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  time: number;
}

export default function RequestUtility() {
  const [requestData, setRequestData] = useState<RequestData>({
    url: '',
    method: 'GET',
    headers: {},
    body: '',
    params: {},
  });
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const startTime = performance.now();
      
      // Build URL with query parameters if they exist
      const url = new URL(requestData.url);
      if (Object.keys(requestData.params).length > 0) {
        Object.entries(requestData.params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      // Prepare request options
      const options: RequestInit = {
        method: requestData.method,
        headers: requestData.headers,
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(requestData.method) && requestData.body) {
        options.body = requestData.body;
      }

      // Make the request
      const response = await fetch(url.toString(), options);
      
      // Get response data
      const data = await response.json().catch(() => null);
      
      // Calculate request time
      const endTime = performance.now();
      const time = endTime - startTime;

      // Convert headers to plain object
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers,
        data,
        time,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequestData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHeadersChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const headers = JSON.parse(e.target.value);
      setRequestData(prev => ({
        ...prev,
        headers,
      }));
    } catch (err) {
      // Invalid JSON, ignore
    }
  };

  const handleParamsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const params = JSON.parse(e.target.value);
      setRequestData(prev => ({
        ...prev,
        params,
      }));
    } catch (err) {
      // Invalid JSON, ignore
    }
  };

  return (
    <ClientPageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-4">Request Utility</h1>
          <p className="text-gray-300">
            Test and debug HTTP requests with ease
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">URL</label>
            <input
              type="url"
              name="url"
              value={requestData.url}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Method</label>
            <select
              name="method"
              value={requestData.method}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Headers (JSON)</label>
            <textarea
              value={JSON.stringify(requestData.headers, null, 2)}
              onChange={handleHeadersChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Body (JSON)</label>
            <textarea
              name="body"
              value={requestData.body}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Query Parameters (JSON)</label>
            <textarea
              value={JSON.stringify(requestData.params, null, 2)}
              onChange={handleParamsChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 h-32"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending Request...' : 'Send Request'}
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-red-900/50 border border-red-500 rounded-lg"
          >
            <h3 className="text-red-500 font-medium">Error</h3>
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Response</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Status:</span> {response.status} {response.statusText}</p>
                <p><span className="font-medium">Time:</span> {response.time.toFixed(2)}ms</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Headers</h3>
              <pre className="overflow-x-auto">
                {JSON.stringify(response.headers, null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Data</h3>
              <pre className="overflow-x-auto">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </ClientPageTransition>
  );
} 