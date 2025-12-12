import Link from 'next/link';
import Footer from '../../components/Footer';
import { blogPosts } from '../../lib/blogPosts';

export default function BlogPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute left-1/3 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-1/3 top-60 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative px-6 py-20">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Blog</h1>
          <p className="text-lg text-slate-300">
            Insights, updates, and stories from the BlackRoad OS team
          </p>
        </div>

        {/* Featured Post */}
        <div className="mx-auto mb-16 max-w-6xl">
          <Link
            href={`/blog/${blogPosts[0].slug}`}
            className="group block overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition hover:border-cyan-500/50"
          >
            <div className="grid gap-8 p-8 md:grid-cols-2">
              <div className="flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                <svg className="h-24 w-24 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
                    {blogPosts[0].category}
                  </span>
                  <span className="text-sm text-slate-400">{blogPosts[0].readTime}</span>
                </div>
                <h2 className="mb-3 text-3xl font-bold text-white group-hover:text-cyan-400 transition">
                  {blogPosts[0].title}
                </h2>
                <p className="mb-4 text-slate-300">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span>{blogPosts[0].author}</span>
                  <span>•</span>
                  <time>{new Date(blogPosts[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold text-white">Recent Posts</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition hover:border-cyan-500/50"
              >
                <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                  <svg className="h-16 w-16 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-400 transition">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-300">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mx-auto mt-20 max-w-4xl rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-bold text-white">Stay Updated</h2>
          <p className="mb-6 text-slate-300">
            Subscribe to our newsletter for the latest updates and insights
          </p>
          <form className="mx-auto flex max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
            />
            <button
              type="submit"
              className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 font-medium text-white transition hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
