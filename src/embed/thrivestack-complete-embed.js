
(function() {
  'use strict';

  // Currency configurations
  const currencyConfigs = {
    USD: { symbol: '$', rate: 1, format: (amount) => `$${amount.toFixed(2)}` },
    EUR: { symbol: '€', rate: 0.85, format: (amount) => `€${amount.toFixed(2)}` },
    GBP: { symbol: '£', rate: 0.73, format: (amount) => `£${amount.toFixed(2)}` },
    INR: { symbol: '₹', rate: 83.12, format: (amount) => `₹${amount.toFixed(0)}` }
  };

  // MTU breakpoints and tiers
  const MTU_BREAKPOINTS = [
    1500, 2500, 5000, 10000, 25000, 50000, 75000, 100000,
    125000, 150000, 175000, 200000, 225000, 250000, 275000, 300000
  ];

  const MTU_TIERS = [
    { min: 1500, max: 2500, pricePerMTU: 0.066, discount: 0 },
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
    { min: 275000, max: 300000, pricePerMTU: 0.01176, discount: 0 }
  ];

  // Add-on configurations
  const ADD_ONS = {
    abuseDetection: {
      name: 'Abuse Detection',
      description: 'Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.',
      basePrice: 25,
      includedDetections: 500,
      pricePerAdditionalDetection: 0.02
    },
    economicBuyer: {
      name: 'Economic Buyer',
      description: 'Automatically identify up to 500 key decision-makers in an organization with the authority to approve expenditures and make financial decisions.',
      basePrice: 25
    },
    dataRetention: {
      name: 'Data Retention',
      description: 'Access and analyze your data for up to one year with our extended retention add-on. Perfect for compliance and long-term analysis.',
      basePrice: 25
    }
  };

  // Utility functions
  function formatCurrency(amount, currency) {
    const config = currencyConfigs[currency];
    const convertedAmount = amount * config.rate;
    return config.format(convertedAmount);
  }

  function findTierForMTU(mtuCount) {
    return MTU_TIERS.find(tier => mtuCount >= tier.min && mtuCount <= tier.max) || MTU_TIERS[0];
  }

  function calculateMTUPricing(mtuCount, isAnnual = false) {
    const tier = findTierForMTU(mtuCount);
    const monthlyTotal = mtuCount * tier.pricePerMTU;
    const annualTotal = monthlyTotal * (isAnnual ? 0.8 : 1);
    const annualSavings = monthlyTotal * 12 * 0.2;

    return { mtuCount, tier, monthlyTotal, annualTotal, annualSavings };
  }

  function formatMTU(mtu) {
    if (mtu >= 1000) {
      return `${mtu / 1000}K`;
    }
    return mtu.toString();
  }

  function calculateAddOnTotal(addOns) {
    let total = 0;
    if (addOns.abuseDetection.enabled) {
      total += ADD_ONS.abuseDetection.basePrice + (addOns.abuseDetection.additionalDetections * ADD_ONS.abuseDetection.pricePerAdditionalDetection);
    }
    if (addOns.economicBuyer.enabled) {
      total += ADD_ONS.economicBuyer.basePrice;
    }
    if (addOns.dataRetention.enabled) {
      total += ADD_ONS.dataRetention.basePrice;
    }
    return total;
  }

  // CSS Styles
  const styles = `
    .thrivestack-pricing {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.5;
      color: #0f172a;
      background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%);
      min-height: 100vh;
      margin: 0;
      padding: 0;
    }
    
    .thrivestack-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 4rem 1rem;
    }
    
    .thrivestack-hero {
      text-align: center;
      margin-bottom: 4rem;
    }
    
    .thrivestack-hero h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }
    
    .thrivestack-hero p {
      font-size: 1.25rem;
      color: #64748b;
      max-width: 48rem;
      margin: 0 auto 2rem;
    }
    
    .thrivestack-currency-selector {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
    
    .thrivestack-currency-select {
      padding: 0.5rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      background: white;
      font-size: 0.875rem;
      color: #0f172a;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    
    .thrivestack-currency-select:hover {
      border-color: #3b82f6;
    }
    
    .thrivestack-billing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .thrivestack-switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: #e2e8f0;
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .thrivestack-switch.active {
      background: #3b82f6;
    }
    
    .thrivestack-switch-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 10px;
      transition: transform 0.2s;
    }
    
    .thrivestack-switch.active .thrivestack-switch-thumb {
      transform: translateX(20px);
    }
    
    .thrivestack-badge {
      background: #dcfce7;
      color: #166534;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .thrivestack-plans {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      max-width: 80rem;
      margin: 0 auto 5rem;
    }
    
    .thrivestack-card {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border: 2px solid #e2e8f0;
      transition: box-shadow 0.2s;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    .thrivestack-card.featured {
      border-color: #bfdbfe;
    }
    
    .thrivestack-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .thrivestack-card-badge {
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      background: #2563eb;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .thrivestack-card-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .thrivestack-card-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    
    .thrivestack-price {
      font-size: 2.5rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-price-period {
      font-size: 1rem;
      font-weight: 400;
      color: #64748b;
    }
    
    .thrivestack-price-note {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
    
    .thrivestack-features {
      flex-grow: 1;
      margin-bottom: 2rem;
    }
    
    .thrivestack-features h4 {
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    
    .thrivestack-features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .thrivestack-features li {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    
    .thrivestack-check {
      width: 1rem;
      height: 1rem;
      color: #22c55e;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }
    
    .thrivestack-button {
      background: #2563eb;
      color: white;
      border: none;
      padding: 0.875rem 2rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }
    
    .thrivestack-button:hover {
      background: #1d4ed8;
    }
    
    .thrivestack-button.secondary {
      background: #0f172a;
    }
    
    .thrivestack-button.secondary:hover {
      background: #334155;
    }
    
    .thrivestack-calculator {
      max-width: 64rem;
      margin: 0 auto;
    }
    
    .thrivestack-calculator-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .thrivestack-calculator-title {
      font-size: 2rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    
    .thrivestack-mtu-display {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      text-align: center;
      margin: 2rem 0;
    }
    
    .thrivestack-mtu-count {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 0.25rem;
    }
    
    .thrivestack-mtu-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .thrivestack-price-display {
      font-size: 3rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }
    
    .thrivestack-price-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .thrivestack-per-mtu {
      font-size: 1rem;
      color: #64748b;
    }
    
    .thrivestack-slider-container {
      margin: 2rem 0;
      padding: 0 1rem;
    }
    
    .thrivestack-slider {
      width: 100%;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      outline: none;
      cursor: pointer;
      -webkit-appearance: none;
    }
    
    .thrivestack-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background: #2563eb;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .thrivestack-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: #2563eb;
      border-radius: 50%;
      cursor: pointer;
      border: none;
    }
    
    .thrivestack-slider-markers {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
      padding: 0 0.25rem;
    }
    
    .thrivestack-slider-marker {
      font-size: 0.75rem;
      color: #64748b;
      text-align: center;
    }
    
    .thrivestack-addons {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 1rem;
      padding: 1.5rem;
      margin: 2rem 0;
    }
    
    .thrivestack-addons-header {
      display: flex;
      align-items: center;
      justify-content: between;
      margin-bottom: 1rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: background-color 0.2s;
    }
    
    .thrivestack-addons-header:hover {
      background: #f8fafc;
    }
    
    .thrivestack-addons-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: #0f172a;
      margin: 0;
    }
    
    .thrivestack-addons-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin: 0.25rem 0 0 0;
    }
    
    .thrivestack-addons-content {
      display: none;
      padding-top: 1rem;
    }
    
    .thrivestack-addons-content.open {
      display: block;
    }
    
    .thrivestack-addon-item {
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    .thrivestack-addon-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-checkbox {
      width: 1rem;
      height: 1rem;
      accent-color: #2563eb;
      cursor: pointer;
    }
    
    .thrivestack-addon-details {
      flex: 1;
    }
    
    .thrivestack-addon-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-addon-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #0f172a;
      cursor: pointer;
    }
    
    .thrivestack-addon-price {
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f172a;
    }
    
    .thrivestack-addon-description {
      font-size: 0.75rem;
      color: #64748b;
      line-height: 1.4;
    }
    
    .thrivestack-addon-extra {
      margin-top: 0.75rem;
      margin-left: 1.75rem;
    }
    
    .thrivestack-addon-input {
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.25rem;
      width: 8rem;
      margin-right: 0.5rem;
    }
    
    .thrivestack-addons-total {
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .thrivestack-summary {
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      border: 2px solid #bfdbfe;
      border-radius: 1rem;
      padding: 2rem;
      margin-top: 2rem;
    }
    
    .thrivestack-summary-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .thrivestack-summary-price {
      font-size: 3rem;
      font-weight: 700;
      color: #2563eb;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-summary-period {
      font-size: 1rem;
      color: #64748b;
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .thrivestack-summary-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid #cbd5e1;
    }
    
    .thrivestack-summary-section h4 {
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.75rem;
    }
    
    .thrivestack-summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }
    
    .thrivestack-summary-row span:first-child {
      color: #64748b;
    }
    
    .thrivestack-summary-row span:last-child {
      font-weight: 600;
      color: #0f172a;
    }
    
    .thrivestack-cta {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #cbd5e1;
    }
    
    .thrivestack-cta-button {
      background: #2563eb;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.75rem;
    }
    
    .thrivestack-cta-button:hover {
      background: #1d4ed8;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .thrivestack-cta-note {
      font-size: 0.875rem;
      color: #64748b;
    }
    
    .thrivestack-chevron {
      width: 1rem;
      height: 1rem;
      stroke: currentColor;
      stroke-width: 2;
      fill: none;
      transition: transform 0.2s;
    }
    
    .thrivestack-chevron.open {
      transform: rotate(180deg);
    }
    
    @media (max-width: 768px) {
      .thrivestack-plans {
        grid-template-columns: 1fr;
      }
      
      .thrivestack-mtu-display {
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .thrivestack-hero h1 {
        font-size: 2.5rem;
      }
      
      .thrivestack-price-display {
        font-size: 2rem;
      }
      
      .thrivestack-summary-price {
        font-size: 2rem;
      }
    }
  `;

  // ThriveStack Pricing Calculator Class
  class ThriveStackPricingCalculator {
    constructor(containerId) {
      this.containerId = containerId;
      this.currency = 'USD';
      this.isAnnual = false;
      this.selectedMTUIndex = 0;
      this.addOns = {
        abuseDetection: { enabled: false, additionalDetections: 0 },
        economicBuyer: { enabled: false },
        dataRetention: { enabled: false }
      };
      this.addOnsOpen = false;
      
      this.init();
    }

    init() {
      this.injectStyles();
      this.render();
      this.bindEvents();
    }

    injectStyles() {
      if (!document.getElementById('thrivestack-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'thrivestack-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
      }
    }

    render() {
      const container = document.getElementById(this.containerId);
      if (!container) return;

      const baseMonthlyPrice = 99;
      const discountedPrice = baseMonthlyPrice * 0.8;
      const displayPrice = this.isAnnual ? discountedPrice : baseMonthlyPrice;
      const monthlyPrice = formatCurrency(displayPrice, this.currency);

      const selectedMTU = MTU_BREAKPOINTS[this.selectedMTUIndex];
      const calculation = calculateMTUPricing(selectedMTU, this.isAnnual);
      const addOnTotal = calculateAddOnTotal(this.addOns);
      const totalMonthlyWithAddOns = calculation.monthlyTotal + addOnTotal;
      const totalAnnualWithAddOns = calculation.annualTotal + addOnTotal;
      const monthlyTotal = formatCurrency(this.isAnnual ? totalAnnualWithAddOns : totalMonthlyWithAddOns, this.currency);
      const perMTURate = formatCurrency(calculation.tier.pricePerMTU, this.currency);

      container.innerHTML = `
        <div class="thrivestack-pricing">
          <!-- Main Content -->
          <div class="thrivestack-container">
            <!-- Hero Section -->
            <div class="thrivestack-hero">
              <h1>Simple, Transparent Pricing</h1>
              <p>Scale your analytics without the complexity. Choose the plan that fits your growth stage.</p>
              
              <!-- Currency Selector -->
              <div class="thrivestack-currency-selector">
                <select class="thrivestack-currency-select" id="currency-select">
                  <option value="USD" ${this.currency === 'USD' ? 'selected' : ''}>USD ($)</option>
                  <option value="EUR" ${this.currency === 'EUR' ? 'selected' : ''}>EUR (€)</option>
                  <option value="GBP" ${this.currency === 'GBP' ? 'selected' : ''}>GBP (£)</option>
                  <option value="INR" ${this.currency === 'INR' ? 'selected' : ''}>INR (₹)</option>
                </select>
              </div>
            </div>

            <!-- Billing Toggle -->
            <div class="thrivestack-billing-toggle">
              <span class="${!this.isAnnual ? 'font-weight: 600; color: #0f172a;' : 'color: #64748b;'}" style="font-size: 0.875rem;">Monthly</span>
              <div class="thrivestack-switch ${this.isAnnual ? 'active' : ''}" id="billing-switch">
                <div class="thrivestack-switch-thumb"></div>
              </div>
              <span class="${this.isAnnual ? 'font-weight: 600; color: #0f172a;' : 'color: #64748b;'}" style="font-size: 0.875rem;">Pay Annually</span>
              <span class="thrivestack-badge">Save 20%</span>
            </div>

            <!-- Pricing Plans -->
            <div class="thrivestack-plans">
              <!-- Grow Plan -->
              <div class="thrivestack-card featured">
                <div class="thrivestack-card-badge">14-Day Free Trial</div>
                
                <div class="thrivestack-card-header">
                  <div class="thrivestack-card-title">Grow Plan</div>
                  <div class="thrivestack-price">
                    Starts at ${monthlyPrice}
                    <span class="thrivestack-price-period">/month</span>
                  </div>
                  <div class="thrivestack-price-note">
                    ${this.isAnnual ? 'Billed annually' : 'Monthly billing'} • ${!this.isAnnual ? 'Save 20% annually' : ''}
                  </div>
                </div>

                <div class="thrivestack-features">
                  <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
                    <div style="font-size: 0.875rem; color: #64748b;">
                      Includes 1,500 MTUs • 
                      <button id="scroll-to-calculator" style="color: #2563eb; text-decoration: underline; background: none; border: none; cursor: pointer;">
                        Calculate your price by MTU count
                      </button>
                    </div>
                  </div>

                  <h4>Includes:</h4>
                  <ul>
                    ${[
                      'Track up to 300,000 MTUs',
                      'Account-Level Insights',
                      'Full Journey Tracking',
                      'Growth Leak Detection',
                      'Analytics Consolidation',
                      'Efficient Event Collection',
                      'Guided Setup for Results',
                      'Transparent Pricing'
                    ].map(feature => `
                      <li>
                        <svg class="thrivestack-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        <span style="font-size: 0.875rem; color: #374151;">${feature}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <button class="thrivestack-button" onclick="window.open('https://app.thrivestack.ai/auth/customer-analytics/sign-up', '_blank')" style="width: 100%; padding: 0.875rem; font-size: 1.125rem;">
                  Start Trial
                </button>
              </div>

              <!-- Enterprise Plan -->
              <div class="thrivestack-card">
                <div class="thrivestack-card-header">
                  <div class="thrivestack-card-title">Enterprise Plan</div>
                  <div class="thrivestack-price">
                    Custom
                  </div>
                  <div class="thrivestack-price-note">Tailored to your needs</div>
                </div>

                <div class="thrivestack-features">
                  <div style="text-align: center; padding-bottom: 1rem; border-bottom: 1px solid #e2e8f0; margin-bottom: 1rem;">
                    <div style="font-size: 0.875rem; color: #64748b;">Contact us for custom pricing</div>
                  </div>

                  <h4>Includes:</h4>
                  <ul>
                    ${[
                      'Everything in Grow',
                      'Custom SLAs',
                      'Tailored onboarding',
                      'Custom integrations',
                      'Dedicated support team',
                      'Advanced security features',
                      'Custom reporting',
                      'Priority feature requests'
                    ].map(feature => `
                      <li>
                        <svg class="thrivestack-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        <span style="font-size: 0.875rem; color: #374151;">${feature}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>

                <button class="thrivestack-button secondary" style="width: 100%; padding: 0.875rem; font-size: 1.125rem;">
                  Schedule a call
                </button>
              </div>
            </div>

            <!-- MTU Calculator -->
            <div id="mtu-calculator" class="thrivestack-calculator">
              <div class="thrivestack-card">
                <div class="thrivestack-calculator-header">
                  <div class="thrivestack-calculator-title">MTU-Based Pricing Calculator</div>
                  <p style="color: #64748b; margin: 0;">Calculate your exact pricing based on Monthly Tracked Users (MTU)</p>
                </div>

                <!-- MTU Display -->
                <div class="thrivestack-mtu-display">
                  <div>
                    <div class="thrivestack-mtu-count">${formatMTU(selectedMTU)}</div>
                    <div class="thrivestack-mtu-label">MTUs</div>
                  </div>
                  
                  <div style="flex: 1; text-align: center;">
                    <div class="thrivestack-price-display">${monthlyTotal}</div>
                    <div class="thrivestack-price-label">Monthly Price</div>
                  </div>

                  <div style="text-align: right;">
                    <div class="thrivestack-per-mtu">${perMTURate} per MTU</div>
                  </div>
                </div>

                <!-- MTU Slider -->
                <div class="thrivestack-slider-container">
                  <input 
                    type="range" 
                    id="mtu-slider" 
                    class="thrivestack-slider"
                    min="0" 
                    max="${MTU_BREAKPOINTS.length - 1}" 
                    value="${this.selectedMTUIndex}" 
                    step="1"
                  />
                  
                  <div class="thrivestack-slider-markers">
                    ${MTU_BREAKPOINTS.map((mtu, index) => `
                      <div class="thrivestack-slider-marker" ${index % 2 !== 0 ? 'style="visibility: hidden;"' : ''}>
                        ${formatMTU(mtu)}
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

              <!-- Add-ons Calculator -->
              <div class="thrivestack-addons">
                <div class="thrivestack-addons-header" id="addons-toggle">
                  <div style="flex: 1;">
                    <h3 class="thrivestack-addons-title">Add-ons Calculator</h3>
                    <p class="thrivestack-addons-subtitle">Select the add-ons you need for your plan</p>
                  </div>
                  <svg class="thrivestack-chevron ${this.addOnsOpen ? 'open' : ''}" viewBox="0 0 24 24">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
                
                <div class="thrivestack-addons-content ${this.addOnsOpen ? 'open' : ''}" id="addons-content">
                  ${Object.entries(ADD_ONS).map(([key, addon]) => {
                    const enabled = this.addOns[key].enabled;
                    const additionalCost = key === 'abuseDetection' && enabled ? 
                      this.addOns.abuseDetection.additionalDetections * addon.pricePerAdditionalDetection : 0;
                    
                    return `
                      <div class="thrivestack-addon-item">
                        <div class="thrivestack-addon-header">
                          <input 
                            type="checkbox" 
                            class="thrivestack-checkbox" 
                            id="addon-${key}"
                            ${enabled ? 'checked' : ''}
                          />
                          <div class="thrivestack-addon-details">
                            <div class="thrivestack-addon-title">
                              <label for="addon-${key}" class="thrivestack-addon-name">${addon.name}</label>
                              <div class="thrivestack-addon-price">
                                ${formatCurrency(addon.basePrice, this.currency)}/mo
                                ${additionalCost > 0 ? ` + ${formatCurrency(additionalCost, this.currency)}` : ''}
                              </div>
                            </div>
                            <p class="thrivestack-addon-description">
                              ${addon.description}
                              ${key === 'abuseDetection' ? `<br><small>Includes ${addon.includedDetections.toLocaleString()} detections</small>` : ''}
                            </p>
                          </div>
                        </div>
                        
                        ${key === 'abuseDetection' && enabled ? `
                          <div class="thrivestack-addon-extra">
                            <label style="font-size: 0.875rem; color: #374151; margin-bottom: 0.5rem; display: block;">
                              Additional detections needed (beyond ${addon.includedDetections.toLocaleString()})
                            </label>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                              <input 
                                type="number" 
                                class="thrivestack-addon-input" 
                                id="additional-detections"
                                min="0" 
                                value="${this.addOns.abuseDetection.additionalDetections}"
                                placeholder="0"
                              />
                              <span style="font-size: 0.875rem; color: #64748b;">
                                × ${formatCurrency(addon.pricePerAdditionalDetection, this.currency)} each
                              </span>
                            </div>
                            ${this.addOns.abuseDetection.additionalDetections > 0 ? `
                              <p style="font-size: 0.75rem; color: #64748b; margin-top: 0.5rem;">
                                Additional cost: ${formatCurrency(additionalCost, this.currency)}/mo
                              </p>
                            ` : ''}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                  
                  ${addOnTotal > 0 ? `
                    <div class="thrivestack-addons-total">
                      <span style="font-size: 1.125rem; font-weight: 600; color: #0f172a;">Total Add-ons Cost:</span>
                      <span style="font-size: 1.125rem; font-weight: 700; color: #2563eb;">${formatCurrency(addOnTotal, this.currency)}/mo</span>
                    </div>
                  ` : ''}
                </div>
              </div>

              <!-- Summary -->
              <div class="thrivestack-summary">
                <div class="thrivestack-summary-title">Your Total Price</div>
                <div class="thrivestack-summary-price">${monthlyTotal}</div>
                <div class="thrivestack-summary-period">
                  ${this.isAnnual ? 'per month (billed annually)' : 'per month'}
                  ${this.isAnnual && addOnTotal > 0 ? `<br><span style="color: #22c55e;">Save ${formatCurrency(calculation.annualSavings + (addOnTotal * 12 * 0.2), this.currency)} annually (20% discount applied)</span>` : ''}
                </div>

                <div class="thrivestack-summary-details">
                  <div class="thrivestack-summary-section">
                    <h4>Base Pricing</h4>
                    <div class="thrivestack-summary-row">
                      <span>MTU Count:</span>
                      <span>${formatMTU(selectedMTU)}</span>
                    </div>
                    <div class="thrivestack-summary-row">
                      <span>Rate per MTU:</span>
                      <span>${perMTURate}</span>
                    </div>
                    <div class="thrivestack-summary-row">
                      <span>Base Price:</span>
                      <span>${formatCurrency(calculation.monthlyTotal, this.currency)}/mo</span>
                    </div>
                  </div>

                  <div class="thrivestack-summary-section">
                    <h4>Summary</h4>
                    ${addOnTotal > 0 ? `
                      <div class="thrivestack-summary-row">
                        <span>Add-ons:</span>
                        <span>${formatCurrency(addOnTotal, this.currency)}/mo</span>
                      </div>
                    ` : ''}
                    <div class="thrivestack-summary-row">
                      <span>Billing:</span>
                      <span>${this.isAnnual ? 'Annual (-20%)' : 'Monthly'}</span>
                    </div>
                    ${calculation.tier.discount ? `
                      <div class="thrivestack-summary-row" style="color: #22c55e;">
                        <span>Tier Discount:</span>
                        <span>${calculation.tier.discount}%</span>
                      </div>
                    ` : ''}
                  </div>
                </div>

                <div class="thrivestack-cta">
                  <button 
                    class="thrivestack-cta-button"
                    onclick="window.open('https://app.thrivestack.ai/auth/customer-analytics/sign-up', '_blank')"
                  >
                    Start Your 14-Day Free Trial
                  </button>
                  <div class="thrivestack-cta-note">
                    No credit card required • Full access to all features
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      // Currency selector
      const currencySelect = document.getElementById('currency-select');
      if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
          this.currency = e.target.value;
          this.render();
          this.bindEvents();
        });
      }

      // Billing switch
      const billingSwitch = document.getElementById('billing-switch');
      if (billingSwitch) {
        billingSwitch.addEventListener('click', () => {
          this.isAnnual = !this.isAnnual;
          this.render();
          this.bindEvents();
        });
      }

      // MTU slider
      const mtuSlider = document.getElementById('mtu-slider');
      if (mtuSlider) {
        mtuSlider.addEventListener('input', (e) => {
          this.selectedMTUIndex = parseInt(e.target.value);
          this.render();
          this.bindEvents();
        });
      }

      // Add-ons toggle
      const addonsToggle = document.getElementById('addons-toggle');
      if (addonsToggle) {
        addonsToggle.addEventListener('click', () => {
          this.addOnsOpen = !this.addOnsOpen;
          this.render();
          this.bindEvents();
        });
      }

      // Add-on checkboxes
      Object.keys(ADD_ONS).forEach(key => {
        const checkbox = document.getElementById(`addon-${key}`);
        if (checkbox) {
          checkbox.addEventListener('change', (e) => {
            this.addOns[key].enabled = e.target.checked;
            if (!e.target.checked && key === 'abuseDetection') {
              this.addOns.abuseDetection.additionalDetections = 0;
            }
            this.render();
            this.bindEvents();
          });
        }
      });

      // Additional detections input
      const additionalDetectionsInput = document.getElementById('additional-detections');
      if (additionalDetectionsInput) {
        additionalDetectionsInput.addEventListener('input', (e) => {
          const value = parseInt(e.target.value) || 0;
          this.addOns.abuseDetection.additionalDetections = Math.max(0, value);
          this.render();
          this.bindEvents();
        });
      }

      // Scroll to calculator
      const scrollButton = document.getElementById('scroll-to-calculator');
      if (scrollButton) {
        scrollButton.addEventListener('click', () => {
          const calculator = document.getElementById('mtu-calculator');
          if (calculator) {
            calculator.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  }

  // Auto-initialize if container exists
  function initializeThriveStack() {
    const containers = [
      'thrivestack-pricing-calculator',
      'thrivestack-pricing',
      'pricing-calculator'
    ];
    
    for (const containerId of containers) {
      const container = document.getElementById(containerId);
      if (container) {
        new ThriveStackPricingCalculator(containerId);
        break;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThriveStack);
  } else {
    initializeThriveStack();
  }

  // Expose globally for manual initialization
  window.ThriveStackPricingCalculator = ThriveStackPricingCalculator;
})();
