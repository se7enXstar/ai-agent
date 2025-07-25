import { Metadata } from "next"
import Link from "next/link"
import { Button } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: "Social Dept - Accelerated Social Content",
  description: "Accelerated social content for entertainment marketing",
}

export default function Web() {
  return (
    <main className="min-h-screen bg-purple-950 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-12 leading-tight">
            <span className="text-white">Accelerated</span>{" "}
            <span className="text-purple-300">social content</span>{" "}
            <span className="text-white">for entertainment marketing</span>
          </h1>

          {/* Call-to-Action Boxes */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Sign In Box */}
            <div className="bg-purple-800 rounded-lg p-8 hover:bg-purple-700 transition-colors cursor-pointer">
              <Link href="/signin" className="block">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Sign In →</h2>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  Sign in to access the content generation and PDF upload features.
                </p>
              </Link>
            </div>

            {/* Create Account Box */}
            <div className="bg-purple-800 rounded-lg p-8 hover:bg-purple-700 transition-colors cursor-pointer">
              <Link href="/signup" className="block">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Create Account →</h2>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  Create a new account to get started with content generation.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
