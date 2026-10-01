"use client";

import { blogPosts } from "@/lib/constants";

export default function BlogSection() {
  return (
    <section className="py-24 px-4 relative" id="blog">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <span className="text-sm font-medium text-secondary">Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Latest{" "}
              <span className="gradient-text">Insights</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-xl">
              Stay ahead with expert insights on productivity, automation, and the future of work.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
            id="blog-view-all"
          >
            View All Posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article
              key={i}
              className="group rounded-2xl overflow-hidden border border-border bg-card-bg hover:border-primary/20 transition-all duration-500 hover:shadow-lg cursor-pointer"
              id={`blog-post-${i}`}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 via-accent-pink/10 to-secondary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-text-primary/5">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm text-text-primary border border-border">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-text-primary">eF</span>
                    </div>
                    <span className="text-xs text-text-muted">{post.date}</span>
                  </div>
                  <span className="text-xs text-text-muted">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
