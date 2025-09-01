// app/categories/[slug]/page.tsx
import { getCategories, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - Modern Blog Platform`,
    description: category.metadata?.description || `Articles about ${category.title}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find(cat => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
               style={{ 
                 backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6'
               }}>
            <span className="text-3xl font-bold"
                  style={{ color: category.metadata?.color || '#374151' }}>
              {category.title.charAt(0)}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {category.title}
          </h1>

          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No articles found in this category yet.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-600">
                {posts.length} article{posts.length === 1 ? '' : 's'} found
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}