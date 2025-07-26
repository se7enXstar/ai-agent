"use client"

import { useState } from "react"
import TicketPreview from "../../components/TicketPreview"
import ChatInterface from "../../components/ChatInterface"
import { Button } from "../../components/ui/button"
import { X } from "lucide-react"

interface PreviewData {
  titleSuggestions: string[]
  description: string
  summary: string
}

export default function AssistantPage() {
  const [previewData, setPreviewData] = useState<PreviewData>({
    titleSuggestions: [],
    description: "",
    summary: ""
  })
  const [showSidebar, setShowSidebar] = useState(false)

  const handleUpdatePreview = (data: Partial<PreviewData>) => {
    setPreviewData(prev => ({
      ...prev,
      ...data
    }))
  }

  const handleUpdateTitle = (title: string) => {
    setPreviewData(prev => ({
      ...prev,
      titleSuggestions: [title]
    }))
  }

  const handleUpdateDescription = (description: string) => {
    setPreviewData(prev => ({
      ...prev,
      description
    }))
  }

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile: Show button to open sidebar */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-800 text-white px-4 py-2 rounded shadow"
        onClick={() => setShowSidebar(true)}
        aria-label="Show Ticket Preview"
      >
        Show Ticket
      </button>

      {/* Left Sidebar - Ticket Preview (collapsible on mobile, flex-basis on desktop) */}
      <div
        className={
          `h-full bg-gray-900 z-40 transition-transform duration-300
          md:relative md:translate-x-0 md:basis-1/3 md:max-w-none
          fixed top-0 left-0 w-full max-w-xs
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          md:block`
        }
        style={{ boxShadow: showSidebar ? '0 0 0 9999px rgba(0,0,0,0.4)' : undefined }}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end p-2">
          <Button size="icon" variant="ghost" onClick={() => setShowSidebar(false)} aria-label="Close Ticket Preview">
            <X className="w-6 h-6" />
          </Button>
        </div>
        <TicketPreview
          titleSuggestions={previewData.titleSuggestions}
          description={previewData.description}
          summary={previewData.summary}
          onUpdateTitle={handleUpdateTitle}
          onUpdateDescription={handleUpdateDescription}
        />
      </div>

      {/* Right Side - Chat Interface (full width on mobile, 2/3 on desktop) */}
      <div className="flex-1 md:basis-2/3 md:max-w-none">
        <ChatInterface onUpdatePreview={handleUpdatePreview} />
      </div>
    </div>
  )
}