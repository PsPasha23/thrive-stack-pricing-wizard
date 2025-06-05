
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';

interface AllAddOnsCalculatorProps {
  currency: Currency;
  onTotalChange: (total: number) => void;
}

const AllAddOnsCalculator: React.FC<AllAddOnsCalculatorProps> = ({ 
  currency, 
  onTotalChange 
}) => {
  const [abuseDetectionEnabled, setAbuseDetectionEnabled] = useState(false);
  const [additionalDetections, setAdditionalDetections] = useState(0);
  const [economicBuyerEnabled, setEconomicBuyerEnabled] = useState(false);
  const [dataRetentionEnabled, setDataRetentionEnabled] = useState(false);

  const basePrice = 25; // $25 for each add-on
  const pricePerAdditionalDetection = 0.02; // $0.02 per additional detection for abuse detection
  const includedDetections = 500;

  const calculateTotal = () => {
    let total = 0;
    
    if (abuseDetectionEnabled) {
      total += basePrice + (additionalDetections * pricePerAdditionalDetection);
    }
    
    if (economicBuyerEnabled) {
      total += basePrice;
    }
    
    if (dataRetentionEnabled) {
      total += basePrice;
    }
    
    return total;
  };

  const totalCost = calculateTotal();

  React.useEffect(() => {
    onTotalChange(totalCost);
  }, [totalCost, onTotalChange]);

  const handleAdditionalDetectionsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setAdditionalDetections(Math.max(0, numValue));
  };

  const addOns = [
    {
      id: 'abuse-detection',
      name: 'Abuse Detection',
      description: 'Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.',
      enabled: abuseDetectionEnabled,
      setEnabled: setAbuseDetectionEnabled,
      hasAdditional: true,
    },
    {
      id: 'economic-buyer',
      name: 'Economic Buyer',
      description: 'Automatically identify up to 500 key decision-makers in an organization with the authority to approve expenditures and make financial decisions.',
      enabled: economicBuyerEnabled,
      setEnabled: setEconomicBuyerEnabled,
      hasAdditional: false,
    },
    {
      id: 'data-retention',
      name: 'Data Retention',
      description: 'Access and analyze your data for up to one year with our extended retention add-on. Perfect for compliance and long-term analysis.',
      enabled: dataRetentionEnabled,
      setEnabled: setDataRetentionEnabled,
      hasAdditional: false,
    },
  ];

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Add-ons Calculator</CardTitle>
        <p className="text-sm text-slate-600">Select the add-ons you need for your plan</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {addOns.map((addOn) => (
          <div key={addOn.id} className="space-y-3 p-4 border border-slate-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Checkbox
                id={addOn.id}
                checked={addOn.enabled}
                onCheckedChange={(checked) => {
                  addOn.setEnabled(checked as boolean);
                  if (!checked && addOn.id === 'abuse-detection') {
                    setAdditionalDetections(0);
                  }
                }}
              />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-start">
                  <Label 
                    htmlFor={addOn.id} 
                    className="text-sm font-medium text-slate-900 cursor-pointer"
                  >
                    {addOn.name}
                  </Label>
                  <div className="text-sm font-semibold text-slate-900">
                    {formatCurrency(basePrice, currency)}/mo
                    {addOn.id === 'abuse-detection' && abuseDetectionEnabled && additionalDetections > 0 && (
                      <span className="text-blue-600">
                        {' '}+ {formatCurrency(additionalDetections * pricePerAdditionalDetection, currency)}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-slate-600">
                  {addOn.description}
                  {addOn.id === 'abuse-detection' && (
                    <span className="block mt-1">Includes {includedDetections.toLocaleString()} detections</span>
                  )}
                </p>
              </div>
            </div>

            {addOn.id === 'abuse-detection' && abuseDetectionEnabled && (
              <div className="ml-6 space-y-2">
                <Label htmlFor="additional-detections" className="text-sm text-slate-700">
                  Additional detections needed (beyond {includedDetections.toLocaleString()})
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="additional-detections"
                    type="number"
                    min="0"
                    value={additionalDetections}
                    onChange={(e) => handleAdditionalDetectionsChange(e.target.value)}
                    className="w-32"
                    placeholder="0"
                  />
                  <span className="text-sm text-slate-600">
                    × {formatCurrency(pricePerAdditionalDetection, currency)} each
                  </span>
                </div>
                {additionalDetections > 0 && (
                  <p className="text-xs text-slate-500">
                    Additional cost: {formatCurrency(additionalDetections * pricePerAdditionalDetection, currency)}/mo
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {totalCost > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-900">Total Add-ons Cost:</span>
              <span className="text-lg font-bold text-blue-600">{formatCurrency(totalCost, currency)}/mo</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllAddOnsCalculator;
