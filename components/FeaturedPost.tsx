import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types'

interface FeaturedPostProps {
  post: Post
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const publishedDate = post.metadata?.publication_date 
    ? format(new Date(post.metadata.publication_date), 'MMM dd, yyyy')
    : null

  return (
    <article className="bg-white rounded-xl card-shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-blue-100">
      {/* Featured Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </span>
      </div>

      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="aspect-video overflow-hidden relative">
          <Link href={`/posts/${post.slug}`}>
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width="400"
              height="225"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}

      <div className="p-8">
        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.metadata.categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors"
                style={{
                  backgroundColor: category.metadata?.color ? `${category.metadata.color}20` : '#f3f4f6',
                  color: category.metadata?.color || '#374151'
                }}
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-6 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-3">
            {post.metadata?.author?.metadata?.profile_picture && (
              <img
                src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={post.metadata.author.title}
                width="32"
                height="32"
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              {post.metadata?.author && (
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {post.metadata.author.title}
                </Link>
              )}
              {publishedDate && (
                <p className="text-gray-500">
                  {publishedDate}
                </p>
              )}
            </div>
          </div>

          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}