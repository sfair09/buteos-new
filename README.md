# Buteos Systems Website

A modern Next.js website for Buteos Systems, combining elements from two existing websites and implementing a new pricing structure.

Visit the site: [buteossystems.com](https://buteossystems.com)

## Features

- Modern, responsive design
- Stripe integration for payments and subscriptions
- EmailJS integration for contact forms
- Dynamic pricing pages
- About Us page
- Terms of Service and Privacy Policy pages
- Success page for payment confirmation

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Stripe
- EmailJS

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory
  - `/api` - API routes for Stripe and EmailJS
  - `/components` - Reusable React components
  - `/styles` - Global styles and Tailwind configuration
  - `/public` - Static assets

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Google Cloud Run (Recommended)

This application is configured for deployment on Google Cloud Run using Docker:

```bash
# Quick deployment
./deploy.sh YOUR_PROJECT_ID us-central1
```

See [CLOUD_RUN_DEPLOYMENT.md](./CLOUD_RUN_DEPLOYMENT.md) for detailed instructions.

### Other Platforms

The site can also be deployed to other platforms that support Next.js applications, such as Vercel, Netlify, or AWS Amplify.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
