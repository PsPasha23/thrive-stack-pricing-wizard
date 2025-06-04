
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface AddOnsSectionProps {
  currency: Currency;
}

const addOns: AddOn[] = [
  {
    id: 'abuse-detection',
    name: 'Abuse Detection',
    price: 25,
    description: 'Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.',
  },
  {
    id: 'economic-buyer',
    name: 'Economic Buyer',
    price: 25,
    description: 'Understand the economic impact of your product decisions with detailed financial analytics and ROI tracking.',
  },
  {
    id: 'data-retention',
    name: 'Data Retention',
    price: 25,
    description: 'Extended data retention beyond the standard 12 months. Keep your valuable analytics data for longer periods.',
  },
];

const AddOnsSection: React.FC<AddOnsSectionProps> = ({ currency }) => {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [expandedAddOns, setExpandedAddOns] = useState<Set<string>>(new Set());

  const toggleAddOn = (addOnId: string) => {
    const newSelected = new Set(selectedAddOns);
    if (newSelected.has(addOnId)) {
      newSelected.delete(addOnId);
    } else {
      newSelected.add(addOnId);
    }
    setSelectedAddOns(newSelected);
  };

  const toggleExpanded = (addOnId: string) => {
    const newExpanded = new Set(expandedAddOns);
    if (newExpanded.has(addOnId)) {
      newExpanded.delete(addOnId);
    } else {
      newExpanded.add(addOnId);
    }
    setExpandedAddOns(newExpanded);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-900">ADD-ONS</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addOns.map((addOn) => (
          <div key={addOn.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <Switch
                  checked={selectedAddOns.has(addOn.id)}
                  onCheckedChange={() => toggleAddOn(addOn.id)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{addOn.name}</h3>
                    <div className="text-lg font-semibold text-slate-900">
                      {formatCurrency(addOn.price, currency)}/month
                    </div>
                  </div>
                  {!expandedAddOns.has(addOn.id) && (
                    <p className="text-sm text-slate-600 mt-1 line-clamp-1">
                      {addOn.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => toggleExpanded(addOn.id)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  {expandedAddOns.has(addOn.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {expandedAddOns.has(addOn.id) && (
              <div className="mt-3 pl-12">
                <p className="text-sm text-slate-600">{addOn.description}</p>
              </div>
            )}
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold">
            Start Free Trial
          </Button>
          <p className="text-sm text-slate-600 text-center mt-2">
            No credit card required to start
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddOnsSection;
