'use client'

export default function EmailPreviewModal({ isOpen, onClose, email }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Email Preview</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Email Headers */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">From:</span>
              <span className="text-sm">[Your Name]</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">To:</span>
              <span className="text-sm">[Recipient]</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Subject:</span>
              <span className="text-sm font-medium">[Email Subject]</span>
            </div>
          </div>
          
          {/* Email Content */}
          <div className="border-t pt-4">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans">
                {email?.content || 'No content available'}
              </pre>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => window.open('mailto:?body=' + encodeURIComponent(email?.content || ''))}
            className="px-4 py-2 text-blue-600 hover:text-blue-800"
          >
            Open in Mail App
          </button>
          <div className="space-x-3">
            <button
              onClick={() => navigator.clipboard.writeText(email?.content || '')}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}