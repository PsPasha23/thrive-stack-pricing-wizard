
import React, { useState } from 'react';
import Collapsible from 'react-collapsible';
import { Check, X } from 'lucide-react';

const ComparisonSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const competitors = [
    {
      name: 'ThriveStack',
      pricing: 'From $79.20/mo',
      features: {
        'Account-Level Insights': true,
        'Full Journey Tracking': true,
        'Growth Leak Detection': true,
        'Analytics Consolidation': true,
        'Efficient Event Collection': true,
        'Guided Setup': true,
        'Transparent Pricing': true,
        'Real-time Processing': true,
      },
      highlight: true,
    },
    {
      name: 'Amplitude',
      pricing: 'From $61/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'Mixpanel',
      pricing: 'From $89/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'Heap',
      pricing: 'From $360/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': true,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': false,
        'Transparent Pricing': false,
        'Real-time Processing': true,
      },
    },
    {
      name: 'June',
      pricing: 'From $50/mo',
      features: {
        'Account-Level Insights': false,
        'Full Journey Tracking': false,
        'Growth Leak Detection': false,
        'Analytics Consolidation': false,
        'Efficient Event Collection': false,
        'Guided Setup': true,
        'Transparent Pricing': true,
        'Real-time Processing': false,
      },
    },
  ];

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

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          How We Compare
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          See how ThriveStack stacks up against other analytics platforms in features and pricing.
        </p>

        <button 
          className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 text-lg rounded-md transition-colors duration-200"
          onClick={() => window.open('https://preview--thrive-stack-insights-calculator.lovable.app/', '_blank')}
        >
          Compare pricing with other analytics tools
        </button>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-6xl max-h-[80vh] overflow-y-auto w-full">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-center flex-1">
                    ThriveStack vs Competition
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl font-bold w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-2 font-semibold">Feature</th>
                        {competitors.map((competitor) => (
                          <th
                            key={competitor.name}
                            className={`text-center py-4 px-2 font-semibold ${
                              competitor.highlight
                                ? 'bg-blue-50 border-l-2 border-r-2 border-blue-200'
                                : ''
                            }`}
                          >
                            <div>{competitor.name}</div>
                            <div className="text-sm font-normal text-slate-600 mt-1">
                              {competitor.pricing}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(competitors[0].features).map((feature) => (
                        <tr key={feature} className="border-b">
                          <td className="py-3 px-2 text-sm font-medium">{feature}</td>
                          {competitors.map((competitor) => (
                            <td
                              key={competitor.name}
                              className={`text-center py-3 px-2 ${
                                competitor.highlight
                                  ? 'bg-blue-50 border-l-2 border-r-2 border-blue-200'
                                  : ''
                              }`}
                            >
                              {competitor.features[feature as keyof typeof competitor.features] ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-red-400 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center mt-6">
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Start Your Free Trial
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Section with updated styling */}
      <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-purple-600 mb-4"></div>
          </div>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            onClick={() => window.open('https://app.thrivestack.ai/auth/customer-analytics/sign-up', '_blank')}
          >
            Get started for free
          </button>
        </div>

        <div className="space-y-2">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border-0 shadow-sm">
              <Collapsible
                trigger={
                  <div className="text-left px-6 py-4 cursor-pointer hover:bg-gray-50 rounded-lg">
                    <span className="text-slate-700 font-medium">{faq.question}</span>
                  </div>
                }
                triggerClassName="w-full"
                contentClassName="text-slate-600 whitespace-pre-line px-6 pb-4 pt-0"
              >
                {faq.answer}
              </Collapsible>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
