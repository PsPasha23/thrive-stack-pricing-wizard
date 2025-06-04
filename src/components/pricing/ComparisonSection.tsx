
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const competitors = [
    {
      name: 'ThriveStack',
      pricing: 'From $79.20/mo',
      features: {
        'Account-Level Insights': true,
        'Full Journey Tracking': true,
        'Growth Leak Detection': true,
        'Analytics Consolidation': true,
        'Efficient Event Collection': true,
        'Guided Setup': true,
        'Transparent Pricing': true,
        'Real-time Processing': true,
      },
      highlight: true,
    },
    {
      name: 'Amplitude',
      pricing: 'From $61/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'Mixpanel',
      pricing: 'From $89/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'Heap',
      pricing: 'From $360/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'June',
      pricing: 'From $50/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': false,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': true,
        'Transparent Pricing': true,
        'Real-time Processing': false,
      },
    },
  ];

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        How We Compare
      </h2>
      <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
        See how ThriveStack stacks up against other analytics platforms in features and pricing.
      </p>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-8 py-3 text-lg">
            Compare pricing with other analytics tools
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              ThriveStack vs Competition
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-2 font-semibold">Feature</th>
                  {competitors.map((competitor) => (
                    <th
                      key={competitor.name}
                      className={`text-center py-4 px-2 font-semibold ${
                        competitor.highlight
                          ? 'bg-blue-50 border-l-2 border-r-2 border-blue-200'
                          : ''
                      }`}
                    >
                      <div>{competitor.name}</div>
                      <div className="text-sm font-normal text-slate-600 mt-1">
                        {competitor.pricing}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(competitors[0].features).map((feature) => (
                  <tr key={feature} className="border-b">
                    <td className="py-3 px-2 text-sm font-medium">{feature}</td>
                    {competitors.map((competitor) => (
                      <td
                        key={competitor.name}
                        className={`text-center py-3 px-2 ${
                          competitor.highlight
                            ? 'bg-blue-50 border-l-2 border-r-2 border-blue-200'
                            : ''
                        }`}
                      >
                        {competitor.features[feature as keyof typeof competitor.features] ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              onClick={() => setIsOpen(false)}
            >
              Start Your Free Trial
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComparisonSection;
