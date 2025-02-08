import Layout from "../../components/Layout"
import PostEditor from "../../components/PostEditor"

export default function NewPostPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostEditor />
    </Layout>
  )
}

