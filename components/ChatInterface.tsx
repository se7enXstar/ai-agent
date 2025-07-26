import { useState, useRef } from "react"
import { Card, CardContent } from "components/ui/card"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { Badge } from "components/ui/badge"
import { Paperclip } from "lucide-react"

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  suggestions?: string[]
  selectedOption?: string
}

interface ChatInterfaceProps {
  onUpdatePreview: (data: { titleSuggestions?: string[], description?: string, summary?: string }) => void
}

export default function ChatInterface({ onUpdatePreview }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [ticketData, setTicketData] = useState({
    purpose: "",
    selectedTitle: "",
    selectedCategory: "",
    selectedDescription: "",
    summary: ""
  })
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    }

    setMessages(prev => [...prev, newMessage])
    
    // Process based on current step
    processStep(inputValue)
    setInputValue("")
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      // You can add upload logic here
    } else {
      setPdfFile(null)
      // Optionally show an error for non-PDF files
    }
  }

  const processStep = (input: string) => {
    switch (currentStep) {
      case 0: // Initial input - ask for purpose
        setTicketData(prev => ({ ...prev, purpose: input }))
        addAIMessage("What is the purpose of this ticket?")
        setCurrentStep(1)
        break
      
      case 1: // Purpose input - suggest titles
        setTicketData(prev => ({ ...prev, purpose: input }))
        const titleSuggestions = [
          "Bug Fix Request",
          "Feature Enhancement",
          "Performance Issue",
          "User Experience Improvement"
        ]
        addAIMessage("Based on your purpose, here are 4 suggested ticket titles:", titleSuggestions)
        setCurrentStep(2)
        break
      
      case 2: // Title selection - suggest categories
        setTicketData(prev => ({ ...prev, selectedTitle: input }))
        const categorySuggestions = [
          "Frontend",
          "Backend", 
          "Database",
          "Infrastructure"
        ]
        addAIMessage("Great choice! Here are 4 suggested categories:", categorySuggestions)
        setCurrentStep(3)
        break
      
      case 3: // Category selection - ask for description
        setTicketData(prev => ({ ...prev, selectedCategory: input }))
        addAIMessage("Please provide a brief description (when, whom, where, what, etc.)")
        setCurrentStep(4)
        break
      
      case 4: // Description input - suggest enhanced descriptions
        const descriptionSuggestions = [
          "Fix login authentication issue affecting users in the mobile app during peak hours",
          "Resolve database connection timeout that occurs when processing large datasets",
          "Update user interface to improve accessibility for users with visual impairments",
          "Optimize API response time for search functionality in the web application"
        ]
        addAIMessage("Here are 4 enhanced descriptions based on your input:", descriptionSuggestions)
        setCurrentStep(5)
        break
      
      case 5: // Description selection - generate summary
        setTicketData(prev => ({ ...prev, selectedDescription: input }))
        const summarySuggestions = [
          "This ticket addresses a critical authentication issue in the mobile app that affects user experience during peak usage hours.",
          "The ticket focuses on resolving database performance issues that impact system reliability when handling large data volumes.",
          "This enhancement improves accessibility compliance and user experience for users with visual impairments.",
          "The optimization targets API performance to enhance search functionality and overall application responsiveness."
        ]
        addAIMessage("Based on your selections, here are 4 summary options:", summarySuggestions)
        setCurrentStep(6)
        break
      
      case 6: // Summary selection - finalize
        setTicketData(prev => ({ ...prev, summary: input }))
        addAIMessage("Perfect! Your ticket has been created successfully. Here's a summary of what we've accomplished:")
        setCurrentStep(7)
        break
    }
  }

  const addAIMessage = (content: string, suggestions?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'ai',
      content,
      suggestions
    }
    setMessages(prev => [...prev, newMessage])
    
    // Update preview based on current data
    updatePreview()
  }

  const updatePreview = () => {
    const titleSuggestions = ticketData.selectedTitle ? [ticketData.selectedTitle] : []
    const description = ticketData.selectedDescription || ""
    const summary = ticketData.summary || ""
    
    onUpdatePreview({
      titleSuggestions,
      description,
      summary
    })
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-screen">
      {/* Chat Header */}
      <div className="bg-gray-800 text-white p-4">
        <h2 className="text-lg font-semibold">This is the same with chat prompt.</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-md ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}`}>
              <CardContent className="p-3">
                <div className="flex items-start space-x-2">
                  {message.type === 'ai' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="mr-2 mb-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2 items-center">
          {/* Attach Button */}
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button type="button" variant="outline" size="icon" onClick={handleAttachClick} className="mr-2">
            <Paperclip className="w-5 h-5" />
          </Button>
          {pdfFile && (
            <span className="text-xs text-gray-600 truncate max-w-[120px]">{pdfFile.name}</span>
          )}
          <Input
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
} 