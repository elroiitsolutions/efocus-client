import { Link } from "react-router-dom"
import { blogPosts } from "@/features/blog/data/blog.data"

export default function BlogSection() {
  // Show first 3 blog posts on homepage
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1380px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Latest Technical Blog
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Practical advice on SMT consumables, test lead selection, and line consolidation.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-[10px] border border-[#eaeaea] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full text-left"
            >
              {/* Blog Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400/f4f5f8/ee2761?text=Blog"
                  }}
                />
                <span className="absolute top-4 left-4 bg-[#B20602] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.tag}
                </span>
              </div>

              {/* Blog Body details */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[12px] font-semibold text-[#777777]">
                    {post.date}
                  </span>
                  <h3 className="font-heading text-[18px] font-bold text-[#222222] mt-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[13.6px] text-[#555555] mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#eaeaea] flex items-center">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-[#B20602] hover:text-[#900502] text-[13.6px] font-bold flex items-center gap-1 transition-colors"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
