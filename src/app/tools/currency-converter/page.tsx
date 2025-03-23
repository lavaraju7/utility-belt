'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { CurrencyDollarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const currencies = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  CNY: 'Chinese Yuan',
  INR: 'Indian Rupee',
  NZD: 'New Zealand Dollar',
  SGD: 'Singapore Dollar',
  KRW: 'South Korean Won',
  BRL: 'Brazilian Real',
  RUB: 'Russian Ruble',
  ZAR: 'South African Rand',
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/currency-converter?from=${fromCurrency}&to=${toCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rate');
      const data = await response.json();
      setResult(Number(amount) * data.rate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exchange rate');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `/api/currency-converter/historical?from=${fromCurrency}&to=${toCurrency}&range=${timeRange}`
      );
      if (!response.ok) throw new Error('Failed to fetch historical data');
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Failed to fetch historical data:', err);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    fetchHistoricalData();
  }, [fromCurrency, toCurrency, timeRange]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const chartData = historicalData ? {
    labels: historicalData.dates,
    datasets: [
      {
        label: `${fromCurrency} to ${toCurrency}`,
        data: historicalData.rates,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Exchange Rate History',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Currency Converter</h2>
          <p className="text-gray-400">Convert between different currencies with real-time rates</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                From Currency
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSwap}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                <ArrowPathIcon className="h-6 w-6 text-gray-300" />
              </motion.button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                To Currency
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code}>
                    {code} - {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && (
            <div className="text-center text-gray-400">
              Loading exchange rate...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              {error}
            </div>
          )}

          {result !== null && (
            <div className="text-center space-y-2">
              <div className="text-2xl font-semibold">
                {Number(amount).toLocaleString()} {fromCurrency} =
              </div>
              <div className="text-3xl font-bold text-blue-500">
                {result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurrency}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {(['1D', '1W', '1M', '1Y'] as const).map((range) => (
                <motion.button
                  key={range}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg ${
                    timeRange === range
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {range}
                </motion.button>
              ))}
            </div>

            {chartData && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                <Line data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 