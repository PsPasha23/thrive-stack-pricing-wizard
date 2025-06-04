
import { Currency, CurrencyConfig } from '@/types/pricing';

export const currencyConfigs: Record<Currency, CurrencyConfig> = {
  USD: {
    symbol: '$',
    rate: 1,
    format: (amount: number) => `$${amount.toFixed(2)}`,
  },
  EUR: {
    symbol: '€',
    rate: 0.85,
    format: (amount: number) => `€${amount.toFixed(2)}`,
  },
  GBP: {
    symbol: '£',
    rate: 0.73,
    format: (amount: number) => `£${amount.toFixed(2)}`,
  },
  INR: {
    symbol: '₹',
    rate: 83.12,
    format: (amount: number) => `₹${amount.toFixed(0)}`,
  },
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const config = currencyConfigs[currency];
  const convertedAmount = amount * config.rate;
  return config.format(convertedAmount);
};

export const convertCurrency = (amount: number, currency: Currency): number => {
  return amount * currencyConfigs[currency].rate;
};
