'use client'

import { useState } from 'react'

export default function SaveTemplateModal({ isOpen, onClose, email, onSave }) {
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    tags: ''
  })

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Save as Template</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={templateData.description}
              onChange={(e) => setTemplateData({ ...templateData, description: e.target.value })}
              className="w-full p-2 border rounded-md h-20"
              placeholder="Brief description of when to use this template"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={templateData.tags}
              onChange={(e) => setTemplateData({ ...templateData, tags: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., business, follow-up, meeting"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ ...templateData, content: email?.content })
              onClose()
            }}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  )
}