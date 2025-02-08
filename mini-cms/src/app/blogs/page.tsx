import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Link from "next/link"
import Layout from "../../components/Layout"

const POSTS_PER_PAGE = 10

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createServerComponentClient({ cookies })

  const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page) : 1
  const offset = (page - 1) * POSTS_PER_PAGE

  const { data: posts, count } = await supabase
    .from("posts")
    .select("id, title, created_at, slug", { count: "exact" })
    .eq("published", true)
    .order("created_at", { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1)

  const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 0

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <div className="space-y-4 mb-8">
        {posts?.map((post) => (
          <div key={post.id} className="border p-4 rounded">
            <Link href={`/blog/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-500 text-sm">{new Date(post.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {page > 1 && (
          <Link href={`/blogs?page=${page - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/blogs?page=${page + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
            Next
          </Link>
        )}
      </div>
    </Layout>
  )
}

