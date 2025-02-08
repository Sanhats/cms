import { notFound } from "next/navigation"
import Layout from "../../../components/Layout"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })

  const { data: post } = await supabase.from("posts").select("*").eq("slug", params.slug).single()

  if (!post) {
    notFound()
  }

  return (
    <Layout>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  )
}

