
import React, { useState } from 'react';
import PricingPlans from '@/components/pricing/PricingPlans';
import MTUCalculator from '@/components/pricing/MTUCalculator';
import CurrencySelector from '@/components/pricing/CurrencySelector';
import ComparisonSection from '@/components/pricing/ComparisonSection';
import AddOnsSection from '@/components/pricing/AddOnsSection';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Currency } from '@/types/pricing';

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
  const [isAnnual, setIsAnnual] = useState(false);

  const scrollToCalculator = () => {
    const calculator = document.getElementById('mtu-calculator');
    calculator?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">ThriveStack</h1>
            <CurrencySelector 
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Scale your analytics without the complexity. Choose the plan that fits your growth stage.
          </p>
        </div>

        {/* Billing Toggle and Currency Selector */}
        <div className="flex items-center justify-center gap-8 mb-16">
          {/* Billing Toggle */}
          <div className="flex items-center gap-4">
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

          {/* Currency Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Currency:</span>
            <CurrencySelector 
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
            />
          </div>
        </div>

        {/* Pricing Plans */}
        <PricingPlans 
          currency={selectedCurrency}
          onCalculateClick={scrollToCalculator}
        />

        {/* MTU Calculator */}
        <div id="mtu-calculator" className="mt-20">
          <MTUCalculator 
            currency={selectedCurrency}
            isAnnual={isAnnual}
            onBillingChange={setIsAnnual}
          />
        </div>

        {/* Add-ons Section */}
        <div className="mt-20">
          <AddOnsSection currency={selectedCurrency} />
        </div>

        {/* Comparison Section */}
        <div className="mt-20">
          <ComparisonSection />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
