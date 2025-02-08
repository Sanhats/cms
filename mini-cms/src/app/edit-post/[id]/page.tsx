"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Layout from "../../../components/Layout"
import PostEditor from "../../../components/PostEditor"
import { supabase } from "../../../lib/supabase-client"

export default function EditPostPage() {
  const [post, setPost] = useState(null)
  const params = useParams()
  const { id } = params

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single()

      if (error) console.log("error", error)
      else setPost(data)
    }

    fetchPost()
  }, [id])

  if (!post) return <div>Loading...</div>

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostEditor post={post} />
    </Layout>
  )
}

