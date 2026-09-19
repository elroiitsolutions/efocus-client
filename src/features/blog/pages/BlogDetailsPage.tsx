import { useParams, Link } from "react-router-dom"
import { blogPosts } from "../data/blog.data"
import { ArrowLeft, Calendar, Tag } from "lucide-react"

export default function BlogDetailsPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold text-[#222222]">Article Not Found</h2>
        <p className="text-[#777777] mt-2">The article you requested could not be found.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 bg-[#c8102e] text-white px-5 py-2.5 rounded-[6px] text-[14px] font-bold"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#f9f9fb] min-h-screen py-16">
      <div className="max-w-[850px] mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#777777] hover:text-[#c8102e] text-[13.6px] font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Technical Guides
        </Link>

        <article className="bg-white rounded-[16px] border border-[#eaeaea] overflow-hidden shadow-sm p-4 sm:p-8 lg:p-12">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-[12.8px] text-[#777777] mb-3">
              <span className="flex items-center gap-1 bg-[#FFF1F2] text-[#c8102e] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10.4px]">
                <Tag size={12} />
                {post.tag}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {post.date}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#222222] leading-tight tracking-tight">
              {post.title}
            </h1>
          </header>

          {/* Featured Image */}
          <div className="rounded-[10px] overflow-hidden aspect-[21/9] w-full bg-gray-100 mb-10">
            <img
              src={post.image}
              alt={post.title}
              className="object-cover w-full h-full"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/1200x500/f4f5f8/ee2761?text=eFOCUS+Blog"
              }}
            />
          </div>

          {/* HTML Content Body */}
          <div
            className="prose prose-slate max-w-none text-[#555555] text-[15.2px] leading-relaxed flex flex-col gap-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}
