import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-purple-900 px-6 py-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-white flex items-center justify-center">
              <span className="text-purple-900 font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold text-lg uppercase tracking-wide">
              Social Dept
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
} 