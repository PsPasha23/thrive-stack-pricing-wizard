
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Currency } from '@/types/pricing';
import { DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const currencyIcons = {
  USD: DollarSign,
  EUR: Euro,
  GBP: PoundSterling,
  INR: IndianRupee,
};

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
}) => {
  const SelectedIcon = currencyIcons[selectedCurrency];

  return (
    <div className="flex items-center gap-2">
      <SelectedIcon className="w-4 h-4 text-slate-600" />
      <Select value={selectedCurrency} onValueChange={onCurrencyChange}>
        <SelectTrigger className="w-20 border-none shadow-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
          <SelectItem value="GBP">GBP</SelectItem>
          <SelectItem value="INR">INR</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
