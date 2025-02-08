import Layout from "../../components/Layout"
import SignIn from "../../components/SignIn"

export default function LoginPage() {
  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <SignIn />
      </div>
    </Layout>
  )
}

