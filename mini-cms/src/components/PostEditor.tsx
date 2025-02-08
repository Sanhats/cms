"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../lib/supabase-client"
import { useAuth } from "../contexts/AuthContext"
import dynamic from "next/dynamic"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import "react-quill/dist/quill.snow.css"

interface Category {
  id: number
  name: string
}

interface PostEditorProps {
  post?: {
    id: string
    title: string
    content: string
    category_id: number
  }
}

export default function PostEditor({ post }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [content, setContent] = useState(post?.content || "")
  const [categoryId, setCategoryId] = useState<number | null>(post?.category_id || null)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data, error } = await supabase.from("categories").select("*").order("name")

    if (error) console.log("error", error)
    else setCategories(data || [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const postData = {
      title,
      content,
      category_id: categoryId,
      user_id: user.id,
    }

    if (post) {
      // Update existing post
      const { error } = await supabase.from("posts").update(postData).eq("id", post.id)

      if (error) console.log("error", error)
      else router.push("/dashboard")
    } else {
      // Create new post
      const {  error } = await supabase.from("posts").insert([postData])

      if (error) console.log("error", error)
      else router.push("/dashboard")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
        className="w-full p-2 border rounded"
        required
      />
      <select
        value={categoryId || ""}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your post content here..."
        className="h-64 mb-12"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {post ? "Update Post" : "Create Post"}
      </button>
    </form>
  )
}

