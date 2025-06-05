
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

  // FAQ Data
  const faqData = [
    {
      question: "What is ThriveStack Customer Analytics?",
      answer: "ThriveStack Customer Analytics is a customer journey analytics platform designed to help Software product companies to track and optimize acquisition, activation, retention, monetization, and expansion. Unlike traditional product analytics tools, ThriveStack provides insights into customer growth, not just feature usage."
    },
    {
      question: "How is ThriveStack different from MixPanel, Amplitude, or June?",
      answer: "Most analytics tools track in-app events and feature usage, but they fail to connect the impact across marketing, onboarding, and monetization. ThriveStack helps you:\n\n✔️ Understand why users convert from free to paid\n✔️ Track the entire customer journey from acquisition to retention\n✔️ Know exactly why users upgrade and replicate success\n✔️ Identify churn risks before they happen and take action\n✔️ Measure viral growth & referrals to unlock organic expansion"
    },
    {
      question: "Who is Customer Analytics for?",
      answer: "Customer Analytics is essential for SaaS companies that need a full view of their customer journey to drive growth, retention, and monetization.\n\na. Growth Marketers → Measure marketing attribution & campaign effectiveness\nb. Product Managers → Improve activation, engagement & virality\nc. Revenue Teams → Optimize free-to-paid conversion\nd. Founders & CEOs → Get a single source of truth for growth"
    },
    {
      question: "Do I need technical skills to use ThriveStack?",
      answer: "No! ThriveStack is built for growth teams, not just developers and data scientists. We provide:\n\n🔹No-code integrations with your favorite SaaS tools\n🔹Pre-built reports & dashboards for instant insights\n🔹Automated insights so you don't have to dig through data"
    },
    {
      question: "What can I track with ThriveStack?",
      answer: "ThriveStack tracks the entire customer journey, including:\n\n✅ Marketing Attribution → Which campaigns drive signups?\n✅ Onboarding & Activation → Where do users drop off before engaging?\n✅ Free-to-Paid Conversion → Why do some users upgrade while others churn?\n✅ Retention & Expansion → How do engaged users turn into long-term customers?\n✅ Virality & Referrals → Who is bringing in more users & driving organic growth?"
    },
    {
      question: "Does ThriveStack integrate with my existing tools?",
      answer: "Yes! ThriveStack integrates with CRM, marketing, and product tools like:\n\n🔹 HubSpot, Salesforce, Segment (planned) - for marketing & sales\n🔹 With your product's Front-end and Backend systems - for product usage"
    },
    {
      question: "How does ThriveStack measure free-to-paid conversion?",
      answer: "We analyze user behavior before they upgrade, including:\n\na. What marketing channels influenced them to Signup\nb. What features they engage with\nc. How long it takes them to activate, upgrade\nd. What actions correlate with higher conversion rates\n\nThis lets you identify bottlenecks and optimize marketing campaigns, pricing, onboarding, and user flows."
    },
    {
      question: "Is there a free plan?",
      answer: "Yes! Our free plan includes:\n\n✅ Up to 10 Active users/month\n✅ Basic customer journey tracking\n✅ Key insights on free-to-paid conversion"
    },
    {
      question: "Why does your billing use Monthly Active Users (MAUs) as opposed to Monthly Tracked Users (MTUs) by your competition?",
      answer: "Our Competition is passing on the Storage and Compute costs by tracking MTUs. MAUs is the true measure of engagement and growth. We prefer to tilt towards helping your Product grow rather than nickel-and-dime you.\n\na. MTUs include all tracked users, even inactive ones.\nb. MAUs only count users who actively interact with the product.\nc. Billing by MTUs is nickel-and-diming you. MAUs are used for measuring real product adoption and retention.\n\ne.g. If 50,000 users have been tracked (but only 5,000 were active), the MTU is 50,000, MAUs is 5,000"
    },
    {
      question: "Do I need a credit card to sign up?",
      answer: "No! Our free plan lets you start tracking customers instantly—no credit card required."
    },
    {
      question: "Can I migrate from Amplitude, Mixpanel, or another analytics tool?",
      answer: "Yes! We offer easy setup for you to get started. And are considering API support to import historical data from existing platforms (planned)."
    },
    {
      question: "How do I get support?",
      answer: "We offer live chat, help docs, and onboarding support for all users. Enterprise plans include dedicated account managers and priority support."
    },
    {
      question: "How do I set up ThriveStack?",
      answer: "Setting up ThriveStack is fast and easy:\n\n1️⃣ Sign up for free (No credit card needed)\n2️⃣ Connect your data sources\n3️⃣ Get instant insights on your customer journey"
    }
  ];

  // CSS Styles - Complete page styles
  const styles = `
    .thrivestack-pricing {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
      min-height: 100vh;
    }
    
    .thrivestack-container {
      max-width: 112rem;
      margin: 0 auto;
      padding: 0 1rem;
    }

    /* Hero Section */
    .thrivestack-hero {
      text-align: center;
      padding: 4rem 0;
    }

    .thrivestack-hero-title {
      font-size: 4rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 1.5rem;
      line-height: 1.1;
    }

    .thrivestack-hero-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      max-width: 48rem;
      margin: 0 auto 1.5rem auto;
    }

    .thrivestack-currency-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .thrivestack-currency-icon {
      width: 1rem;
      height: 1rem;
      color: #64748b;
    }

    .thrivestack-currency-select {
      border: none;
      background: transparent;
      font-size: 1rem;
      color: #0f172a;
      cursor: pointer;
      outline: none;
      font-weight: 500;
    }

    /* Pricing Plans */
    .thrivestack-plans-section {
      margin: 3rem 0;
    }

    .thrivestack-billing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
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

    .thrivestack-plans-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 80rem;
      margin: 0 auto;
    }

    .thrivestack-plan-card {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transition: box-shadow 0.3s;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
    }

    .thrivestack-plan-card.featured {
      border: 2px solid #dbeafe;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .thrivestack-plan-card:hover {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .thrivestack-plan-badge {
      position: absolute;
      top: -1rem;
      left: 50%;
      transform: translateX(-50%);
      background: #3b82f6;
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 600;
      z-index: 10;
    }

    .thrivestack-plan-header {
      text-align: center;
      padding: 2rem 2rem 0 2rem;
    }

    .thrivestack-plan-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .thrivestack-plan-price {
      font-size: 2.5rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }

    .thrivestack-plan-price-unit {
      font-size: 1rem;
      font-weight: normal;
      color: #64748b;
    }

    .thrivestack-plan-billing {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.5rem;
    }

    .thrivestack-plan-content {
      padding: 1.5rem 2rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .thrivestack-plan-description {
      font-size: 0.875rem;
      color: #64748b;
      text-align: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 1.5rem;
    }

    .thrivestack-plan-link {
      color: #3b82f6;
      text-decoration: underline;
      cursor: pointer;
    }

    .thrivestack-plan-link:hover {
      color: #2563eb;
    }

    .thrivestack-plan-section {
      margin-bottom: 1.5rem;
    }

    .thrivestack-plan-section-title {
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .thrivestack-feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .thrivestack-feature-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .thrivestack-feature-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .thrivestack-feature-icon.check {
      color: #10b981;
    }

    .thrivestack-feature-icon.box {
      border: 2px solid #d1d5db;
      border-radius: 0.125rem;
      background: white;
    }

    .thrivestack-addon-item {
      margin-bottom: 0.75rem;
    }

    .thrivestack-addon-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.25rem;
    }

    .thrivestack-addon-name {
      font-weight: 500;
      color: #374151;
    }

    .thrivestack-addon-price {
      font-size: 0.875rem;
      color: #64748b;
    }

    .thrivestack-addon-description {
      font-size: 0.75rem;
      color: #64748b;
      margin-top: 0.25rem;
    }

    .thrivestack-plan-cta {
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .thrivestack-cta-button {
      width: 100%;
      padding: 0.75rem 1rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    }

    .thrivestack-cta-button.primary {
      background: #3b82f6;
      color: white;
    }

    .thrivestack-cta-button.primary:hover {
      background: #2563eb;
    }

    .thrivestack-cta-button.secondary {
      background: #0f172a;
      color: white;
    }

    .thrivestack-cta-button.secondary:hover {
      background: #1e293b;
    }

    /* Calculator Section */
    .thrivestack-calculator-section {
      margin: 5rem 0;
    }

    .thrivestack-calculator {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      margin-bottom: 1.5rem;
      max-width: 64rem;
      margin-left: auto;
      margin-right: auto;
    }

    .thrivestack-calculator-header {
      text-align: center;
      padding: 2rem 2rem 0 2rem;
    }

    .thrivestack-calculator-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .thrivestack-calculator-subtitle {
      color: #64748b;
      margin-bottom: 0;
    }

    .thrivestack-calculator-content {
      padding: 2rem;
      padding-top: 1rem;
    }

    .thrivestack-calculator-controls {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin-bottom: 2rem;
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

    /* Add-ons Section */
    .thrivestack-addons {
      background: white;
      border-radius: 0.5rem;
      border: 1px solid #dbeafe;
      margin-bottom: 1.5rem;
      overflow: hidden;
      max-width: 64rem;
      margin-left: auto;
      margin-right: auto;
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

    .thrivestack-addon-card {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }

    .thrivestack-addon-card:last-child {
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

    .thrivestack-addon-content-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .thrivestack-addon-content-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #0f172a;
      cursor: pointer;
    }

    .thrivestack-addon-content-price {
      font-size: 0.875rem;
      font-weight: 600;
      color: #0f172a;
    }

    .thrivestack-addon-content-description {
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

    /* Summary Section */
    .thrivestack-summary {
      background: white;
      border-radius: 0.5rem;
      border: 2px solid #dbeafe;
      background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%);
      max-width: 64rem;
      margin: 1.5rem auto;
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

    /* Comparison Section */
    .thrivestack-comparison {
      margin: 5rem 0;
      text-align: center;
    }

    .thrivestack-comparison-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .thrivestack-comparison-subtitle {
      color: #64748b;
      margin-bottom: 2rem;
      max-width: 32rem;
      margin-left: auto;
      margin-right: auto;
    }

    .thrivestack-comparison-button {
      background: white;
      border: 1px solid #d1d5db;
      color: #374151;
      padding: 0.75rem 2rem;
      border-radius: 0.375rem;
      font-size: 1.125rem;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .thrivestack-comparison-button:hover {
      border-color: #3b82f6;
      color: #3b82f6;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    /* FAQ Section */
    .thrivestack-faq {
      max-width: 64rem;
      margin: 0 auto;
      background: #f8fafc;
      border-radius: 0.5rem;
      padding: 2rem;
    }

    .thrivestack-faq-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .thrivestack-faq-title-section {
      flex: 1;
    }

    .thrivestack-faq-title {
      font-size: 1.875rem;
      font-weight: bold;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    .thrivestack-faq-underline {
      width: 4rem;
      height: 0.25rem;
      background: #7c3aed;
      margin-bottom: 1rem;
    }

    .thrivestack-faq-cta {
      background: #7c3aed;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-block;
    }

    .thrivestack-faq-cta:hover {
      background: #6d28d9;
    }

    .thrivestack-faq-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .thrivestack-faq-item {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .thrivestack-faq-question {
      width: 100%;
      text-align: left;
      padding: 1.5rem;
      border: none;
      background: white;
      color: #374151;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .thrivestack-faq-question:hover {
      background: #f9fafb;
    }

    .thrivestack-faq-answer {
      padding: 0 1.5rem 1.5rem 1.5rem;
      color: #64748b;
      line-height: 1.6;
      white-space: pre-line;
      display: none;
    }

    .thrivestack-faq-answer.open {
      display: block;
    }

    @media (max-width: 768px) {
      .thrivestack-container {
        padding: 0 0.5rem;
      }
      
      .thrivestack-hero-title {
        font-size: 2.5rem;
      }

      .thrivestack-hero-subtitle {
        font-size: 1.125rem;
      }
      
      .thrivestack-plans-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .thrivestack-plan-header,
      .thrivestack-plan-content {
        padding: 1.5rem;
      }

      .thrivestack-calculator-header,
      .thrivestack-calculator-content {
        padding: 1rem;
      }
      
      .thrivestack-calculator-title {
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

      .thrivestack-faq-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
  `;

  // SVG Icons
  const icons = {
    check: `<svg class="thrivestack-feature-icon check" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
    chevronDown: `<svg class="thrivestack-chevron" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"></polyline></svg>`,
    dollarSign: `<svg class="thrivestack-currency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    euro: `<svg class="thrivestack-currency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6M9 5v14l7-7"/></svg>`,
    pound: `<svg class="thrivestack-currency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 7c0-5.333-8-5.333-8 0v6M10 13h8"/></svg>`,
    rupee: `<svg class="thrivestack-currency-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 3h12M6 8h5l3 13M6 8c0-3 2-5 4-5h2"/></svg>`
  };

  // Main Pricing Page Component
  class ThriveStackPricingPage {
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
        additionalDetections: 0,
        expandedFAQs: new Set()
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

    getCurrencyIcon(currency) {
      const iconMap = {
        USD: icons.dollarSign,
        EUR: icons.euro,
        GBP: icons.pound,
        INR: icons.rupee
      };
      return iconMap[currency] || icons.dollarSign;
    }

    scrollToCalculator() {
      const calculator = document.getElementById('mtu-calculator');
      if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' });
      }
    }

    render() {
      const results = this.calculateResults();
      const baseMonthlyPrice = 99;
      const discountedPrice = baseMonthlyPrice * 0.8;
      const displayPrice = this.state.isAnnual ? discountedPrice : baseMonthlyPrice;
      const planPrice = formatCurrency(displayPrice, this.state.selectedCurrency);
      
      this.container.innerHTML = `
        <div class="thrivestack-pricing">
          <div class="thrivestack-container">
            <!-- Hero Section -->
            <div class="thrivestack-hero">
              <h1 class="thrivestack-hero-title">Simple, Transparent Pricing</h1>
              <p class="thrivestack-hero-subtitle">
                Scale your analytics without the complexity. Choose the plan that fits your growth stage.
              </p>
              
              <!-- Currency Selector -->
              <div class="thrivestack-currency-container">
                ${this.getCurrencyIcon(this.state.selectedCurrency)}
                <select id="hero-currency-select" class="thrivestack-currency-select">
                  ${Object.keys(currencyConfigs).map(currency => 
                    `<option value="${currency}" ${currency === this.state.selectedCurrency ? 'selected' : ''}>${currency}</option>`
                  ).join('')}
                </select>
              </div>
            </div>

            <!-- Pricing Plans Section -->
            <div class="thrivestack-plans-section">
              <!-- Billing Toggle -->
              <div class="thrivestack-billing-toggle">
                <span class="thrivestack-billing-label ${!this.state.isAnnual ? 'active' : ''}">Monthly</span>
                <div class="thrivestack-switch">
                  <input type="checkbox" id="plans-billing-switch" ${this.state.isAnnual ? 'checked' : ''}>
                  <span class="thrivestack-switch-slider"></span>
                </div>
                <span class="thrivestack-billing-label ${this.state.isAnnual ? 'active' : ''}">Annual</span>
                <span class="thrivestack-badge">Save 20%</span>
              </div>

              <!-- Plans Grid -->
              <div class="thrivestack-plans-grid">
                <!-- Grow Plan -->
                <div class="thrivestack-plan-card featured">
                  <div class="thrivestack-plan-badge">14-Day Free Trial</div>
                  
                  <div class="thrivestack-plan-header">
                    <h3 class="thrivestack-plan-title">Grow Plan</h3>
                    <div class="thrivestack-plan-price">
                      Starts at ${planPrice}
                      <span class="thrivestack-plan-price-unit">/month</span>
                    </div>
                    <div class="thrivestack-plan-billing">
                      ${this.state.isAnnual ? 'Billed annually' : 'Monthly billing'} • ${!this.state.isAnnual ? 'Save 20% annually' : ''}
                    </div>
                  </div>

                  <div class="thrivestack-plan-content">
                    <div class="thrivestack-plan-description">
                      Includes 1,500 MTUs • 
                      <button id="calculate-link" class="thrivestack-plan-link">
                        Calculate your price by MTU count
                      </button>
                    </div>

                    <div class="thrivestack-plan-section">
                      <h4 class="thrivestack-plan-section-title">Includes:</h4>
                      <ul class="thrivestack-feature-list">
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Track up to 300,000 MTUs</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Account-Level Insights</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Full Journey Tracking</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Growth Leak Detection</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Analytics Consolidation</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Efficient Event Collection</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Guided Setup for Results</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Transparent Pricing</span>
                        </li>
                      </ul>
                    </div>

                    <div class="thrivestack-plan-section">
                      <h4 class="thrivestack-plan-section-title">Add-ons:</h4>
                      <ul class="thrivestack-feature-list">
                        <li class="thrivestack-addon-item">
                          <div class="thrivestack-addon-header">
                            <span class="thrivestack-addon-name">Abuse Detection</span>
                            <span class="thrivestack-addon-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</span>
                          </div>
                          <p class="thrivestack-addon-description">Protect analytics from spam and abuse with advanced detection system.</p>
                        </li>
                        <li class="thrivestack-addon-item">
                          <div class="thrivestack-addon-header">
                            <span class="thrivestack-addon-name">Economic Buyer</span>
                            <span class="thrivestack-addon-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</span>
                          </div>
                          <p class="thrivestack-addon-description">Identify up to 500 key decision-makers with financial authority.</p>
                        </li>
                        <li class="thrivestack-addon-item">
                          <div class="thrivestack-addon-header">
                            <span class="thrivestack-addon-name">Data Retention</span>
                            <span class="thrivestack-addon-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</span>
                          </div>
                          <p class="thrivestack-addon-description">Access and analyze your data for up to one year.</p>
                        </li>
                      </ul>
                    </div>

                    <div class="thrivestack-plan-cta">
                      <a href="https://app.thrivestack.ai/auth/customer-analytics/sign-up" target="_blank" class="thrivestack-cta-button primary">
                        Start Trial
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Enterprise Plan -->
                <div class="thrivestack-plan-card">
                  <div class="thrivestack-plan-header">
                    <h3 class="thrivestack-plan-title">Enterprise Plan</h3>
                    <div class="thrivestack-plan-price">Custom</div>
                    <div class="thrivestack-plan-billing">Tailored to your needs</div>
                  </div>

                  <div class="thrivestack-plan-content">
                    <div class="thrivestack-plan-description">
                      Contact us for custom pricing
                    </div>

                    <div class="thrivestack-plan-section">
                      <h4 class="thrivestack-plan-section-title">Includes:</h4>
                      <ul class="thrivestack-feature-list">
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Everything in Grow</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Custom SLAs</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Tailored onboarding</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Custom integrations</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Dedicated support team</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Advanced security features</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Custom reporting</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span>Priority feature requests</span>
                        </li>
                      </ul>
                    </div>

                    <div class="thrivestack-plan-section">
                      <h4 class="thrivestack-plan-section-title">All Add-ons Included:</h4>
                      <ul class="thrivestack-feature-list">
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span class="thrivestack-addon-name">Abuse Detection</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span class="thrivestack-addon-name">Economic Buyer</span>
                        </li>
                        <li class="thrivestack-feature-item">
                          ${icons.check}
                          <span class="thrivestack-addon-name">Data Retention</span>
                        </li>
                      </ul>
                    </div>

                    <div class="thrivestack-plan-cta">
                      <button class="thrivestack-cta-button secondary">
                        Schedule a call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- MTU Calculator Section -->
            <div class="thrivestack-calculator-section" id="mtu-calculator">
              <div class="thrivestack-calculator">
                <div class="thrivestack-calculator-header">
                  <h2 class="thrivestack-calculator-title">MTU-Based Pricing Calculator</h2>
                  <p class="thrivestack-calculator-subtitle">Calculate your exact pricing based on Monthly Tracked Users (MTU)</p>
                </div>

                <div class="thrivestack-calculator-content">
                  <div class="thrivestack-calculator-controls">
                    <div class="thrivestack-currency-container">
                      ${this.getCurrencyIcon(this.state.selectedCurrency)}
                      <select id="calculator-currency-select" class="thrivestack-currency-select">
                        ${Object.keys(currencyConfigs).map(currency => 
                          `<option value="${currency}" ${currency === this.state.selectedCurrency ? 'selected' : ''}>${currency}</option>`
                        ).join('')}
                      </select>
                    </div>
                    
                    <div class="thrivestack-billing-toggle">
                      <span class="thrivestack-billing-label ${!this.state.isAnnual ? 'active' : ''}">Monthly</span>
                      <div class="thrivestack-switch">
                        <input type="checkbox" id="calculator-billing-switch" ${this.state.isAnnual ? 'checked' : ''}>
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

              <!-- Add-ons Calculator -->
              <div class="thrivestack-addons">
                <div class="thrivestack-addons-header" id="addons-toggle">
                  <div class="thrivestack-addons-title-row">
                    <h3 class="thrivestack-addons-title">Add-ons Calculator</h3>
                    ${icons.chevronDown.replace('thrivestack-chevron', `thrivestack-chevron ${this.state.addOnsOpen ? 'open' : ''}`)}
                  </div>
                  <p class="thrivestack-addons-subtitle">Select the add-ons you need for your plan</p>
                </div>
                
                ${this.state.addOnsOpen ? `
                  <div class="thrivestack-addons-content">
                    <div class="thrivestack-addon-card">
                      <div class="thrivestack-addon-row">
                        <div class="thrivestack-checkbox ${this.state.addOns.abuseDetection ? 'checked' : ''}" id="abuse-detection-checkbox"></div>
                        <div class="thrivestack-addon-content">
                          <div class="thrivestack-addon-content-header">
                            <label class="thrivestack-addon-content-name" for="abuse-detection-checkbox">Abuse Detection</label>
                            <div class="thrivestack-addon-content-price">
                              ${formatCurrency(25, this.state.selectedCurrency)}/mo
                              ${this.state.addOns.abuseDetection && this.state.additionalDetections > 0 ? 
                                ` + ${formatCurrency(this.state.additionalDetections * 0.02, this.state.selectedCurrency)}` : ''}
                            </div>
                          </div>
                          <p class="thrivestack-addon-content-description">Protect your analytics from spam and abuse with our advanced detection system. Automatically identify and filter out suspicious traffic.</p>
                          <p class="thrivestack-addon-content-description">Includes 500 detections</p>
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

                    <div class="thrivestack-addon-card">
                      <div class="thrivestack-addon-row">
                        <div class="thrivestack-checkbox ${this.state.addOns.economicBuyer ? 'checked' : ''}" id="economic-buyer-checkbox"></div>
                        <div class="thrivestack-addon-content">
                          <div class="thrivestack-addon-content-header">
                            <label class="thrivestack-addon-content-name" for="economic-buyer-checkbox">Economic Buyer</label>
                            <div class="thrivestack-addon-content-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</div>
                          </div>
                          <p class="thrivestack-addon-content-description">Automatically identify up to 500 key decision-makers in an organization with the authority to approve expenditures and make financial decisions.</p>
                        </div>
                      </div>
                    </div>

                    <div class="thrivestack-addon-card">
                      <div class="thrivestack-addon-row">
                        <div class="thrivestack-checkbox ${this.state.addOns.dataRetention ? 'checked' : ''}" id="data-retention-checkbox"></div>
                        <div class="thrivestack-addon-content">
                          <div class="thrivestack-addon-content-header">
                            <label class="thrivestack-addon-content-name" for="data-retention-checkbox">Data Retention</label>
                            <div class="thrivestack-addon-content-price">${formatCurrency(25, this.state.selectedCurrency)}/mo</div>
                          </div>
                          <p class="thrivestack-addon-content-description">Access and analyze your data for up to one year with our extended retention add-on. Perfect for compliance and long-term analysis.</p>
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

              <!-- Summary -->
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

            <!-- Comparison Section -->
            <div class="thrivestack-comparison">
              <h2 class="thrivestack-comparison-title">How We Compare</h2>
              <p class="thrivestack-comparison-subtitle">
                See how ThriveStack stacks up against other analytics platforms in features and pricing.
              </p>
              <a href="https://preview--thrive-stack-insights-calculator.lovable.app/" target="_blank" class="thrivestack-comparison-button">
                Compare pricing with other analytics tools
              </a>
            </div>

            <!-- FAQ Section -->
            <div class="thrivestack-faq">
              <div class="thrivestack-faq-header">
                <div class="thrivestack-faq-title-section">
                  <h2 class="thrivestack-faq-title">Frequently Asked Questions</h2>
                  <div class="thrivestack-faq-underline"></div>
                </div>
                <a href="https://app.thrivestack.ai/auth/customer-analytics/sign-up" target="_blank" class="thrivestack-faq-cta">
                  Get started for free
                </a>
              </div>

              <div class="thrivestack-faq-list">
                ${faqData.map((faq, index) => `
                  <div class="thrivestack-faq-item">
                    <button class="thrivestack-faq-question" data-faq-index="${index}">
                      ${faq.question}
                    </button>
                    <div class="thrivestack-faq-answer ${this.state.expandedFAQs.has(index) ? 'open' : ''}">
                      ${faq.answer}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      // Currency selectors
      const heroCurrencySelect = this.container.querySelector('#hero-currency-select');
      const calculatorCurrencySelect = this.container.querySelector('#calculator-currency-select');
      
      [heroCurrencySelect, calculatorCurrencySelect].forEach(select => {
        if (select) {
          select.addEventListener('change', (e) => {
            this.state.selectedCurrency = e.target.value;
            this.render();
            this.bindEvents();
          });
        }
      });

      // Billing switches
      const plansBillingSwitch = this.container.querySelector('#plans-billing-switch');
      const calculatorBillingSwitch = this.container.querySelector('#calculator-billing-switch');
      
      [plansBillingSwitch, calculatorBillingSwitch].forEach(switchEl => {
        if (switchEl) {
          switchEl.addEventListener('change', (e) => {
            this.state.isAnnual = e.target.checked;
            this.render();
            this.bindEvents();
          });
        }
      });

      // Calculate link
      const calculateLink = this.container.querySelector('#calculate-link');
      if (calculateLink) {
        calculateLink.addEventListener('click', () => {
          this.scrollToCalculator();
        });
      }

      // MTU slider
      const mtuSlider = this.container.querySelector('#mtu-slider');
      if (mtuSlider) {
        mtuSlider.addEventListener('input', (e) => {
          this.state.selectedMTUIndex = parseInt(e.target.value);
          this.render();
          this.bindEvents();
        });
      }

      // Add-ons toggle
      const addonsToggle = this.container.querySelector('#addons-toggle');
      if (addonsToggle) {
        addonsToggle.addEventListener('click', () => {
          this.state.addOnsOpen = !this.state.addOnsOpen;
          this.render();
          this.bindEvents();
        });
      }

      // Add-on checkboxes
      const abuseDetectionCheckbox = this.container.querySelector('#abuse-detection-checkbox');
      const economicBuyerCheckbox = this.container.querySelector('#economic-buyer-checkbox');
      const dataRetentionCheckbox = this.container.querySelector('#data-retention-checkbox');

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

      // Additional detections input
      const additionalDetectionsInput = this.container.querySelector('#additional-detections');
      if (additionalDetectionsInput) {
        additionalDetectionsInput.addEventListener('input', (e) => {
          this.state.additionalDetections = Math.max(0, parseInt(e.target.value) || 0);
          this.render();
          this.bindEvents();
        });
      }

      // FAQ toggles
      const faqQuestions = this.container.querySelectorAll('.thrivestack-faq-question');
      faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
          const index = parseInt(question.getAttribute('data-faq-index'));
          if (this.state.expandedFAQs.has(index)) {
            this.state.expandedFAQs.delete(index);
          } else {
            this.state.expandedFAQs.add(index);
          }
          this.render();
          this.bindEvents();
        });
      });
    }
  }

  // Auto-initialize
  window.ThriveStackPricingPage = ThriveStackPricingPage;
  
  // Auto-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const container = document.getElementById('thrivestack-pricing-page');
      if (container) {
        new ThriveStackPricingPage('thrivestack-pricing-page');
      }
    });
  } else {
    const container = document.getElementById('thrivestack-pricing-page');
    if (container) {
      new ThriveStackPricingPage('thrivestack-pricing-page');
    }
  }
})();
