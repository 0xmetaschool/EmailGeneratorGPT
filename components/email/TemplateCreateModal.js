'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TemplateCreateModal = ({ isOpen, onClose, onSave }) => {
  const [templateData, setTemplateData] = useState({
    name: '',
    type: 'business',
    tone: 'professional',
    content: '',
    tags: []
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6">Create New Template</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <input
              type="text"
              value={templateData.name}
              onChange={(e) => setTemplateData({ ...templateData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Professional Follow-up"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Type</label>
              <select
                value={templateData.type}
                onChange={(e) => setTemplateData({ ...templateData, type: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="business">Business</option>
                <option value="sales">Sales</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <select
                value={templateData.tone}
                onChange={(e) => setTemplateData({ ...templateData, tone: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Template Content</label>
            <textarea
              value={templateData.content}
              onChange={(e) => setTemplateData({ ...templateData, content: e.target.value })}
              className="w-full p-2 border rounded-md h-40"
              placeholder="Write your template here. Use {variable} for dynamic content..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(templateData)
                onClose()
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save Template
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default TemplateCreateModal