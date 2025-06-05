
(function() {
  'use strict';

  // Currency utilities
  const currencyConfigs = {
    USD: { symbol: '$', rate: 1, format: (amount) => `$${amount.toFixed(2)}` },
    EUR: { symbol: '€', rate: 0.85, format: (amount) => `€${amount.toFixed(2)}` },
    GBP: { symbol: '£', rate: 0.73, format: (amount) => `£${amount.toFixed(2)}` },
    INR: { symbol: '₹', rate: 83.12, format: (amount) => `₹${amount.toFixed(0)}` }
  };

  const formatCurrency = (amount, currency) => {
    const config = currencyConfigs[currency];
    const convertedAmount = amount * config.rate;
    return config.format(convertedAmount);
  };

  // MTU Pricing utilities
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

  const findTierForMTU = (mtuCount) => {
    return MTU_TIERS.find(tier => mtuCount >= tier.min && mtuCount <= tier.max) || MTU_TIERS[0];
  };

  const calculateMTUPricing = (mtuCount, isAnnual = false) => {
    const tier = findTierForMTU(mtuCount);
    const monthlyTotal = mtuCount * tier.pricePerMTU;
    const annualTotal = monthlyTotal * (isAnnual ? 0.8 : 1);
    const annualSavings = monthlyTotal * 12 * 0.2;

    return {
      mtuCount,
      tier,
      monthlyTotal,
      annualTotal,
      annualSavings
    };
  };

  // CSS Styles
  const styles = `
    .thrivestack-pricing {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
      border-radius: 1rem;
    }
    
    .thrivestack-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .thrivestack-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .thrivestack-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      margin-bottom: 2rem;
    }
    
    .thrivestack-calculator {
      background: white;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }
    
    .thrivestack-controls {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .thrivestack-control-group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .thrivestack-currency-select,
    .thrivestack-billing-toggle {
      padding: 0.5rem 1rem;
      border: 2px solid #e2e8f0;
      border-radius: 0.5rem;
      background: white;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .thrivestack-currency-select:hover,
    .thrivestack-billing-toggle:hover {
      border-color: #3b82f6;
    }
    
    .thrivestack-billing-toggle.active {
      background: #3b82f6;
      color: white;
      border-color: #3b82f6;
    }
    
    .thrivestack-results {
      text-align: center;
      margin: 2rem 0;
    }
    
    .thrivestack-mtu-display {
      font-size: 2rem;
      font-weight: bold;
      color: #3b82f6;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-price-display {
      font-size: 3rem;
      font-weight: bold;
      color: #1e293b;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-rate-display {
      font-size: 1.1rem;
      color: #64748b;
    }
    
    .thrivestack-slider-container {
      margin: 2rem 0;
    }
    
    .thrivestack-slider {
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: #e2e8f0;
      outline: none;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    
    .thrivestack-slider::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #3b82f6;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .thrivestack-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #3b82f6;
      cursor: pointer;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .thrivestack-markers {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #64748b;
      padding: 0 10px;
    }
    
    .thrivestack-marker {
      text-align: center;
    }
    
    .thrivestack-summary {
      background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
      border: 2px solid #3b82f6;
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
    }
    
    .thrivestack-summary-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .thrivestack-summary-price {
      font-size: 3rem;
      font-weight: bold;
      color: #3b82f6;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-summary-period {
      font-size: 1.1rem;
      color: #64748b;
      margin-bottom: 1rem;
    }
    
    .thrivestack-savings {
      font-size: 1.1rem;
      color: #059669;
      margin-bottom: 2rem;
    }
    
    .thrivestack-cta {
      background: #3b82f6;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    
    .thrivestack-cta:hover {
      background: #2563eb;
    }
    
    .thrivestack-cta-subtitle {
      font-size: 0.9rem;
      color: #64748b;
      margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
      .thrivestack-pricing {
        padding: 1rem;
      }
      
      .thrivestack-title {
        font-size: 2rem;
      }
      
      .thrivestack-price-display {
        font-size: 2rem;
      }
      
      .thrivestack-summary-price {
        font-size: 2rem;
      }
    }
  `;

  // Main Calculator Component
  class ThriveStackPricingCalculator {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) {
        console.error(`Container with id "${containerId}" not found`);
        return;
      }

      this.state = {
        selectedCurrency: 'USD',
        isAnnual: false,
        selectedMTUIndex: 0,
        addOnTotal: 0
      };

      this.init();
    }

    init() {
      this.injectStyles();
      this.render();
      this.bindEvents();
    }

    injectStyles() {
      if (!document.getElementById('thrivestack-pricing-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'thrivestack-pricing-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
      }
    }

    formatMTU(mtu) {
      return mtu >= 1000 ? `${mtu / 1000}K` : mtu.toString();
    }

    calculateResults() {
      const selectedMTU = MTU_BREAKPOINTS[this.state.selectedMTUIndex];
      const calculation = calculateMTUPricing(selectedMTU, this.state.isAnnual);
      
      const baseTotal = this.state.isAnnual ? calculation.annualTotal : calculation.monthlyTotal;
      const totalWithAddOns = baseTotal + this.state.addOnTotal;
      
      return {
        ...calculation,
        selectedMTU,
        totalWithAddOns,
        displayPrice: formatCurrency(totalWithAddOns, this.state.selectedCurrency),
        perMTURate: formatCurrency(calculation.tier.pricePerMTU, this.state.selectedCurrency),
        savings: this.state.isAnnual ? formatCurrency(calculation.annualSavings, this.state.selectedCurrency) : null
      };
    }

    render() {
      const results = this.calculateResults();
      
      this.container.innerHTML = `
        <div class="thrivestack-pricing">
          <div class="thrivestack-header">
            <h1 class="thrivestack-title">ThriveStack Pricing Calculator</h1>
            <p class="thrivestack-subtitle">Calculate your exact pricing based on Monthly Tracked Users (MTU)</p>
          </div>
          
          <div class="thrivestack-calculator">
            <div class="thrivestack-controls">
              <div class="thrivestack-control-group">
                <label for="currency-select">Currency:</label>
                <select id="currency-select" class="thrivestack-currency-select">
                  ${Object.keys(currencyConfigs).map(currency => 
                    `<option value="${currency}" ${currency === this.state.selectedCurrency ? 'selected' : ''}>${currency}</option>`
                  ).join('')}
                </select>
              </div>
              
              <div class="thrivestack-control-group">
                <button id="monthly-toggle" class="thrivestack-billing-toggle ${!this.state.isAnnual ? 'active' : ''}">Monthly</button>
                <button id="annual-toggle" class="thrivestack-billing-toggle ${this.state.isAnnual ? 'active' : ''}">Annual (Save 20%)</button>
              </div>
            </div>
            
            <div class="thrivestack-results">
              <div class="thrivestack-mtu-display">${this.formatMTU(results.selectedMTU)} MTUs</div>
              <div class="thrivestack-price-display">${results.displayPrice}</div>
              <div class="thrivestack-rate-display">${results.perMTURate} per MTU</div>
            </div>
            
            <div class="thrivestack-slider-container">
              <input 
                type="range" 
                id="mtu-slider" 
                class="thrivestack-slider"
                min="0" 
                max="${MTU_BREAKPOINTS.length - 1}" 
                value="${this.state.selectedMTUIndex}"
                step="1"
              />
              <div class="thrivestack-markers">
                ${MTU_BREAKPOINTS.map((mtu, index) => 
                  index % 2 === 0 ? `<div class="thrivestack-marker">${this.formatMTU(mtu)}</div>` : '<div class="thrivestack-marker"></div>'
                ).join('')}
              </div>
            </div>
          </div>
          
          <div class="thrivestack-summary">
            <h3 class="thrivestack-summary-title">Your Total Price</h3>
            <div class="thrivestack-summary-price">${results.displayPrice}</div>
            <div class="thrivestack-summary-period">${this.state.isAnnual ? 'per month (billed annually)' : 'per month'}</div>
            ${results.savings ? `<div class="thrivestack-savings">Save ${results.savings} annually</div>` : ''}
            <a href="https://app.thrivestack.ai/auth/customer-analytics/sign-up" target="_blank" class="thrivestack-cta">
              Start Your 14-Day Free Trial
            </a>
            <div class="thrivestack-cta-subtitle">No credit card required • Full access to all features</div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      const currencySelect = this.container.querySelector('#currency-select');
      const monthlyToggle = this.container.querySelector('#monthly-toggle');
      const annualToggle = this.container.querySelector('#annual-toggle');
      const mtuSlider = this.container.querySelector('#mtu-slider');

      if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
          this.state.selectedCurrency = e.target.value;
          this.render();
          this.bindEvents();
        });
      }

      if (monthlyToggle) {
        monthlyToggle.addEventListener('click', () => {
          this.state.isAnnual = false;
          this.render();
          this.bindEvents();
        });
      }

      if (annualToggle) {
        annualToggle.addEventListener('click', () => {
          this.state.isAnnual = true;
          this.render();
          this.bindEvents();
        });
      }

      if (mtuSlider) {
        mtuSlider.addEventListener('input', (e) => {
          this.state.selectedMTUIndex = parseInt(e.target.value);
          this.render();
          this.bindEvents();
        });
      }
    }
  }

  // Auto-initialize if container exists
  window.ThriveStackPricingCalculator = ThriveStackPricingCalculator;
  
  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('thrivestack-pricing-calculator');
      if (container) {
        new ThriveStackPricingCalculator('thrivestack-pricing-calculator');
      }
    });
  } else {
    const container = document.getElementById('thrivestack-pricing-calculator');
    if (container) {
      new ThriveStackPricingCalculator('thrivestack-pricing-calculator');
    }
  }
})();
