# A/B Testing Landing Page Manager

![App Preview](https://imgix.cosmicjs.com/3244fc60-931a-11f0-8665-4b7a39b6c61a-photo-1460925895917-afdab827c52f-1758040116498.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive A/B testing platform that allows you to create, manage, and optimize multiple landing page variants. Built for marketers and growth teams who want to make data-driven decisions about their conversion strategies.

## Features

- 🧪 **A/B Test Management** - Create and organize multiple tests with detailed tracking
- 📄 **Landing Page Variants** - Build Control (A) and Variant (B) versions with rich content
- 👀 **Live Preview System** - View how different variants appear to users
- 📊 **Test Status Monitoring** - Track running, paused, and completed tests
- 🔍 **SEO Optimization** - Built-in meta title and description management
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- ⚡ **Real-time Content** - Dynamic content updates via Cosmic CMS
- 🎯 **Conversion Tracking** - Monitor goals and performance metrics

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68c98ea8fe0840663f64fa3d&clone_repository=68c99123fe0840663f64fa50)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> I want to create a clone application of https://unbounce.com/, essentially allowing me to create 2 versions of a landing page to A/B test.

### Code Generation Prompt

> Based on the content model I created for "I want to create a clone application of https://unbounce.com/, essentially allowing me to create 2 versions of a landing page to A/B test.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Cosmic account with your A/B testing content model

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up your environment variables in `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Start the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching A/B Tests
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all A/B tests
const tests = await cosmic.objects
  .find({ type: 'ab-tests' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a specific test
const test = await cosmic.objects
  .findOne({ type: 'ab-tests', slug: 'homepage-cta-test' })
  .depth(1)
```

### Fetching Landing Page Variants
```typescript
// Get all landing pages for a specific test
const variants = await cosmic.objects
  .find({ 
    type: 'landing-pages',
    'metadata.ab_test': testId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a specific variant
const variant = await cosmic.objects
  .findOne({ type: 'landing-pages', slug: 'homepage-variant-benefits-focus' })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic CMS content model:

### A/B Tests Object Type
- **Test Name** - Name of your A/B test
- **Description** - What you're testing
- **Test Status** - Draft, Running, Paused, Completed
- **Traffic Split** - Percentage distribution
- **Conversion Goal** - Target action/metric

### Landing Pages Object Type
- **Page Name** - Internal identifier
- **A/B Test** - Connected test (object relationship)
- **Variant Type** - Control (A) or Variant (B)
- **Hero Content** - Headlines, subheadlines, images
- **CTA Elements** - Button text and URLs
- **Features/Benefits** - Rich HTML content
- **Social Proof** - Testimonials and validation
- **SEO Meta** - Title and description optimization
- **Page Status** - Draft, Live, Archived

## Deployment Options

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically with each push

### Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Add your environment variables in the Netlify dashboard
4. Deploy with automatic builds

### Environment Variables
Make sure to set these environment variables in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`  
- `COSMIC_WRITE_KEY`
<!-- README_END -->