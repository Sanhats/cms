"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase-client"

export default function SignIn() {
 
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    }  finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full p-2 bg-red-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Loading..." : "Sign In with Google"}
      </button>
    </div>
  )
}

