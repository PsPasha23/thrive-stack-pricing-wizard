
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="text-xl font-bold text-slate-900">ThriveStack</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>SOC 2 Type II</span>
              </div>
              <span>|</span>
              <a href="#" className="underline hover:text-slate-900">Trust Center</a>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-slate-900">Stay Ahead with ThriveStack Insights</h4>
              <p className="text-sm text-slate-600">
                Join our Substack Community and get the latest B2B trends and insights delivered straight to your inbox.
              </p>
              <button className="inline-flex items-center space-x-2 px-4 py-2 border border-orange-400 text-orange-600 rounded-md hover:bg-orange-50 transition-colors">
                <span className="text-sm">📧</span>
                <span className="text-sm font-medium">Join Substack</span>
              </button>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Capabilities</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Build Self-Serve</a></li>
              <li><a href="#" className="hover:text-slate-900">Analyze Customer Journey</a></li>
              <li><a href="#" className="hover:text-slate-900">Drive Growth</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900">Podcasts</a></li>
              <li><a href="#" className="hover:text-slate-900">Community</a></li>
              <li><a href="#" className="hover:text-slate-900">Changelog</a></li>
              <li><a href="#" className="hover:text-slate-900">Pricing</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col justify-between">
            <div></div>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-900 self-end">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            © 2024 ThriveStack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
