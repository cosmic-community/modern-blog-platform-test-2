import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const publishedDate = post.metadata?.publication_date 
    ? format(new Date(post.metadata.publication_date), 'MMM dd, yyyy')
    : null

  return (
    <article className="bg-white rounded-lg card-shadow overflow-hidden hover:card-shadow-lg transition-all duration-300 group">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <div className="aspect-video overflow-hidden">
          <Link href={`/posts/${post.slug}`}>
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              width="400"
              height="225"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      )}

      <div className="p-6">
        {/* Categories */}
        {post.metadata?.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            {post.metadata?.author?.metadata?.profile_picture && (
              <img
                src={`${post.metadata.author.metadata.profile_picture.imgix_url}?w=60&h=60&fit=crop&auto=format,compress`}
                alt={post.metadata.author.title}
                width="24"
                height="24"
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            {post.metadata?.author && (
              <Link
                href={`/authors/${post.metadata.author.slug}`}
                className="font-medium hover:text-gray-900 transition-colors"
              >
                {post.metadata.author.title}
              </Link>
            )}
          </div>
          {publishedDate && (
            <time dateTime={post.metadata.publication_date}>
              {publishedDate}
            </time>
          )}
        </div>
      </div>
    </article>
  )
}