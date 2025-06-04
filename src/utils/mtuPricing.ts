
import { MTUTier, PricingCalculation } from '@/types/pricing';

export const MTU_BREAKPOINTS = [
  1500, 2500, 5000, 10000, 25000, 50000, 75000, 100000,
  125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000
];

export const MTU_TIERS: MTUTier[] = [
  { min: 1500, max: 2500, pricePerMTU: 0.066, discount: 0 }, // $99 / 1500 = $0.066 per MTU
  { min: 2500, max: 5000, pricePerMTU: 0.02784, discount: 37 },
  { min: 5000, max: 10000, pricePerMTU: 0.02088, discount: 30 },
  { min: 10000, max: 25000, pricePerMTU: 0.013952, discount: 33 },
  { min: 25000, max: 50000, pricePerMTU: 0.012576, discount: 12 },
  { min: 50000, max: 75000, pricePerMTU: 0.012570667, discount: 0 },
  { min: 75000, max: 100000, pricePerMTU: 0.011888, discount: 5 },
  { min: 100000, max: 125000, pricePerMTU: 0.0118576, discount: 2 },
  { min: 125000, max: 150000, pricePerMTU: 0.011829333, discount: 1 },
  { min: 150000, max: 175000, pricePerMTU: 0.01176, discount: 1 },
  { min: 175000, max: 200000, pricePerMTU: 0.01176, discount: 0 },
  { min: 200000, max: 225000, pricePerMTU: 0.01176, discount: 0 },
  { min: 225000, max: 250000, pricePerMTU: 0.01176, discount: 0 },
  { min: 250000, max: 275000, pricePerMTU: 0.01176, discount: 0 },
  { min: 275000, max: 300000, pricePerMTU: 0.01176, discount: 0 },
];

export const findTierForMTU = (mtuCount: number): MTUTier => {
  return MTU_TIERS.find(tier => mtuCount >= tier.min && mtuCount <= tier.max) || MTU_TIERS[0];
};

export const calculateMTUPricing = (mtuCount: number, isAnnual: boolean = false): PricingCalculation => {
  const tier = findTierForMTU(mtuCount);
  const monthlyTotal = mtuCount * tier.pricePerMTU;
  const annualTotal = monthlyTotal * (isAnnual ? 0.8 : 1); // 20% discount for annual
  const annualSavings = monthlyTotal * 12 * 0.2;

  return {
    mtuCount,
    tier,
    monthlyTotal,
    annualTotal,
    annualSavings,
  };
};
