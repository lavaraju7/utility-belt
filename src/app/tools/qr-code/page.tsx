'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import { QrCodeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
// ... existing code ...

export default function QRCodeGenerator() {
  // ... existing code ...

  return (
    <ClientPageTransition>
      <div className="space-y-6">
      // ... existing code ...
      </div>
    </ClientPageTransition>
  );
} 