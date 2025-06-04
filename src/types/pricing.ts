
export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  symbol: string;
  rate: number;
  format: (amount: number) => string;
}

export interface MTUTier {
  min: number;
  max: number;
  pricePerMTU: number;
  discount?: number;
}

export interface PricingCalculation {
  mtuCount: number;
  tier: MTUTier;
  monthlyTotal: number;
  annualTotal: number;
  annualSavings: number;
}
