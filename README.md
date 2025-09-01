# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/44c2bf40-875c-11f0-8dcc-651091f6a7c0-photo-1677442136019-21780ecad995-1756749080520.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautifully designed, fully responsive blog platform built with Next.js 15 and Tailwind CSS. This modern website showcases your blog content with elegant typography, smooth interactions, and a clean design that puts your content first.

## ✨ Features

- **Dynamic Blog System** - Automated content management with posts, authors, and categories
- **Responsive Design** - Perfectly optimized for desktop, tablet, and mobile devices  
- **SEO Optimization** - Built-in meta tags, structured data, and performance optimization
- **Author Profiles** - Dedicated author pages with social media integration
- **Category Filtering** - Smart content organization with color-coded categories
- **Featured Posts** - Highlighted content with special visual treatment
- **Modern UI/UX** - Clean design with smooth animations and intuitive navigation
- **TypeScript** - Fully typed for better development experience and fewer bugs

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=68b5dc65ef92c548cc5ad302&clone_repository=68b5f6edd2bc3d19e0dd7d45)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your blog content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with authors and categories
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get featured posts only
const featuredPosts = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.featured': true 
  })
  .depth(1)
```

### Fetching Single Post
```typescript
// Get post by slug with full content
const post = await cosmic.objects
  .findOne({
    type: 'posts',
    slug: 'post-slug'
  })
  .depth(1)
```

## 🌐 Cosmic CMS Integration

This application integrates with your Cosmic bucket and automatically pulls in:

- **Posts** - Blog articles with content, featured images, authors, and categories
- **Authors** - Writer profiles with bios, photos, and social media links
- **Categories** - Content organization with descriptions and color coding

The content structure includes:
- Rich markdown content rendering
- Author relationship management
- Category tagging and filtering
- Featured post highlighting
- Publication date sorting

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the deploy button above
2. Connect your repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Fork this repository
2. Connect your repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js applications.

<!-- README_END -->