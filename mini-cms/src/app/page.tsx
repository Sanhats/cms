import Link from "next/link"
import Layout from "../components/Layout"

export default function Home() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Mini CMS</h1>
        <p className="text-xl text-center mb-8">
          A simple and lightweight content management system for bloggers and content creators.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          <Link href="/blogs" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            View Blogs
          </Link>
        </div>
      </div>
    </Layout>
  )
}

