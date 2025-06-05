
# ThriveStack Pricing Calculator Embed

This directory contains the standalone JavaScript file for embedding the ThriveStack pricing calculator into external websites like Webflow.

## Files

- `../public/thrivestack-pricing-embed.js` - The complete standalone JavaScript bundle

## How to use in Webflow

1. **Add the HTML container:**
   ```html
   <div id="thrivestack-pricing-calculator"></div>
   ```

2. **Include the JavaScript file:**
   ```html
   <script src="https://your-domain.com/thrivestack-pricing-embed.js"></script>
   ```

3. **Or embed directly:**
   ```html
   <div id="thrivestack-pricing-calculator"></div>
   <script>
     // Copy the entire contents of thrivestack-pricing-embed.js here
   </script>
   ```

## Manual initialization

If you need to initialize the calculator manually:

```javascript
// Make sure the script is loaded first, then:
const calculator = new ThriveStackPricingCalculator('your-container-id');
```

## Features included

- MTU-based pricing calculator with slider
- Currency conversion (USD, EUR, GBP, INR)
- Annual/Monthly billing toggle with 20% annual discount
- Responsive design
- Auto-calculation and updates
- Direct link to ThriveStack signup

## Customization

The calculator automatically injects its own CSS styles. If you need to customize the appearance, you can override the CSS classes in your website's stylesheet:

- `.thrivestack-pricing` - Main container
- `.thrivestack-calculator` - Calculator card
- `.thrivestack-summary` - Summary/results section
- `.thrivestack-cta` - Call-to-action button

All styles are scoped with the `thrivestack-` prefix to avoid conflicts with your site's existing styles.
