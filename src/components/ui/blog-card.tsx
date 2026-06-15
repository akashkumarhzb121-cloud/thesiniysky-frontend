"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Heart, Bookmark, ArrowRight } from "lucide-react";

interface BlogAuthor {
  avatar?: string;
  name: string;
  email?: string;
}

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  thumbnail?: string;
  author?: BlogAuthor;
  readTime?: number;
  likes?: number;
  bookmarks?: number;
  publishedAt: string;
  featured?: boolean;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  category,
  thumbnail,
  author,
  readTime = 5,
  likes = 0,
  publishedAt,
  featured = false,
}: BlogCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative overflow-hidden h-48">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{new Date(publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={"/blog/" + slug}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Author & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                  {author.name?.charAt(0) || "A"}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {author.name}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {likes}
            </span>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={"/blog/" + slug}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// Team/Author Card Component
interface AuthorCardProps {
  avatar: string;
  name: string;
  email?: string;
  role?: string;
  onManage?: () => void;
}

export function AuthorCard({ avatar, name, email, role, onManage }: AuthorCardProps) {
  return (
    <li className="py-5 flex items-start justify-between">
      <div className="flex gap-3">
        <img src={avatar} className="flex-none w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" alt={name} />
        <div>
          <span className="block text-sm text-gray-700 dark:text-gray-200 font-semibold">{name}</span>
          <span className="block text-sm text-gray-500 dark:text-gray-400">{email}</span>
          {role && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
              {role}
            </span>
          )}
        </div>
      </div>
      {onManage && (
        <button
          type="button"
          className="text-gray-600 dark:text-gray-400 text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={onManage}
        >
          View Profile
        </button>
      )}
    </li>
  );
}