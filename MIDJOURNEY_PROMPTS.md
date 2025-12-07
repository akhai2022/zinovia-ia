# Midjourney Prompts for Zinovia.ai

## Brand Identity
- **Company**: Zinovia - Enterprise AI Solutions
- **Primary Colors**: Navy/Purple (#8E54FF), Cyan (#5BF5FF), Warm Orange (#FF8C69)
- **Style**: Modern, professional, enterprise-grade, tech-forward
- **Target Audience**: Enterprise businesses, CTOs, decision-makers

---

## 1. LOGO PROMPTS

### Main Logo (Wordmark + Icon)
```
Modern minimalist logo for "Zinovia" AI technology company, wordmark with abstract geometric icon, navy blue (#8E54FF) and cyan (#5BF5FF) gradient, clean sans-serif typography, professional enterprise aesthetic, vector style, high contrast, scalable design, --ar 3:1 --v 6 --style raw
```

### Icon Only (Favicon/App Icon)
```
Abstract geometric icon representing AI intelligence, neural network pattern, interconnected nodes, navy blue (#8E54FF) and cyan (#5BF5FF) color scheme, minimalist design, scalable vector style, professional tech company logo, --ar 1:1 --v 6 --style raw
```

### Alternative Logo Concepts
```
1. "Zinovia" wordmark with AI brain icon, modern tech aesthetic, navy and cyan gradient, professional B2B design, --ar 3:1 --v 6
2. Geometric "Z" monogram with circuit pattern, navy blue primary, cyan accent, minimalist enterprise logo, --ar 1:1 --v 6
3. Abstract data flow visualization as logo, connecting nodes, navy purple and cyan colors, modern AI company branding, --ar 2:1 --v 6
```

---

## 2. HERO SECTION IMAGES

### Main Hero Background
```
Abstract futuristic technology background, flowing data streams, neural network visualization, navy blue (#8E54FF) and cyan (#5BF5FF) gradient, dark professional atmosphere, enterprise AI aesthetic, subtle geometric patterns, high resolution, --ar 16:9 --v 6 --style raw
```

### Hero Illustration (Optional)
```
Modern illustration of AI transformation, abstract business growth visualization, navy and cyan color palette, professional enterprise style, clean vector art, technology meets business, --ar 16:9 --v 6
```

---

## 3. SERVICE/PLATFORM IMAGES

### AI Chatbots Service
```
Professional illustration of AI chatbot interface, conversation bubbles, modern UI design, navy blue and cyan color scheme, enterprise software aesthetic, clean minimalist style, technology illustration, --ar 4:3 --v 6
```

### Document Intelligence Service
```
Abstract visualization of document processing, data extraction concept, flowing documents transforming into insights, navy blue and cyan gradient, professional tech illustration, enterprise software, --ar 4:3 --v 6
```

### AI Agents Service
```
Modern illustration of autonomous AI agents, workflow automation visualization, interconnected systems, navy purple and cyan colors, professional enterprise tech aesthetic, clean vector style, --ar 4:3 --v 6
```

### Platform Overview
```
Futuristic AI platform dashboard visualization, data analytics interface, modern enterprise software design, navy blue and cyan color palette, professional tech illustration, clean UI mockup, --ar 16:9 --v 6
```

---

## 4. CASE STUDY IMAGES

### Healthcare AI
```
Professional healthcare technology illustration, medical data visualization, HIPAA compliance concept, navy blue and cyan color scheme, modern medical tech aesthetic, clean professional style, --ar 16:9 --v 6
```

### Finance AI
```
Financial technology visualization, secure banking AI concept, data security illustration, navy blue and cyan gradient, professional fintech aesthetic, enterprise software style, --ar 16:9 --v 6
```

### E-commerce AI
```
E-commerce AI automation visualization, shopping experience enhancement, customer journey illustration, navy purple and cyan colors, modern retail tech aesthetic, professional illustration, --ar 16:9 --v 6
```

### Manufacturing AI
```
Industrial AI automation visualization, smart manufacturing concept, production line optimization, navy blue and cyan color scheme, modern industrial tech aesthetic, professional illustration, --ar 16:9 --v 6
```

### Legal AI
```
Legal technology visualization, document analysis concept, law firm AI tools, navy blue and cyan gradient, professional legal tech aesthetic, enterprise software illustration, --ar 16:9 --v 6
```

---

## 5. FEATURE/ICON ILLUSTRATIONS

### Security & Compliance
```
Shield icon with data protection visualization, security badge design, navy blue and cyan colors, professional enterprise security aesthetic, clean vector illustration, --ar 1:1 --v 6
```

### Integration Capabilities
```
Interconnected systems illustration, API integration concept, network connections, navy purple and cyan color scheme, modern tech integration visualization, --ar 1:1 --v 6
```

### Analytics Dashboard
```
Data visualization dashboard mockup, charts and graphs, analytics interface, navy blue and cyan color palette, professional enterprise software design, --ar 16:9 --v 6
```

---

## 6. BACKGROUND PATTERNS & TEXTURES

### Subtle Background Pattern
```
Subtle geometric pattern, abstract tech texture, navy blue (#8E54FF) base with cyan (#5BF5FF) accents, low opacity, professional enterprise background, seamless tileable pattern, --ar 1:1 --v 6 --tile
```

### Gradient Background
```
Smooth gradient background, navy blue to cyan transition, professional tech aesthetic, subtle texture, enterprise software background, high resolution, --ar 16:9 --v 6
```

---

## 7. UX/UI RECOMMENDATIONS FOR PRODUCTION

### Image Specifications

#### Logo Requirements:
- **Format**: SVG (vector) for scalability + PNG fallback
- **Sizes**: 
  - Favicon: 32x32px, 64x64px, 128x128px
  - Header logo: 140x40px (current), 280x80px (retina)
  - Full logo: 400x120px
- **Background**: Transparent PNG for light/dark mode support
- **Color variations**: Light mode (navy), Dark mode (white/cyan)
- **File naming**: `zinovia-logo.svg`, `zinovia-logo-light.png`, `zinovia-logo-dark.png`

#### Hero Images:
- **Format**: WebP (modern) + JPG fallback
- **Dimensions**: 1920x1080px (desktop), 1280x720px (tablet), 768x432px (mobile)
- **File size**: < 200KB (optimized)
- **Aspect ratio**: 16:9
- **Lazy loading**: Enable for below-fold images

#### Service/Feature Images:
- **Format**: WebP + PNG fallback
- **Dimensions**: 800x600px (4:3) or 1200x800px
- **File size**: < 150KB per image
- **Alt text**: Descriptive for accessibility

#### Case Study Images:
- **Format**: WebP
- **Dimensions**: 1200x675px (16:9)
- **File size**: < 180KB
- **SEO**: Include industry-specific keywords in alt text

### Post-Processing Checklist:

1. **Color Correction**:
   - Ensure navy blue (#8E54FF) and cyan (#5BF5FF) match brand colors exactly
   - Use color picker to verify hex codes
   - Adjust saturation/contrast for web display

2. **Optimization**:
   - Compress images using tools like:
     - Squoosh.app (Google)
     - TinyPNG
     - ImageOptim
   - Target: 70-85% quality for WebP
   - Remove metadata

3. **Format Conversion**:
   - Convert Midjourney outputs to WebP
   - Generate multiple sizes (responsive images)
   - Create @2x versions for retina displays

4. **Accessibility**:
   - Add descriptive alt text
   - Ensure sufficient color contrast (WCAG AA minimum)
   - Test with screen readers

5. **Performance**:
   - Use Next.js Image component with:
     - `priority` for above-fold images
     - `loading="lazy"` for below-fold
     - `placeholder="blur"` for better UX
   - Implement responsive images with `srcset`

6. **Dark Mode Support**:
   - Create light/dark variants for logos
   - Adjust image brightness/contrast for dark theme
   - Test visibility in both themes

### Implementation Example:

```tsx
// In your components
import Image from 'next/image';

<Image
  src="/images/logo/zinovia-logo.svg"
  alt="Zinovia - Enterprise AI Solutions"
  width={140}
  height={40}
  priority
  className="h-10 w-auto"
/>

<Image
  src="/images/hero/ai-transformation.webp"
  alt="AI-powered business transformation"
  width={1920}
  height={1080}
  priority
  className="w-full h-auto"
  placeholder="blur"
/>
```

### File Structure:
```
public/
  images/
    logo/
      zinovia-logo.svg
      zinovia-logo-light.png
      zinovia-logo-dark.png
      favicon.ico
    hero/
      hero-background.webp
      hero-illustration.webp
    services/
      ai-chatbots.webp
      document-intelligence.webp
      ai-agents.webp
    case-studies/
      healthcare.webp
      finance.webp
      ecommerce.webp
      manufacturing.webp
      legal.webp
    features/
      security.webp
      integration.webp
      analytics.webp
```

---

## 8. MIDJOURNEY BEST PRACTICES

### For Best Results:
1. **Use `--v 6`** for latest quality
2. **Add `--style raw`** for more control over output
3. **Specify aspect ratios** (`--ar 16:9`, `--ar 1:1`, etc.)
4. **Iterate with variations** using `V1-V4` buttons
5. **Upscale** to maximum resolution for production
6. **Use `--no`** to exclude unwanted elements (e.g., `--no text, watermark`)

### Prompt Refinement Tips:
- Start with base prompt, then add details
- Use `::` for emphasis (e.g., `navy blue::2`)
- Combine multiple concepts with commas
- Test different style modifiers

### Quality Control:
- Review all images for brand consistency
- Ensure colors match brand palette exactly
- Check for unwanted text/watermarks
- Verify scalability for logos
- Test on different screen sizes

---

## 9. ALTERNATIVE PROMPTS (If First Attempts Don't Work)

### Logo Alternative:
```
Minimalist tech company logo, "Zinovia" typography, geometric Z icon, purple navy and bright cyan colors, modern enterprise branding, clean professional design, vector art style, --ar 3:1 --v 6
```

### Hero Background Alternative:
```
Abstract technology visualization, flowing data particles, dark navy background with cyan highlights, professional enterprise aesthetic, futuristic tech atmosphere, high quality, --ar 16:9 --v 6
```

---

## 10. COLOR REFERENCE FOR MIDJOURNEY

Use these exact color descriptions in prompts:
- **Navy/Purple**: "Deep navy purple, #8E54FF, indigo blue-purple"
- **Cyan**: "Bright cyan, #5BF5FF, electric blue-cyan"
- **Warm Orange**: "Coral orange, #FF8C69, warm peach-orange" (accent only)

---

**Note**: Always generate multiple variations and select the best ones. Post-process all images to match exact brand colors and optimize for web performance.

