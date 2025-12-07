# Zinovia - AI Services Website

A production-ready, modern website for Zinovia built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion. Inspired by Scale.ai's design aesthetic with sophisticated animations and a premium feel.

## Features

- 🎨 **Modern Design**: Clean, professional UI inspired by Scale.ai
- ⚡ **High Performance**: Optimized for speed with code splitting and lazy loading
- 🎭 **Smooth Animations**: Sophisticated scroll animations using Framer Motion
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ♿ **Accessible**: WCAG AA compliant with keyboard navigation and screen reader support
- 🔍 **SEO Optimized**: Complete metadata, sitemap, robots.txt, and structured data
- 🎯 **TypeScript**: Full type safety with strict mode
- 🧩 **Component-Based**: Reusable, well-organized component architecture

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zinovia
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables template:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration values.
   - `NEXT_PUBLIC_API_URL` should point to the backend REST API (e.g. `https://api-backend-dev-xxxxx-ew.a.run.app/api/v1`)
   - `NEXT_PUBLIC_CHAT_API_URL` should point to the chatbot root (no `/api/v1`, e.g. `https://api-backend-dev-xxxxx-ew.a.run.app`)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
zinovia/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── services/           # Services page
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── case-studies/       # Case studies page
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Robots.txt
│   └── not-found.tsx       # 404 page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── sections/           # Page sections (Hero, Services, etc.)
│   ├── animations/         # Animation components
│   └── forms/              # Form components
├── lib/
│   ├── utils.ts            # Utility functions
│   ├── animations.ts       # Framer Motion animation variants
│   ├── constants.ts        # Content and configuration
│   └── structured-data.ts  # JSON-LD schemas
├── types/
│   └── index.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure settings
4. Add environment variables in Vercel dashboard
5. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

For self-hosting:
```bash
npm run build
npm run start
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: {
    blue: "#3B82F6",
    purple: "#8B5CF6",
  },
  // ...
}
```

### Content

Update content in `lib/constants.ts`:
- Services
- Testimonials
- Stats
- Company information
- Navigation links

### Metadata

Update SEO metadata in:
- `app/layout.tsx` - Default metadata
- Individual page files - Page-specific metadata

## Performance Optimization

The site includes several performance optimizations:

- Image optimization with `next/image`
- Font optimization with `next/font`
- Code splitting and lazy loading
- React.memo for heavy components
- Debounced scroll listeners
- Optimized Framer Motion animations

## Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Reduced motion support (`prefers-reduced-motion`)
- WCAG AA color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.

## Support

For questions or issues, please contact: hello@zinovia.com

---

Built with ❤️ for Zinovia
