import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';

interface PricingPlansProps {
  currency: Currency;
  isAnnual: boolean;
  onBillingChange: (isAnnual: boolean) => void;
  onCalculateClick: () => void;
}

const PricingPlans: React.FC<PricingPlansProps> = ({
  currency,
  isAnnual,
  onBillingChange,
  onCalculateClick,
}) => {
  const growFeatures = [
    'Track up to 300,000 MTUs',
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

  const addOns = [
    {
      name: 'Abuse Detection',
      price: 25,
      description: 'Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.',
    },
    {
      name: 'Economic Buyer',
      price: 25,
      description: 'Automatically identify up to 500 key decision-makers in an organization with the authority to approve expenditures and make financial decisions.',
    },
    {
      name: 'Data Retention',
      price: 25,
      description: 'Access and analyze your data for up to one year with our extended retention add-on',
    },
  ];

  const baseMonthlyPrice = 99;
  const discountedPrice = baseMonthlyPrice * 0.8; // 20% discount for annual
  const displayPrice = isAnnual ? discountedPrice : baseMonthlyPrice;
  const monthlyPrice = formatCurrency(displayPrice, currency);

  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${!isAnnual ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onCheckedChange={onBillingChange}
        />
        <span className={`text-sm ${isAnnual ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
          Annual
        </span>
        <Badge className="bg-green-100 text-green-800 ml-2">
          Save 20%
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Grow Plan */}
        <Card className="relative border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
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
                {isAnnual ? 'Billed annually' : 'Monthly billing'} • {!isAnnual && 'Save 20% annually'}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 flex-grow flex flex-col">
            <div className="space-y-4 pb-4 border-b">
              <div className="text-sm text-slate-600 text-center">
                This price includes 1,500 MTUs
              </div>
              <button
                onClick={onCalculateClick}
                className="w-full text-blue-600 hover:text-blue-700 text-sm underline"
              >
                Calculate your price by MTU count
              </button>
            </div>

            <div className="flex-grow">
              <h4 className="font-semibold text-slate-900 mb-4">Includes:</h4>
              <ul className="space-y-3">
                {growFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Add-ons:</h4>
              <ul className="space-y-3">
                {addOns.map((addOn, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 border-2 border-slate-300 rounded flex-shrink-0 mt-0.5"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-slate-700">{addOn.name}</span>
                        <span className="text-sm text-slate-600">{formatCurrency(addOn.price, currency)}/mo</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{addOn.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t mt-auto">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
                Start Trial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow flex flex-col">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-slate-900">Enterprise</CardTitle>
            <div className="space-y-2 mt-4">
              <div className="text-4xl font-bold text-slate-900">Custom</div>
              <div className="text-sm text-slate-600">Tailored to your needs</div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 flex-grow flex flex-col">
            <div className="flex-grow">
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

            <div>
              <h4 className="font-semibold text-slate-900 mb-4">All Add-ons Included:</h4>
              <ul className="space-y-3">
                {addOns.map((addOn, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-slate-700">{addOn.name}</span>
                      <p className="text-xs text-slate-600 mt-1">{addOn.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t mt-auto">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 text-lg font-semibold">
                Schedule a call
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingPlans;
