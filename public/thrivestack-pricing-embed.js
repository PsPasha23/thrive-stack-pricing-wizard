
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

  // CSS Styles - Updated to match the original project exactly
  const styles = `
    .thrivestack-pricing {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      background: transparent;
    }
    
    .thrivestack-calculator-container {
      max-width: 64rem;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .thrivestack-calculator {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 1.5rem;
    }
    
    .thrivestack-header {
      text-align: center;
      padding: 2rem 2rem 0 2rem;
    }
    
    .thrivestack-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    
    .thrivestack-subtitle {
      color: #64748b;
      margin-bottom: 0;
    }
    
    .thrivestack-content {
      padding: 2rem;
      padding-top: 0;
    }
    
    .thrivestack-controls {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .thrivestack-currency-container {
      display: flex;
      justify-content: center;
    }
    
    .thrivestack-currency-select {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: white;
      font-size: 0.875rem;
      cursor: pointer;
      outline: none;
      transition: border-color 0.2s;
    }
    
    .thrivestack-currency-select:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .thrivestack-billing-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }
    
    .thrivestack-billing-label {
      font-size: 0.875rem;
      color: #64748b;
    }
    
    .thrivestack-billing-label.active {
      font-weight: 600;
      color: #0f172a;
    }
    
    .thrivestack-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }
    
    .thrivestack-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .thrivestack-switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #d1d5db;
      transition: 0.2s;
      border-radius: 24px;
    }
    
    .thrivestack-switch-slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: 0.2s;
      border-radius: 50%;
    }
    
    .thrivestack-switch input:checked + .thrivestack-switch-slider {
      background-color: #3b82f6;
    }
    
    .thrivestack-switch input:checked + .thrivestack-switch-slider:before {
      transform: translateX(20px);
    }
    
    .thrivestack-badge {
      background: #dcfce7;
      color: #166534;
      padding: 0.25rem 0.5rem;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      margin-left: 0.5rem;
    }
    
    .thrivestack-results {
      text-align: center;
      margin: 2rem 0;
    }
    
    .thrivestack-results-grid {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      margin-bottom: 1rem;
    }
    
    .thrivestack-mtu-section {
      text-align: center;
    }
    
    .thrivestack-mtu-display {
      font-size: 2.25rem;
      font-weight: bold;
      color: #3b82f6;
      margin-bottom: 0.25rem;
    }
    
    .thrivestack-mtu-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .thrivestack-price-section {
      text-align: center;
      flex: 1;
    }
    
    .thrivestack-price-display {
      font-size: 3rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }
    
    .thrivestack-price-label {
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .thrivestack-rate-section {
      text-align: right;
    }
    
    .thrivestack-rate-display {
      font-size: 1.125rem;
      color: #64748b;
    }
    
    .thrivestack-slider-container {
      margin: 2rem 0;
      padding: 0 1rem;
    }
    
    .thrivestack-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #e2e8f0;
      outline: none;
      cursor: pointer;
      margin-bottom: 1rem;
      appearance: none;
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
      position: relative;
    }
    
    .thrivestack-marker::before {
      content: '';
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 1px;
      height: 0.5rem;
      background-color: #cbd5e1;
    }
    
    .thrivestack-addons {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #dbeafe;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }
    
    .thrivestack-addons-header {
      padding: 1.5rem 1.5rem 0 1.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .thrivestack-addons-header:hover {
      background-color: #f9fafb;
    }
    
    .thrivestack-addons-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-addons-title {
      font-size: 1.125rem;
      color: #0f172a;
      font-weight: 600;
    }
    
    .thrivestack-chevron {
      width: 1rem;
      height: 1rem;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      transition: transform 0.2s;
    }
    
    .thrivestack-chevron.open {
      transform: rotate(180deg);
    }
    
    .thrivestack-addons-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      text-align: left;
      margin: 0;
      padding-bottom: 1.5rem;
    }
    
    .thrivestack-addons-content {
      padding: 0 1.5rem 1.5rem 1.5rem;
      border-top: 1px solid #f1f5f9;
    }
    
    .thrivestack-addon-item {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .thrivestack-addon-item:last-child {
      margin-bottom: 0;
    }
    
    .thrivestack-addon-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }
    
    .thrivestack-checkbox {
      width: 1rem;
      height: 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.25rem;
      cursor: pointer;
      position: relative;
      margin-top: 0.125rem;
    }
    
    .thrivestack-checkbox.checked {
      background-color: #3b82f6;
      border-color: #3b82f6;
    }
    
    .thrivestack-checkbox.checked::after {
      content: '';
      position: absolute;
      left: 3px;
      top: 1px;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    
    .thrivestack-addon-content {
      flex: 1;
    }
    
    .thrivestack-addon-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
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
      margin-left: 1.75rem;
      margin-top: 0.75rem;
    }
    
    .thrivestack-addon-extra-label {
      font-size: 0.875rem;
      color: #374151;
      margin-bottom: 0.5rem;
      display: block;
    }
    
    .thrivestack-addon-extra-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .thrivestack-addon-input {
      width: 8rem;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      outline: none;
    }
    
    .thrivestack-addon-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .thrivestack-addon-extra-text {
      font-size: 0.875rem;
      color: #64748b;
    }
    
    .thrivestack-addon-extra-cost {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.5rem;
    }
    
    .thrivestack-addons-total {
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .thrivestack-addons-total-label {
      font-size: 1.125rem;
      font-weight: 600;
      color: #0f172a;
    }
    
    .thrivestack-addons-total-amount {
      font-size: 1.125rem;
      font-weight: bold;
      color: #3b82f6;
    }
    
    .thrivestack-summary {
      background: white;
      border-radius: 0.5rem;
      border: 2px solid #dbeafe;
      background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
      max-width: 64rem;
      margin: 0 auto;
    }
    
    .thrivestack-summary-content {
      padding: 2rem;
    }
    
    .thrivestack-summary-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .thrivestack-summary-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-summary-price {
      font-size: 3rem;
      font-weight: bold;
      color: #3b82f6;
      margin-bottom: 0.5rem;
    }
    
    .thrivestack-summary-period {
      font-size: 1.125rem;
      color: #64748b;
    }
    
    .thrivestack-savings {
      font-size: 1.125rem;
      color: #059669;
      margin-top: 0.5rem;
    }
    
    .thrivestack-summary-details {
      border-top: 1px solid #e2e8f0;
      padding-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .thrivestack-details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      text-align: left;
    }
    
    .thrivestack-details-section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    
    .thrivestack-details-title {
      font-weight: 600;
      color: #0f172a;
    }
    
    .thrivestack-details-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .thrivestack-details-row {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
    }
    
    .thrivestack-details-label {
      color: #64748b;
    }
    
    .thrivestack-details-value {
      font-weight: 600;
    }
    
    .thrivestack-details-discount {
      color: #059669;
    }
    
    .thrivestack-summary-cta {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #e2e8f0;
    }
    
    .thrivestack-cta {
      background: #3b82f6;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      text-decoration: none;
      display: inline-block;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .thrivestack-cta:hover {
      background: #2563eb;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    
    .thrivestack-cta-subtitle {
      font-size: 0.875rem;
      color: #64748b;
      margin-top: 0.75rem;
    }
    
    @media (max-width: 768px) {
      .thrivestack-calculator-container {
        padding: 0 0.5rem;
      }
      
      .thrivestack-header,
      .thrivestack-content {
        padding: 1rem;
      }
      
      .thrivestack-title {
        font-size: 1.5rem;
      }
      
      .thrivestack-results-grid {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .thrivestack-rate-section {
        text-align: center;
      }
      
      .thrivestack-price-display {
        font-size: 2rem;
      }
      
      .thrivestack-summary-price {
        font-size: 2rem;
      }
      
      .thrivestack-details-grid {
        grid-template-columns: 1fr;
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
        addOnsOpen: false,
        addOns: {
          abuseDetection: false,
          economicBuyer: false,
          dataRetention: false
        },
        additionalDetections: 0
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

    calculateAddOnsTotal() {
      let total = 0;
      
      if (this.state.addOns.abuseDetection) {
        total += 25 + (this.state.additionalDetections * 0.02);
      }
      
      if (this.state.addOns.economicBuyer) {
        total += 25;
      }
      
      if (this.state.addOns.dataRetention) {
        total += 25;
      }
      
      return total;
    }

    calculateResults() {
      const selectedMTU = MTU_BREAKPOINTS[this.state.selectedMTUIndex];
      const calculation = calculateMTUPricing(selectedMTU, this.state.isAnnual);
      const addOnTotal = this.calculateAddOnsTotal();
      
      const baseTotal = this.state.isAnnual ? calculation.annualTotal : calculation.monthlyTotal;
      const totalWithAddOns = baseTotal + addOnTotal;
      
      return {
        ...calculation,
        selectedMTU,
        addOnTotal,
        totalWithAddOns,
        displayPrice: formatCurrency(totalWithAddOns, this.state.selectedCurrency),
        perMTURate: formatCurrency(calculation.tier.pricePerMTU, this.state.selectedCurrency),
        savings: this.state.isAnnual ? formatCurrency(calculation.annualSavings + (addOnTotal * 12 * 0.2), this.state.selectedCurrency) : null,
        basePrice: formatCurrency(calculation.monthlyTotal, this.state.selectedCurrency)
      };
    }

    render() {
      const results = this.calculateResults();
      
      this.container.innerHTML = `
        <div class="thrivestack-pricing">
          <div class="thrivestack-calculator-container">
            <div class="thrivestack-calculator">
              <div class="thrivestack-header">
                <h1 class="thrivestack-title">MTU-Based Pricing Calculator</h1>
                <p class="thrivestack-subtitle">Calculate your exact pricing based on Monthly Tracked Users (MTU)</p>
              </div>

              <div class="thrivestack-content">
                <div class="thrivestack-controls">
                  <div class="thrivestack-currency-container">
                    <select id="currency-select" class="thrivestack-currency-select">
                      ${Object.keys(currencyConfigs).map(currency => 
                        `<option value="${currency}" ${currency === this.state.selectedCurrency ? 'selected' : ''}>${currency}</option>`
                      ).join('')}
                    </select>
                  </div>
                  
                  <div class="thrivestack-billing-container">
                    <span class="thrivestack-billing-label ${!this.state.isAnnual ? 'active' : ''}">Monthly</span>
                    <div class="thrivestack-switch">
                      <input type="checkbox" id="billing-switch" ${this.state.isAnnual ? 'checked' : ''}>
                      <span class="thrivestack-switch-slider"></span>
                    </div>
                    <span class="thrivestack-billing-label ${this.state.isAnnual ? 'active' : ''}">Pay Annually</span>
                    <span class="thrivestack-badge">Save 20%</span>
                  </div>
                </div>

                <div class="thrivestack-results">
                  <div class="thrivestack-results-grid">
                    <div class="thrivestack-mtu-section">
                      <div class="thrivestack-mtu-display">${this.formatMTU(results.selectedMTU)}</div>
                      <div class="thrivestack-mtu-label">MTUs</div>
                    </div>
                    
                    <div class="thrivestack-price-section">
                      <div class="thrivestack-price-display">${results.displayPrice}</div>
                      <div class="thrivestack-price-label">Monthly Price</div>
                    </div>

                    <div class="thrivestack-rate-section">
                      <div class="thrivestack-rate-display">${results.perMTURate} per MTU</div>
                    </div>
                  </div>
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
                      `<div class="thrivestack-marker">${index % 2 === 0 ? this.formatMTU(mtu) : ''}</div>`
                    ).join('')}
                  </div>
                </div>
              </div>
            </div>

            <div class="thrivestack-addons">
              <div class="thrivestack-addons-header" id="addons-toggle">
                <div class="thrivestack-addons-title-row">
                  <h3 class="thrivestack-addons-title">Add-ons Calculator</h3>
                  <svg class="thrivestack-chevron ${this.state.addOnsOpen ? 'open' : ''}" viewBox="0 0 24 24">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
                <p class="thrivestack-addons-subtitle">Select the add-ons you need for your plan</p>
              </div>
              
              ${this.state.addOnsOpen ? `
                <div class="thrivestack-addons-content">
                  <div class="thrivestack-addon-item">
                    <div class="thrivestack-addon-row">
                      <div class="thrivestack-checkbox ${this.state.addOns.abuseDetection ? 'checked' : ''}" id="abuse-detection-checkbox"></div>
                      <div class="thrivestack-addon-content">
                        <div class="thrivestack-addon-header">
                          <label class="thrivestack-addon-name" for="abuse-detection-checkbox">Abuse Detection</label>
                          <div class="thrivestack-addon-price">
                            ${formatCurrency(25, this.state.selectedCurrency)}/mo
                            ${this.state.addOns.abuseDetection && this.state.additionalDetections > 0 ? 
                              ` + ${formatCurrency(this.state.additionalDetections * 0.02, this.state.selectedCurrency)}` : ''}
                          </div>
                        </div>
                        <p class="thrivestack-addon-description">Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.</p>
                        <p class="thrivestack-addon-description">Includes 500 detections</p>
                      </div>
                    </div>
                    ${this.state.addOns.abuseDetection ? `
                      <div class="thrivestack-addon-extra">
                        <label class="thrivestack-addon-extra-label">Additional detections needed (beyond 500)</label>
                        <div class="thrivestack-addon-extra-row">
                          <input type="number" class="thrivestack-addon-input" id="additional-detections" 
                                 min="0" value="${this.state.additionalDetections}" placeholder="0">
                          <span class="thrivestack-addon-extra-text">× ${formatCurrency(0.02, this.state.selectedCurrency)} each</span>
                        </div>
                        ${this.state.additionalDetections > 0 ? `
                          <p class="thrivestack-addon-extra-cost">Additional cost: ${formatCurrency(this.state.additionalDetections * 0.02, this.state.selectedCurrency)}/mo</p>
                        ` : ''}
                      </div>
                    ` : ''}
                  </div>

                  <div class="thrivestack-addon-item">
                    <div class="thrivestack-addon-row">
                      <div class="thrivestack-checkbox ${this.state.addOns.economicBuyer ? 'checked' : ''}" id="economic-buyer-checkbox"></div>
                      <div class="thrivestack-addon-content">
                        <div class="thrivestack-addon-header">
                          <label class="thrivestack-addon-name" for="economic-buyer-checkbox">Economic Buyer</label>
                          <div class="thrivestack-addon-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</div>
                        </div>
                        <p class="thrivestack-addon-description">Automatically identify up to 500 key decision-makers in an organization with the authority to approve expenditures and make financial decisions.</p>
                      </div>
                    </div>
                  </div>

                  <div class="thrivestack-addon-item">
                    <div class="thrivestack-addon-row">
                      <div class="thrivestack-checkbox ${this.state.addOns.dataRetention ? 'checked' : ''}" id="data-retention-checkbox"></div>
                      <div class="thrivestack-addon-content">
                        <div class="thrivestack-addon-header">
                          <label class="thrivestack-addon-name" for="data-retention-checkbox">Data Retention</label>
                          <div class="thrivestack-addon-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</div>
                        </div>
                        <p class="thrivestack-addon-description">Access and analyze your data for up to one year with our extended retention add-on. Perfect for compliance and long-term analysis.</p>
                      </div>
                    </div>
                  </div>

                  ${results.addOnTotal > 0 ? `
                    <div class="thrivestack-addons-total">
                      <span class="thrivestack-addons-total-label">Total Add-ons Cost:</span>
                      <span class="thrivestack-addons-total-amount">${formatCurrency(results.addOnTotal, this.state.selectedCurrency)}/mo</span>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>

            <div class="thrivestack-summary">
              <div class="thrivestack-summary-content">
                <div class="thrivestack-summary-header">
                  <h3 class="thrivestack-summary-title">Your Total Price</h3>
                  <div class="thrivestack-summary-price">${results.displayPrice}</div>
                  <div class="thrivestack-summary-period">${this.state.isAnnual ? 'per month (billed annually)' : 'per month'}</div>
                  ${results.savings ? `<div class="thrivestack-savings">Save ${results.savings} annually (20% discount applied)</div>` : ''}
                </div>

                <div class="thrivestack-summary-details">
                  <div class="thrivestack-details-grid">
                    <div class="thrivestack-details-section">
                      <h4 class="thrivestack-details-title">Base Pricing</h4>
                      <div class="thrivestack-details-list">
                        <div class="thrivestack-details-row">
                          <span class="thrivestack-details-label">MTU Count:</span>
                          <span class="thrivestack-details-value">${this.formatMTU(results.selectedMTU)}</span>
                        </div>
                        <div class="thrivestack-details-row">
                          <span class="thrivestack-details-label">Rate per MTU:</span>
                          <span class="thrivestack-details-value">${results.perMTURate}</span>
                        </div>
                        <div class="thrivestack-details-row">
                          <span class="thrivestack-details-label">Base Price:</span>
                          <span class="thrivestack-details-value">${results.basePrice}/mo</span>
                        </div>
                      </div>
                    </div>

                    <div class="thrivestack-details-section">
                      <h4 class="thrivestack-details-title">Summary</h4>
                      <div class="thrivestack-details-list">
                        ${results.addOnTotal > 0 ? `
                          <div class="thrivestack-details-row">
                            <span class="thrivestack-details-label">Add-ons:</span>
                            <span class="thrivestack-details-value">${formatCurrency(results.addOnTotal, this.state.selectedCurrency)}/mo</span>
                          </div>
                        ` : ''}
                        <div class="thrivestack-details-row">
                          <span class="thrivestack-details-label">Billing:</span>
                          <span class="thrivestack-details-value">${this.state.isAnnual ? 'Annual (-20%)' : 'Monthly'}</span>
                        </div>
                        ${results.tier.discount ? `
                          <div class="thrivestack-details-row thrivestack-details-discount">
                            <span>Tier Discount:</span>
                            <span class="thrivestack-details-value">${results.tier.discount}%</span>
                          </div>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="thrivestack-summary-cta">
                  <a href="https://app.thrivestack.ai/auth/customer-analytics/sign-up" target="_blank" class="thrivestack-cta">
                    Start Your 14-Day Free Trial
                  </a>
                  <p class="thrivestack-cta-subtitle">No credit card required • Full access to all features</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      const currencySelect = this.container.querySelector('#currency-select');
      const billingSwitch = this.container.querySelector('#billing-switch');
      const mtuSlider = this.container.querySelector('#mtu-slider');
      const addonsToggle = this.container.querySelector('#addons-toggle');
      const abuseDetectionCheckbox = this.container.querySelector('#abuse-detection-checkbox');
      const economicBuyerCheckbox = this.container.querySelector('#economic-buyer-checkbox');
      const dataRetentionCheckbox = this.container.querySelector('#data-retention-checkbox');
      const additionalDetectionsInput = this.container.querySelector('#additional-detections');

      if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
          this.state.selectedCurrency = e.target.value;
          this.render();
          this.bindEvents();
        });
      }

      if (billingSwitch) {
        billingSwitch.addEventListener('change', (e) => {
          this.state.isAnnual = e.target.checked;
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

      if (addonsToggle) {
        addonsToggle.addEventListener('click', () => {
          this.state.addOnsOpen = !this.state.addOnsOpen;
          this.render();
          this.bindEvents();
        });
      }

      if (abuseDetectionCheckbox) {
        abuseDetectionCheckbox.addEventListener('click', () => {
          this.state.addOns.abuseDetection = !this.state.addOns.abuseDetection;
          if (!this.state.addOns.abuseDetection) {
            this.state.additionalDetections = 0;
          }
          this.render();
          this.bindEvents();
        });
      }

      if (economicBuyerCheckbox) {
        economicBuyerCheckbox.addEventListener('click', () => {
          this.state.addOns.economicBuyer = !this.state.addOns.economicBuyer;
          this.render();
          this.bindEvents();
        });
      }

      if (dataRetentionCheckbox) {
        dataRetentionCheckbox.addEventListener('click', () => {
          this.state.addOns.dataRetention = !this.state.addOns.dataRetention;
          this.render();
          this.bindEvents();
        });
      }

      if (additionalDetectionsInput) {
        additionalDetectionsInput.addEventListener('input', (e) => {
          this.state.additionalDetections = Math.max(0, parseInt(e.target.value) || 0);
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
