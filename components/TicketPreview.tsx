import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X } from "lucide-react"

interface TicketPreviewProps {
  titleSuggestions?: string[]
  description?: string
  summary?: string
  onUpdateTitle?: (title: string) => void
  onUpdateDescription?: (description: string) => void
}

export default function TicketPreview({ 
  titleSuggestions = [], 
  description = "", 
  summary = "",
  onUpdateTitle,
  onUpdateDescription
}: TicketPreviewProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  // Generate contextual categories based on title content
  const getContextualCategories = (title: string) => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('bug') || titleLower.includes('fix') || titleLower.includes('error')) {
      return ['Critical', 'High Priority', 'Bug Fix', 'Error Resolution', 'Debugging']
    } else if (titleLower.includes('feature') || titleLower.includes('enhancement') || titleLower.includes('improvement')) {
      return ['Feature Request', 'Enhancement', 'User Experience', 'Functionality', 'Innovation']
    } else if (titleLower.includes('performance') || titleLower.includes('speed') || titleLower.includes('optimization')) {
      return ['Performance', 'Optimization', 'Speed', 'Efficiency', 'Scalability']
    } else if (titleLower.includes('ui') || titleLower.includes('interface') || titleLower.includes('design')) {
      return ['UI/UX', 'Design', 'Interface', 'User Experience', 'Visual']
    } else if (titleLower.includes('api') || titleLower.includes('backend') || titleLower.includes('server')) {
      return ['Backend', 'API', 'Server', 'Database', 'Infrastructure']
    } else if (titleLower.includes('mobile') || titleLower.includes('app') || titleLower.includes('ios') || titleLower.includes('android')) {
      return ['Mobile', 'App Development', 'iOS', 'Android', 'Cross-platform']
    } else if (titleLower.includes('security') || titleLower.includes('auth') || titleLower.includes('login')) {
      return ['Security', 'Authentication', 'Authorization', 'Privacy', 'Encryption']
    } else {
      return ['General', 'Support', 'Maintenance', 'Documentation', 'Testing']
    }
  }

  const currentTitle = titleSuggestions.length > 0 && titleSuggestions[0] ? titleSuggestions[0] : ""
  const contextualCategories = currentTitle ? getContextualCategories(currentTitle) : ['General', 'Support', 'Maintenance', 'Documentation', 'Testing']

  const handleEditTitle = () => {
    setEditTitle(currentTitle)
    setIsEditingTitle(true)
  }

  const handleSaveTitle = () => {
    if (onUpdateTitle) {
      onUpdateTitle(editTitle)
    }
    setIsEditingTitle(false)
  }

  const handleCancelTitle = () => {
    setIsEditingTitle(false)
    setEditTitle("")
  }

  const handleEditDescription = () => {
    setEditDescription(description)
    setIsEditingDescription(true)
  }

  const handleSaveDescription = () => {
    if (onUpdateDescription) {
      onUpdateDescription(editDescription)
    }
    setIsEditingDescription(false)
  }

  const handleCancelDescription = () => {
    setIsEditingDescription(false)
    setEditDescription("")
  }

  return (
    <div className="w-full bg-gray-900 p-6 h-screen">
      {/* Single Big Card containing all sections */}
      <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-white text-xl font-bold text-center">Ticket Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-6">
          
          {/* Title Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg font-bold">Title</h3>
              {!isEditingTitle && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEditTitle}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {isEditingTitle ? (
                <div className="space-y-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="Enter title..."
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleSaveTitle} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelTitle}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-md p-3">
                  <p className="text-gray-200 text-sm font-medium">
                    {currentTitle || "Title will appear here..."}
                  </p>
                </div>
              )}
              
              {/* Contextual Categories */}
              <div>
                <p className="text-gray-300 text-xs font-medium mb-2">Related Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {contextualCategories.map((category, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-purple-600 text-white hover:bg-purple-500 cursor-pointer text-xs"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-lg font-bold">Description</h3>
              {!isEditingDescription && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleEditDescription}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {isEditingDescription ? (
              <div className="space-y-2">
                <Textarea
                  value={editDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white min-h-32 h-48"
                  placeholder="Enter description..."
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleSaveDescription} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelDescription}>
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-700 rounded-md p-3 min-h-32 h-48">
                <p className="text-gray-200 text-sm">
                  {description || "Description will appear here based on the selected title and category..."}
                </p>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-3">Summary</h3>
            <div className="bg-gray-700 rounded-md p-3 min-h-20 h-24">
              <p className="text-gray-200 text-sm">
                {summary || "Summary will be generated here..."}
              </p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
} 