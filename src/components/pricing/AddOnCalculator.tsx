
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Currency } from '@/types/pricing';
import { formatCurrency } from '@/utils/currency';

interface AddOnCalculatorProps {
  currency: Currency;
  onTotalChange: (total: number) => void;
}

const AddOnCalculator: React.FC<AddOnCalculatorProps> = ({ 
  currency, 
  onTotalChange 
}) => {
  const [abuseDetectionEnabled, setAbuseDetectionEnabled] = useState(false);
  const [additionalDetections, setAdditionalDetections] = useState(0);

  const basePrice = 25; // $25 for 500 detections
  const pricePerAdditionalDetection = 0.02; // $0.02 per additional detection
  const includedDetections = 500;

  const calculateAbuseDetectionTotal = () => {
    if (!abuseDetectionEnabled) return 0;
    return basePrice + (additionalDetections * pricePerAdditionalDetection);
  };

  const abuseDetectionTotal = calculateAbuseDetectionTotal();

  React.useEffect(() => {
    onTotalChange(abuseDetectionTotal);
  }, [abuseDetectionTotal, onTotalChange]);

  const handleAdditionalDetectionsChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setAdditionalDetections(Math.max(0, numValue));
  };

  return (
    <Card className="border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Add-ons Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="abuse-detection"
              checked={abuseDetectionEnabled}
              onCheckedChange={(checked) => {
                setAbuseDetectionEnabled(checked as boolean);
                if (!checked) {
                  setAdditionalDetections(0);
                }
              }}
            />
            <div className="space-y-2 flex-1">
              <Label 
                htmlFor="abuse-detection" 
                className="text-sm font-medium text-slate-900 cursor-pointer"
              >
                Abuse Detection
              </Label>
              <p className="text-xs text-slate-600">
                {formatCurrency(basePrice, currency)} includes {includedDetections.toLocaleString()} detections
              </p>
            </div>
            {abuseDetectionEnabled && (
              <div className="text-sm font-semibold text-slate-900">
                {formatCurrency(abuseDetectionTotal, currency)}/mo
              </div>
            )}
          </div>

          {abuseDetectionEnabled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="additional-detections" className="text-sm text-slate-700">
                Additional detections needed
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
      </CardContent>
    </Card>
  );
};

export default AddOnCalculator;
