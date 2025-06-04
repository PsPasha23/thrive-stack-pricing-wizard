
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';
import { calculateMTUPricing, MTU_BREAKPOINTS, MTU_TIERS } from '@/utils/mtuPricing';

interface MTUCalculatorProps {
  currency: Currency;
}

const MTUCalculator: React.FC<MTUCalculatorProps> = ({ currency }) => {
  const [selectedIndex, setSelectedIndex] = useState(5); // Default to 50K
  const [isAnnual, setIsAnnual] = useState(false);

  const selectedMTU = MTU_BREAKPOINTS[selectedIndex];
  
  const calculation = useMemo(() => {
    return calculateMTUPricing(selectedMTU, isAnnual);
  }, [selectedMTU, isAnnual]);

  const formatMTU = (mtu: number) => {
    if (mtu >= 1000) {
      return `${mtu / 1000}K`;
    }
    return mtu.toString();
  };

  const monthlyTotal = formatCurrency(calculation.monthlyTotal, currency);
  const annualTotal = formatCurrency(calculation.annualTotal, currency);
  const savings = formatCurrency(calculation.annualSavings, currency);
  const perMTURate = formatCurrency(calculation.tier.pricePerMTU, currency);

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-slate-900">
          MTU-Based Pricing Calculator
        </CardTitle>
        <p className="text-slate-600">
          Calculate your exact pricing based on Monthly Tracked Users (MTU)
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={`text-sm ${isAnnual ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge className="bg-green-100 text-green-800 ml-2">
              Save 20%
            </Badge>
          )}
        </div>

        {/* MTU Slider */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {formatMTU(selectedMTU)} MTU
            </div>
            <div className="text-sm text-slate-600">
              Tier: {formatMTU(calculation.tier.min)} - {formatMTU(calculation.tier.max)} MTU
            </div>
          </div>

          <div className="px-4">
            <Slider
              value={[selectedIndex]}
              onValueChange={(value) => setSelectedIndex(value[0])}
              max={MTU_BREAKPOINTS.length - 1}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="flex justify-between text-xs text-slate-500 px-4">
            <span>{formatMTU(MTU_BREAKPOINTS[0])}</span>
            <span>{formatMTU(MTU_BREAKPOINTS[MTU_BREAKPOINTS.length - 1])}</span>
          </div>
        </div>

        {/* Pricing Display */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {isAnnual ? annualTotal : monthlyTotal}
              </div>
              <div className="text-sm text-slate-600">
                {isAnnual ? 'per month (billed annually)' : 'per month'}
              </div>
              {isAnnual && (
                <div className="text-sm text-green-600 mt-2">
                  Save {savings} annually
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">MTU Count:</span>
                  <span className="font-semibold">{formatMTU(selectedMTU)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rate per MTU:</span>
                  <span className="font-semibold">{perMTURate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Billing:</span>
                  <span className="font-semibold">
                    {isAnnual ? 'Annual (-20%)' : 'Monthly'}
                  </span>
                </div>
                {calculation.tier.discount && (
                  <div className="flex justify-between text-green-600">
                    <span>Tier Discount:</span>
                    <span className="font-semibold">{calculation.tier.discount}%</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Your 14-Day Free Trial
          </button>
          <p className="text-sm text-slate-600 mt-2">
            No credit card required • Full access to all features
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MTUCalculator;
