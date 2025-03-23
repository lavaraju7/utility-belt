import React from 'react';
import Link from 'next/link';
import {
  EnvelopeIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  UserGroupIcon,
  StarIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const footerLinks = {
  tools: [
    { name: 'Document Tools', href: '/docs#document-tools' },
    { name: 'Image Tools', href: '/docs#image-tools' },
    { name: 'Data Format Tools', href: '/docs#data-format-tools' },
    { name: 'Code Tools', href: '/docs#code-tools' },
    { name: 'Conversion Tools', href: '/docs#conversion-tools' },
    { name: 'Utility Tools', href: '/docs#utility-tools' },
  ],
  support: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Contact Support', href: '/contact' },
    { name: 'Request a Utility', href: '/request-utility' },
    { name: 'FAQ', href: '/docs#faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/utility-belt' },
  { name: 'Twitter', href: 'https://twitter.com/utility-belt' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/utility-belt' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <SparklesIcon className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Utility Belt
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your all-in-one toolkit for file conversions, data transformations, and utility functions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social.name}</span>
                  <GlobeAltIcon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Utility Belt. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 