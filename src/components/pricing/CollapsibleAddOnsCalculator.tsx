
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Currency } from '@/types/pricing';
import AllAddOnsCalculator from './AllAddOnsCalculator';

interface CollapsibleAddOnsCalculatorProps {
  currency: Currency;
  onTotalChange: (total: number) => void;
}

const CollapsibleAddOnsCalculator: React.FC<CollapsibleAddOnsCalculatorProps> = ({ 
  currency, 
  onTotalChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="border-blue-100">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-slate-900">Add-ons Calculator</CardTitle>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-slate-600 text-left">Select the add-ons you need for your plan</p>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <AllAddOnsCalculator 
              currency={currency} 
              onTotalChange={onTotalChange}
            />
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleAddOnsCalculator;
