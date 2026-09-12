import { Link } from "react-router-dom"
import { blogPosts } from "../data/blog.data"

export default function BlogPage() {
  return (
    <div className="bg-[#f9f9fb] min-h-screen py-16">
      <div className="site-container">
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h1 className="font-heading text-4xl font-extrabold text-[#222222] tracking-tight">
            Latest Technical Guides & Guides
          </h1>
          <p className="text-[#777777] text-[16px] mt-3">
            Practical advice on SMT consumables, test lead selection, and line consolidation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-[10px] border border-[#eaeaea] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {/* Blog Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/f4f5f8/ee2761?text=eFOCUS+Blog"
                  }}
                />
                <span className="absolute top-4 left-4 bg-[#c8102e] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              {/* Blog Info */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-[12px] font-semibold text-[#777777]">
                  {post.date}
                </span>
                <h2 className="font-heading text-[18px] font-bold text-[#222222] mt-2 line-clamp-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-[13.6px] text-[#555555] mt-3 line-clamp-3 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-[#eaeaea] flex items-center">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-[#c8102e] hover:text-[#a80c25] text-[13.6px] font-bold flex items-center gap-1 transition-colors"
                  >
                    Read Full Article &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
