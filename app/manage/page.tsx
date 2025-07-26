"use client"

import { useState, useEffect } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Card, CardContent } from "components/ui/card"
import { Badge } from "components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "components/ui/dialog"
import { Textarea } from "components/ui/textarea"
import { Label } from "components/ui/label"
import { Eye, Edit2, Trash2, Save, X } from "lucide-react"

interface Category {
  id: string
  name: string
  description?: string
}

interface User {
  id: string
  username: string
}

interface Ticket {
  id: string
  title: string
  description: string
  summary?: string
  categoryId: string
  userId: string
  createdAt: string
  updatedAt: string
  category: Category
  user: User
}

interface TicketForm {
  title: string
  description: string
  summary: string
  categoryId: string
}

export default function ManagePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTickets, setTotalTickets] = useState(0)
  
  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [editForm, setEditForm] = useState<TicketForm>({
    title: "",
    description: "",
    summary: "",
    categoryId: ""
  })

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        category: selectedCategory
      })

      const response = await fetch(`/api/tickets?${params}`)
      if (!response.ok) throw new Error('Failed to fetch tickets')
      
      const data = await response.json()
      setTickets(data.tickets)
      setTotalPages(data.pagination.totalPages)
      setTotalTickets(data.pagination.total)
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Load data on component mount and when dependencies change
  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchTickets()
  }, [currentPage, itemsPerPage, searchTerm, selectedCategory])

  const handleExport = () => {
    // Export functionality would go here
    console.log("Exporting tickets...")
  }

  const handleView = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setViewModalOpen(true)
  }

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setEditForm({
      title: ticket.title,
      description: ticket.description,
      summary: ticket.summary || "",
      categoryId: ticket.categoryId
    })
    setEditModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      try {
        const response = await fetch(`/api/tickets/${id}`, {
          method: 'DELETE'
        })

        if (!response.ok) throw new Error('Failed to delete ticket')

        // Refresh the tickets list
        fetchTickets()
      } catch (error) {
        console.error('Error deleting ticket:', error)
        alert('Failed to delete ticket')
      }
    }
  }

  const handleSaveEdit = async () => {
    if (!selectedTicket) return

    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      })

      if (!response.ok) throw new Error('Failed to update ticket')

      const updatedTicket = await response.json()
      
      // Update the tickets list with the updated ticket
      setTickets(tickets.map(ticket => 
        ticket.id === selectedTicket.id ? updatedTicket : ticket
      ))

      setEditModalOpen(false)
      setSelectedTicket(null)
      setEditForm({
        title: "",
        description: "",
        summary: "",
        categoryId: ""
      })
    } catch (error) {
      console.error('Error updating ticket:', error)
      alert('Failed to update ticket')
    }
  }

  const getCategoryColor = (categoryName: string) => {
    const colors: { [key: string]: string } = {
      "Critical": "bg-red-100 text-red-800 border-red-200",
      "Feature Request": "bg-green-100 text-green-800 border-green-200",
      "Performance": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Security": "bg-red-100 text-red-800 border-red-200",
      "UI/UX": "bg-purple-100 text-purple-800 border-purple-200",
      "Support": "bg-blue-100 text-blue-800 border-blue-200",
      "Hotel": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Restaurant": "bg-orange-100 text-orange-800 border-orange-200",
      "Campaign": "bg-pink-100 text-pink-800 border-pink-200"
    }
    return colors[categoryName] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  if (loading && tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Toate fisele</h1>
              <p className="text-gray-600">Manage and track all tickets</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleExport} 
                variant="outline" 
                className="flex items-center gap-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exporta
              </Button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Arata</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">fise pe pagina</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="All">All</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Cauta:</span>
            <Input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Table Section */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Summary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                        <div className="text-xs text-gray-500">by {ticket.user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getCategoryColor(ticket.category.name)} border`}>
                          {ticket.category.name}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {ticket.description}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {ticket.summary || "No summary"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleView(ticket)}
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-900 hover:bg-blue-50"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleEdit(ticket)}
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:text-green-900 hover:bg-green-50"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(ticket.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Section */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm text-gray-700">
            Pagina {currentPage} din {totalPages} ({totalTickets} total tickets)
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum 
                    ? "bg-gray-800 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }
                >
                  {pageNum}
                </Button>
              )
            })}
            
            {totalPages > 5 && (
              <>
                <span className="text-gray-500">...</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {totalPages}
                </Button>
              </>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* View Modal - Following Assistant Page Style */}
        <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Ticket Details</DialogTitle>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-6">
                {/* Title Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">Title</h3>
                  <div className="bg-gray-700 rounded-md p-3">
                    <p className="text-gray-200 text-sm font-medium">
                      {selectedTicket.title}
                    </p>
                  </div>
                </div>

                {/* Category Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">Category</h3>
                  <Badge className={`${getCategoryColor(selectedTicket.category.name)} border`}>
                    {selectedTicket.category.name}
                  </Badge>
                </div>

                {/* Description Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">Description</h3>
                  <div className="bg-gray-700 rounded-md p-3 min-h-32">
                    <p className="text-gray-200 text-sm whitespace-pre-wrap">
                      {selectedTicket.description}
                    </p>
                  </div>
                </div>

                {/* Summary Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">Summary</h3>
                  <div className="bg-gray-700 rounded-md p-3 min-h-20">
                    <p className="text-gray-200 text-sm">
                      {selectedTicket.summary || "No summary provided"}
                    </p>
                  </div>
                </div>

                {/* User Section */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">Created By</h3>
                  <div className="bg-gray-700 rounded-md p-3">
                    <p className="text-gray-200 text-sm">
                      {selectedTicket.user.username}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                onClick={() => setViewModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal - Following Assistant Page Style */}
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">Edit Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <h3 className="text-white text-lg font-bold mb-3">Title</h3>
                <Input
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter title..."
                />
              </div>

              {/* Category Section */}
              <div>
                <h3 className="text-white text-lg font-bold mb-3">Category</h3>
                <select
                  value={editForm.categoryId}
                  onChange={(e) => setEditForm({...editForm, categoryId: e.target.value})}
                  className="w-full border border-gray-600 rounded-md px-3 py-2 text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Description Section */}
              <div>
                <h3 className="text-white text-lg font-bold mb-3">Description</h3>
                <Textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white min-h-32"
                  placeholder="Enter description..."
                  rows={6}
                />
              </div>

              {/* Summary Section */}
              <div>
                <h3 className="text-white text-lg font-bold mb-3">Summary</h3>
                <Input
                  value={editForm.summary}
                  onChange={(e) => setEditForm({...editForm, summary: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="Enter summary..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline"
                onClick={() => setEditModalOpen(false)}
                className="border-gray-600 text-gray-200 hover:bg-gray-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveEdit}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}