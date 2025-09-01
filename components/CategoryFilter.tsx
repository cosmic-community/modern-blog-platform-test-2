'use client'

import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors font-medium"
      >
        All Posts
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          className="inline-flex items-center px-6 py-3 rounded-full border transition-all font-medium hover:scale-105"
          style={{
            backgroundColor: category.metadata?.color ? `${category.metadata.color}15` : '#f9fafb',
            borderColor: category.metadata?.color || '#e5e7eb',
            color: category.metadata?.color || '#374151'
          }}
        >
          {category.title}
          {category.metadata?.description && (
            <span className="ml-2 text-xs opacity-75">
              ({category.metadata.description.split(',')[0]})
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}