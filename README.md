# v0 IRL Event Landing Template

A customizable landing page template for hosting v0 IRL events around the world. This template was originally created for the "Prompt to Production" events and includes an interactive 3D lanyard generator, event agenda, sponsor showcase, and registration CTAs.

[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Customization Guide](#customization-guide)
  - [1. Event Information](#1-event-information)
  - [2. Lanyard Customization](#2-lanyard-customization)
  - [3. Sponsors and Partners](#3-sponsors-and-partners)
  - [4. Agenda](#4-agenda)
  - [5. Metadata and SEO](#5-metadata-and-seo)
  - [6. Footer Links](#6-footer-links)
- [Creating Custom Lanyard Textures](#creating-custom-lanyard-textures)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Credits](#credits)

---

## Features

- Interactive 3D lanyard with physics simulation (React Three Fiber + Rapier)
- Personalized badge generator with dark/light variants
- Export badge as PNG
- Shareable lanyard URLs with encryption
- Animated text effects and transitions
- Responsive design (mobile-first)
- Dithered animated background
- Sponsor/partner logo carousel

---

## Quick Start

### Option 1: Fork on GitHub

1. Fork this repository
2. Clone your fork locally
3. Install dependencies: `npm install` or `pnpm install`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

### Option 2: Use with v0

1. Go to [v0.app](https://v0.app)
2. Import this repository or start a new chat
3. Make changes using natural language prompts
4. Deploy directly to Vercel

---

## Customization Guide

### 1. Event Information

#### Hero Section (`components/hero-section.tsx`)

Update the main event details:

```tsx
// Line ~35-38: Event date and location
<DecryptedText
    text="Thursday February 5th, 2026 - New York City"  // <-- Change this
    ...
/>

// Lines ~40-50: Event title (currently "Prompt to Production")
<TextEffect ...>
    Prompt           // <-- Change line 1
</TextEffect>
<TextEffect ...>
    to Production    // <-- Change line 2
</TextEffect>

// Lines ~52-57: Event description
<TextEffect ...>
    v0 is getting ready to launch its biggest product update yet...  // <-- Change this
</TextEffect>

// Lines ~66-82: CTA buttons
<Button ...>
    <Link href="#link">  // <-- Update registration link
        Register Now
    </Link>
</Button>
<Button ...>
    <Link href="#link">  // <-- Update contact link
        Contact Host
    </Link>
</Button>
```

### 2. Lanyard Customization

#### Changing City and Date on the Lanyard

The lanyard displays dynamic city and date text. Update these in `components/lanyard-with-controls.tsx`:

```tsx
// Lines 189-190 in the CardTemplate component
<CardTemplate
    ref={cardTemplateRef}
    userName={inputValue}
    variant={cardVariant}
    onTextureReady={handleTextureReady}
    city='San Diego'    // <-- Change to your city
    date='02.07.2026'     // <-- Change to your event date (DD.MM.YYYY format)
/>
```

#### Social Share Message (`components/lanyard-with-controls.tsx`)

Update the share message for social media (around line 113):

```tsx
const shareMessage = appliedName
    ? `I'm at @v0 Prompt to Production San Diego! Check out my personalized lanyard`  // <-- Change this
    : `Check out v0 IRL San Diego! Create your personalized event lanyard`;  // <-- And this
```

#### Export Filename (`components/card-template.tsx`)

Update the downloaded file name (around line 159):

```tsx
link.download = `v0-sd-${userName || "card"}.png`;  // <-- Change "guadalajara" to your city
```

#### OG Images for Social Media (`app/api/og/route.tsx`)

When someone shares a personalized lanyard, dynamic Open Graph images are generated. Update the event details (around lines 57-58):

```tsx
const EVENT_CITY = "SAN DIEGO";  // <-- Change to your city (uppercase)
const EVENT_DATE = "FEBRUARY 2026";  // <-- Change to your event date
```

These values appear on the OG images when sharing lanyard URLs on Twitter, Facebook, LinkedIn, Discord, etc.

### 3. Sponsors and Partners

#### Logo Carousel (`components/hero-section.tsx`)

Add or modify sponsor logos in the InfiniteSlider (around line 92):

```tsx
<InfiniteSlider speedOnHover={20} speed={40} gap={112}>
    <div className="flex items-center">
        <V0Icon size={35} ... />
    </div>
    <div className="flex items-center">
        <VercelWordmarkIcon size={20} ... />
    </div>
    <div className="flex items-center">
        <GlobantLogoIcon size={20} ... />  // <-- Add/remove sponsor icons
    </div>
    // Add more sponsors here
</InfiniteSlider>
```

To add a new sponsor icon:
1. Create the icon component in `components/icons/`
2. Import it in `hero-section.tsx`
3. Add it to the InfiniteSlider

### 4. Agenda

#### Event Schedule (`components/agenda.tsx`)

Modify the agenda items (around line 35):

```tsx
<div className="pb-6">
    <div className="font-medium space-x-2">
        <span className='text-muted-foreground font-mono'>11:00</span>  // <-- Time
        <span>Welcome Video</span>  // <-- Title
    </div>
    <p className="text-muted-foreground mt-4">
        A special welcome from the v0 Team  // <-- Description
    </p>
</div>
// Repeat for each agenda item
```

### 5. Metadata and SEO

#### Page Metadata (`app/layout.tsx`)

Update the site metadata (around line 14):

```tsx
export const metadata: Metadata = {
    title: 'v0 IRL — Prompt to Production | SD February 7th, 2026',  // <-- Page title
    description: 'v0 is launching its biggest product update yet...',  // <-- Meta description
    generator: 'v0.app',
}
```

### 6. Footer Links

#### Footer Navigation (`components/footer.tsx`)

Update the footer links array (around line 5):

```tsx
const links = [
    { title: 'Vercel', href: 'https://vercel.com/' },
    { title: 'v0', href: 'https://v0.dev/' },
    { title: 'Meetup SDK', href: 'https://meetup-sdk.vercel.com/' },
    { title: 'v0 IRL', href: 'https://v0.app/irl' },
    // Add your own links here
]
```

---

## Creating Custom Lanyard Textures

The lanyard uses base texture images located in the public folder:

- `/card.glb` - Lanyard 3D model, it includes the default card texture (dark) without customization
- `/card-base-dark.png` - Dark variant card texture
- `/card-base-light.png` - Light variant card texture

### Using the Existing Textures

The current textures include the "Prompt to Production" branding. To customize for your event while keeping this aesthetic:

1. Update city and date via the `city` and `date` props in `lanyard-with-controls.tsx` (lines 189-190)
2. The text is rendered dynamically on the canvas

### Creating Your Own Textures

Follow these steps if you want to create your own textures:
1. Create your template using any design tool (Figma, Photoshop, etc)
2. The layout has to be 1:1 aspect ratio (square)
3. Consider safe zones for dynamic text placement (see attached figma file as an example of safe zones)
4. Color considerations for dark/light variants (or more if you decide to extend the initial template)
5. You need to modify the 3D texture (`card.blg`) as well so it renders the default texture on the initial load

### How to edit `card.glb` (3D model) file

1. Go to [this page](https://modelviewer.dev/editor/), drag and drop the `card.glb` file to preview the model
2. Click on the palette icon tab, and under the **texture** option, load your texture image
![Modify texture example](/public/modify-texture.png)
3. Go back to the initial tab, and click **Download scene**
![Export texture example](/public/export-texture.png)
4. It'll download a zip file with all your model files. You just need to drag and drop the `card.glb` file and replace it into your `/public` folder.
![Exported folder with texture file](/public/folder-texture.png)

### Texture Specifications

- **Dimensions:** 1376 x 1376 pixels (any 1:1 ratio works, the larger the better resolution will have)
- **Format:** PNG with transparency support
- **Files to replace:**
  - `/public/card-base-dark.png`
  - `/public/card-base-light.png`

### Design Guidelines

1. Keep the bottom ~400px area clear for the user's name
2. Keep the top ~150px area clear for city/date text
3. Ensure good contrast for text readability
4. Test both dark and light variants

### Template Files

- [Figma template with safe zones](https://www.figma.com/design/uQPzmYgpWdI6xvK4qzaT7X/Untitled?node-id=0-1&t=ygsBkAQ4NTxKhiyh-1)

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Home page composition
│   ├── globals.css         # Global styles and theme tokens
│   └── lanyard/
│       └── page.tsx        # Shareable lanyard page
├── components/
│   ├── hero-section.tsx    # Main hero with event info
│   ├── features-3.tsx      # Event highlights cards
│   ├── agenda.tsx          # Event schedule
│   ├── call-to-action.tsx  # Registration CTA section
│   ├── footer.tsx          # Footer with links
│   ├── header.tsx          # Navigation header
│   ├── lanyard-with-controls.tsx  # Lanyard + customization UI
│   ├── card-template.tsx   # Badge texture generator
│   ├── Dither.tsx          # Animated background effect
│   ├── DecryptedText.tsx   # Animated text reveal
│   ├── ui/
│   │   └── lanyard.tsx     # 3D lanyard component (R3F)
│   ├── icons/              # SVG icon components
│   └── motion-primitives/  # Animation components
├── lib/
│   └── utils.ts            # Utility functions
├── types/                  # TypeScript definitions
└── public/
    ├── card-base-dark.png  # Dark lanyard texture
    ├── card-base-light.png # Light lanyard texture
    └── *.png               # Favicon and other assets
```

---

## Deployment

### Deploy to Vercel

The easiest way to deploy is with Vercel:

1. Push your customized code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build

### Environment Variables

No environment variables are required for the base template.

---

## Credits

Built with:
- [v0.app](https://v0.app) - AI-powered development
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React Three Fiber](https://r3f.docs.pmnd.rs/) - 3D rendering
- [Rapier](https://rapier.rs/) - Physics simulation
- [Tailark](https://tailark.com/) - UI components
- [React Bits](https://reactbits.dev/) - Animation primitives
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## License

Feel free to use this template for your v0 IRL events. Attribution appreciated but not required.

---

**Questions?** Open an issue or reach out to the v0 community.
