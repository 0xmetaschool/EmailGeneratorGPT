'use client'

import { motion } from 'framer-motion'

const SAMPLE_HISTORY = [
  {
    id: 1,
    subject: "Meeting Follow-up",
    type: "business",
    tone: "professional",
    date: "2024-01-15",
    preview: "Thank you for taking the time to meet with me today...",
  },
  {
    id: 2,
    subject: "Project Proposal",
    type: "sales",
    tone: "formal",
    date: "2024-01-14",
    preview: "I'm writing to propose a new collaboration opportunity...",
  },
  {
    id: 3,
    subject: "Thank You Note",
    type: "personal",
    tone: "friendly",
    date: "2024-01-13",
    preview: "I wanted to express my sincere thanks for your help...",
  },
]

const EmailHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Emails</h2>
        <div className="flex items-center space-x-2">
          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>All Types</option>
            <option>Business</option>
            <option>Sales</option>
            <option>Personal</option>
          </select>
          <select className="px-3 py-2 border rounded-lg text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {SAMPLE_HISTORY.map((email, index) => (
          <motion.div
            key={email.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{email.subject}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{email.type}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{email.tone}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{email.date}</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{email.preview}</p>
            <div className="flex space-x-3 mt-4">
              <button className="text-sm font-medium hover:text-gray-900 text-gray-600">
                View
              </button>
              <button className="text-sm font-medium hover:text-gray-900 text-gray-600">
                Reuse
              </button>
              <button className="text-sm font-medium hover:text-red-600 text-gray-600">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EmailHistory