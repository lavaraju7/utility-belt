'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { SwatchIcon, ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  name: string;
  contrast: string;
}

export default function ColorConverter() {
  const [color, setColor] = useState<string>('#000000');
  const [colorInfo, setColorInfo] = useState<ColorInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h, s, l };
  };

  const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = Math.min(c, m, y);
    return {
      c: (c - k) / (1 - k) || 0,
      m: (m - k) / (1 - k) || 0,
      y: (y - k) / (1 - k) || 0,
      k: k,
    };
  };

  const getContrast = (hex: string): string => {
    const rgb = hexToRgb(hex);
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const getColorName = (hex: string): string => {
    const rgb = hexToRgb(hex);
    // Simple color name mapping - can be expanded with more colors
    const colors: { [key: string]: string } = {
      '000000': 'Black',
      'FFFFFF': 'White',
      'FF0000': 'Red',
      '00FF00': 'Green',
      '0000FF': 'Blue',
      'FFFF00': 'Yellow',
      'FF00FF': 'Magenta',
      '00FFFF': 'Cyan',
      '808080': 'Gray',
      '800000': 'Maroon',
      '008000': 'Dark Green',
      '000080': 'Navy',
      '808000': 'Olive',
      '800080': 'Purple',
      '008080': 'Teal',
    };
    return colors[hex.slice(1).toUpperCase()] || 'Custom Color';
  };

  const updateColorInfo = (hexColor: string) => {
    const rgb = hexToRgb(hexColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    setColorInfo({
      hex: hexColor,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${Math.round(hsl.h * 360)}°, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`,
      cmyk: `cmyk(${Math.round(cmyk.c * 100)}%, ${Math.round(cmyk.m * 100)}%, ${Math.round(cmyk.y * 100)}%, ${Math.round(cmyk.k * 100)}%)`,
      name: getColorName(hexColor),
      contrast: getContrast(hexColor),
    });
  };

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(format);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    updateColorInfo(color);
  }, [color]);

  return (
    <ClientPageTransition>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Color Converter</h2>
          <p className="text-gray-400">Convert and analyze colors in different formats</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg border border-gray-700"
              style={{ backgroundColor: color }}
            />
            <div className="flex-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {colorInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(colorInfo).map(([format, value]) => (
                  <div
                    key={format}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300 capitalize">
                        {format}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(value, format)}
                        className="p-1 rounded-lg bg-gray-700 hover:bg-gray-600"
                      >
                        {copied === format ? (
                          <CheckIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <ClipboardIcon className="h-4 w-4 text-gray-300" />
                        )}
                      </motion.button>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">{value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                  className="h-24 rounded-lg flex items-center justify-center text-lg font-medium"
                  style={{ backgroundColor: color, color: colorInfo.contrast }}
                >
                  Sample Text
                </div>
                <div
                  className="h-24 rounded-lg flex items-center justify-center text-lg font-medium"
                  style={{ backgroundColor: colorInfo.contrast, color: color }}
                >
                  Sample Text
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ClientPageTransition>
  );
} 