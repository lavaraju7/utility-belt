'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ClientPageTransition from '@/components/ClientPageTransition';
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClientPageTransition>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Contact Support
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need help? Our support team is here to assist you with any questions or issues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  placeholder="Describe your issue or question..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-green-500/20 text-green-400 rounded-lg"
              >
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-lg"
              >
                Failed to send message. Please try again later.
              </motion.div>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-200 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <EnvelopeIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Email Support</h3>
                    <p className="text-gray-400">support@utilitybelt.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Live Chat</h3>
                    <p className="text-gray-400">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Response Time</h3>
                    <p className="text-gray-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-200 mb-6">Common Questions</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">How secure is my data?</h3>
                    <p className="text-gray-400">All processing is done locally in your browser. We never store your files or data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">What file sizes are supported?</h3>
                    <p className="text-gray-400">Most tools support files up to 100MB. For larger files, use our compression tools first.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-200">Can I request new features?</h3>
                    <p className="text-gray-400">Yes! Use the "Request a New Utility" button on the homepage to suggest new tools.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ClientPageTransition>
  );
} 