
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';

interface PricingPlansProps {
  currency: Currency;
  onCalculateClick: () => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  currency,
  onCalculateClick,
}) => {
  const growFeatures = [
    'Account-Level Insights – Understand key metrics at the account level.',
    'Full Journey Tracking – Map customer interactions from first-touch to loyalty.',
    'Growth Leak Detection – Pinpoint inefficiencies impacting revenue.',
    'Optimized for Scale – Purpose-built for growth-focused analytics.',
    'Analytics Tool Consolidation – Replace Marketing, Product, CSM, and CDP tools.',
    'Efficient Event Collection – Cut 95% of unnecessary tracking data.',
    'Guided Setup for Instant Results – Opinionated implementation for fast impact.',
    'Transparent Pricing – Scales flexibly with usage.',
  ];

  const enterpriseFeatures = [
    'Everything in Grow',
    'Custom SLAs',
    'Tailored onboarding',
    'Custom integrations',
    'Dedicated support team',
    'Advanced security features',
    'Custom reporting',
    'Priority feature requests',
  ];

  const monthlyPrice = formatCurrency(99, currency);
  const annualPrice = formatCurrency(79.20, currency);

  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Grow Plan */}
      <Card className="relative border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-blue-600 text-white px-6 py-2">
            14-Day Free Trial
          </Badge>
        </div>
        
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-2xl font-bold text-slate-900">Grow Plan</CardTitle>
          <div className="space-y-2 mt-4">
            <div className="text-4xl font-bold text-slate-900">
              Starts at {monthlyPrice}
              <span className="text-lg font-normal text-slate-600">/month</span>
            </div>
            <div className="text-sm text-slate-600">
              Monthly billing • Save 20% annually (starts at {annualPrice}/month)
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
              Start Trial
            </Button>
            <button
              onClick={onCalculateClick}
              className="w-full text-blue-600 hover:text-blue-700 text-sm underline"
            >
              Calculate your price by MTU count
            </button>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Core Capabilities:</h4>
            <ul className="space-y-3">
              {growFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Plan */}
      <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">Enterprise</CardTitle>
          <div className="space-y-2 mt-4">
            <div className="text-4xl font-bold text-slate-900">Custom</div>
            <div className="text-sm text-slate-600">Tailored to your needs</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold">
            Contact Sales
          </Button>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Enterprise Features:</h4>
            <ul className="space-y-3">
              {enterpriseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPlans;
