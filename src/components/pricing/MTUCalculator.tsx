
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';
import { calculateMTUPricing, MTU_BREAKPOINTS } from '@/utils/mtuPricing';
import AddOnCalculator from './AddOnCalculator';
import CurrencySelector from './CurrencySelector';

interface MTUCalculatorProps {
  currency: Currency;
  isAnnual: boolean;
  onBillingChange: (isAnnual: boolean) => void;
}

const MTUCalculator: React.FC<MTUCalculatorProps> = ({ 
  currency, 
  isAnnual, 
  onBillingChange 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(5); // Default to 50K
  const [addOnTotal, setAddOnTotal] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currency);

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

  const baseMonthlyTotal = calculation.monthlyTotal;
  const baseAnnualTotal = calculation.annualTotal;
  const totalMonthlyWithAddOns = baseMonthlyTotal + addOnTotal;
  const totalAnnualWithAddOns = baseAnnualTotal + addOnTotal;

  const monthlyTotal = formatCurrency(isAnnual ? totalAnnualWithAddOns : totalMonthlyWithAddOns, selectedCurrency);
  const savings = formatCurrency(calculation.annualSavings + (addOnTotal * 12 * 0.2), selectedCurrency);
  const perMTURate = formatCurrency(calculation.tier.pricePerMTU, selectedCurrency);

  return (
    <div className="space-y-6">
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
          {/* Currency Selector */}
          <div className="flex justify-center">
            <CurrencySelector 
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>

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
              Pay Annually
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save 20%
              </Badge>
            )}
          </div>

          {/* MTU Display and Rate */}
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {formatMTU(selectedMTU)}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">
                  MTUs
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {perMTURate}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">
                  per MTU
                </div>
              </div>
              
              <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">
                  {monthlyTotal}
                </div>
                <div className="text-sm text-slate-500 uppercase tracking-wide">
                  Monthly Price
                </div>
              </div>
            </div>
            
            <div className="text-sm text-slate-600">
              Tier: {formatMTU(calculation.tier.min)} - {formatMTU(calculation.tier.max)} MTU
            </div>
          </div>

          {/* MTU Slider */}
          <div className="px-4 space-y-4">
            <Slider
              value={[selectedIndex]}
              onValueChange={(value) => setSelectedIndex(value[0])}
              max={MTU_BREAKPOINTS.length - 1}
              min={0}
              step={1}
              className="w-full"
            />
            
            {/* Slider markers */}
            <div className="flex justify-between text-xs text-slate-500 px-1">
              {MTU_BREAKPOINTS.map((mtu, index) => (
                <div key={index} className="text-center">
                  <div className="w-px h-2 bg-slate-300 mx-auto mb-1"></div>
                  <span className={index % 2 === 0 ? '' : 'sr-only'}>
                    {formatMTU(mtu)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add-on Calculator */}
      <div className="max-w-4xl mx-auto">
        <AddOnCalculator 
          currency={selectedCurrency} 
          onTotalChange={setAddOnTotal}
        />
      </div>

      {/* Enhanced Total Price Display */}
      <Card className="max-w-4xl mx-auto border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Total Price</h3>
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {monthlyTotal}
              </div>
              <div className="text-lg text-slate-600">
                {isAnnual ? 'per month (billed annually)' : 'per month'}
              </div>
              {isAnnual && addOnTotal > 0 && (
                <div className="text-lg text-green-600 mt-2">
                  Save {savings} annually (20% discount applied)
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Base Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">MTU Count:</span>
                      <span className="font-semibold">{formatMTU(selectedMTU)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rate per MTU:</span>
                      <span className="font-semibold">{perMTURate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Base Price:</span>
                      <span className="font-semibold">{formatCurrency(baseMonthlyTotal, selectedCurrency)}/mo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900">Summary</h4>
                  <div className="space-y-2 text-sm">
                    {addOnTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Add-ons:</span>
                        <span className="font-semibold">{formatCurrency(addOnTotal, selectedCurrency)}/mo</span>
                      </div>
                    )}
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
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl">
                Start Your 14-Day Free Trial
              </button>
              <p className="text-sm text-slate-600 mt-3">
                No credit card required • Full access to all features
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MTUCalculator;
