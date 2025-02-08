"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase-client"
import { useAuth } from "../contexts/AuthContext"

interface Post {
  id: string
  title: string
  created_at: string
  published: boolean
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("posts")
      .select("id, title, created_at, published")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) console.log("error", error)
    else setPosts(data || [])
  }

  async function togglePublishStatus(postId: string, currentStatus: boolean) {
    const { error } = await supabase.from("posts").update({ published: !currentStatus }).eq("id", postId)

    if (error) {
      console.log("error", error)
    } else {
      setPosts(posts.map((post) => (post.id === postId ? { ...post, published: !currentStatus } : post)))
    }
  }

  async function deletePost(postId: string) {
    const { error } = await supabase.from("posts").delete().eq("id", postId)

    if (error) {
      console.log("error", error)
    } else {
      setPosts(posts.filter((post) => post.id !== postId))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <button
        onClick={() => router.push("/new-post")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        New Post
      </button>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => router.push(`/edit-post/${post.id}`)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Edit
              </button>
              <button
                onClick={() => togglePublishStatus(post.id, post.published)}
                className={`px-3 py-1 rounded ${post.published ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}
              >
                {post.published ? "Unpublish" : "Publish"}
              </button>
              <button
                onClick={() => deletePost(post.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

