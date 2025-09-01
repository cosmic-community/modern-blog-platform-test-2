// app/posts/[slug]/page.tsx
import { getPost } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { format } from 'date-fns'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.metadata?.excerpt || 'Read this article on Modern Blog Platform',
    openGraph: {
      title: post.title,
      description: post.metadata?.excerpt || 'Read this article on Modern Blog Platform',
      images: post.metadata?.featured_image ? [post.metadata.featured_image.imgix_url] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata?.publication_date 
    ? format(new Date(post.metadata.publication_date), 'MMMM dd, yyyy')
    : null

  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 max-w-4xl py-16">
        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Articles
            </Link>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {post.metadata?.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-8">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                width="1200"
                height="600"
                className="w-full h-96 object-cover rounded-lg card-shadow-lg"
              />
            </div>
          )}

          {/* Author & Date */}
          <div className="flex items-center space-x-6 text-gray-600 border-b border-gray-200 pb-6">
            {post.metadata?.author && (
              <div className="flex items-center space-x-3">
                {post.metadata.author.metadata?.profile_picture && (
                  <img
                    src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    width="40"
                    height="40"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <Link
                    href={`/authors/${post.metadata.author.slug}`}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.metadata.author.title}
                  </Link>
                </div>
              </div>
            )}
            {publishedDate && (
              <time className="text-gray-600" dateTime={post.metadata.publication_date}>
                {publishedDate}
              </time>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose-custom">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.metadata?.content || ''}
          </ReactMarkdown>
        </div>

        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {post.metadata.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors"
                  style={{
                    backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
                    color: category.metadata?.color || '#374151'
                  }}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.metadata?.author && post.metadata.author.metadata?.bio && (
          <div className="mt-12 p-8 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              {post.metadata.author.metadata?.profile_picture && (
                <img
                  src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  width="60"
                  height="60"
                  className="w-15 h-15 rounded-full object-cover"
                />
              )}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  About {post.metadata.author.title}
                </h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {post.metadata.author.metadata.bio}
                </p>
                <div className="flex space-x-4">
                  {post.metadata.author.metadata?.website && (
                    <a
                      href={post.metadata.author.metadata.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {post.metadata.author.metadata?.twitter && (
                    <a
                      href={`https://twitter.com/${post.metadata.author.metadata.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Twitter
                    </a>
                  )}
                  {post.metadata.author.metadata?.linkedin && (
                    <a
                      href={post.metadata.author.metadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </article>
    </div>
  )
}