# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15 + MDX blog platform** built for content-heavy websites with sophisticated component integration. The project is optimized for **Cloudflare Pages deployment** and features a unique **Smart Component Loading System** that dynamically maps post-specific React components.

## Essential Commands

### Development
```bash
npm run dev                    # Start Next.js development server
npm run build                  # Build for production
npm run lint                   # Run ESLint
npm run preview               # Build and preview with Cloudflare Pages locally
```

### Smart Component System
```bash
npm run components:scan       # Scan for post components
npm run components:update     # Update component mappings  
npm run components:sync       # Sync components (alias for update)
npm run prebuild             # Full smart prebuild (runs before build)
```

### Cloudflare Deployment
```bash
npm run pages:build          # Build for Cloudflare Pages
npm run deploy               # Deploy to Cloudflare Pages
npm run cf-typegen           # Generate Cloudflare types
```

## Core Architecture

### Smart Component Loading System

The **most critical feature** is the automated component loading system (`/lib/simple-component-loader.ts`):

- **Auto-maintained mappings**: Component mappings are automatically generated and updated
- **Static imports**: All components use static imports for performance
- **Graceful fallback**: Falls back to global components if post-specific components fail
- **Build integration**: Runs during prebuild to ensure mappings are current

### Content Structure

Each blog post follows this **strict pattern**:
```
/content/posts/[slug]/
├── content.mdx        # Main MDX content
├── metadata.ts        # Post metadata export
└── components/        # Post-specific React components
    ├── index.ts       # Must export all components
    └── *.tsx         # Individual component files
```

### Automated Build Pipeline

The build process is orchestrated by `scripts/smart-prebuild.js`:

1. **Scan**: Detect all posts with components
2. **Update**: Regenerate component mappings in `simple-component-loader.ts`
3. **Build**: Next.js builds with current mappings

**Critical**: Never manually edit the component mappings in `simple-component-loader.ts` - they are auto-generated.

## Key Files and Directories

### Core System Files
- `/lib/simple-component-loader.ts` - Component loading logic (auto-generated sections)
- `/scripts/smart-prebuild.js` - Build automation orchestrator  
- `/scripts/scan-components.js` - Component detection
- `/scripts/update-component-mappings.js` - Mapping generation
- `/types/post.ts` - TypeScript definitions

### Content Management
- `/content/posts/` - All blog posts
- `/lib/metadata-loader.ts` - Post metadata handling
- `/app/blog/[slug]/page.tsx` - Blog post rendering

### UI Components
- `/components/blog/` - Blog-specific UI components
- `/components/ui/` - Shadcn/ui components
- `/components/mdx/global-components/` - Global MDX components

## Working with Content

### Creating New Posts

1. **Create directory**: `content/posts/[slug]/`
2. **Add metadata**: Create `metadata.ts` with required PostMeta interface
3. **Write content**: Create `content.mdx` 
4. **Add components** (optional): Create `components/` directory with `index.ts` export

### Adding Post-Specific Components

When adding custom components to a post:

1. Create `components/` directory in post folder
2. Create component files (`.tsx`)
3. **Must export** all components from `components/index.ts`
4. Run `npm run components:sync` to update mappings
5. Components become available in MDX via their export names

Example `components/index.ts`:
```typescript
export { default as MyChart } from './my-chart';
export { default as CustomTable } from './custom-table';
```

### Component Loading Behavior

- **Post-specific components** override global components with same name
- **Global components** are always available (Alert, Card, Table, etc.)
- **Fallback**: If post components fail to load, global components are used
- **Performance**: All imports are static for optimal bundling

## Technology Stack

### Core Framework
- **Next.js 15.3.3** with App Router
- **React 19** with Server Components
- **TypeScript 5** with strict typing
- **Tailwind CSS 4** with PostCSS plugin

### Content Processing
- **MDX** ecosystem for content
- **Gray Matter** for frontmatter
- **Remark/Rehype** plugins for processing

### UI Library
- **Shadcn/ui** with Radix UI primitives
- **Framer Motion** for animations
- **Chart.js** for data visualization
- **React Flow** for diagrams

### Deployment
- **Cloudflare Pages** with edge optimization
- **@cloudflare/next-on-pages** for edge deployment
- **Wrangler** for local preview and deployment

## Critical Development Notes

### Component System Rules
1. **Never manually edit** component mappings in `simple-component-loader.ts`
2. **Always run** `npm run components:sync` after adding/removing post components
3. **Export all components** from `components/index.ts` in each post
4. **Use TypeScript** for all components

### Build Process
- **Prebuild automatically runs** before build via package.json script
- **Component mappings regenerate** on every build
- **Static imports ensure** optimal performance

### Content Guidelines
- **MDX files** support full React component syntax
- **Metadata is required** for all posts via `metadata.ts`
- **Reading time** is auto-calculated
- **Slugs must match** directory names exactly

## Debugging

### Component Loading Issues
1. Check `components/index.ts` exports in post directory
2. Run `npm run components:scan` to see detected components
3. Verify component syntax and TypeScript compliance
4. Check browser console for loading errors

### Build Failures
1. Ensure all post directories have valid `metadata.ts`
2. Check MDX syntax validity
3. Verify component exports
4. Run `npm run lint` to check for syntax issues

### Cloudflare Deployment Issues
1. Use `npm run preview` to test locally
2. Check that build output is compatible with edge runtime
3. Verify environment variables and bindings