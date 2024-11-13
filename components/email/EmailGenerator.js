'use client'

import { useState } from 'react'
import TemplateList from '../templates/TemplateList'

const EMAIL_TYPES = [
  { id: 'business', label: 'Business Email' },
  { id: 'sales', label: 'Sales Pitch' },
  { id: 'personal', label: 'Personal Email' },
]

const TONES = [
  { id: 'professional', label: 'Professional' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'casual', label: 'Casual' },
  { id: 'formal', label: 'Formal' },
]

const EmailGenerator = () => {
  const [formData, setFormData] = useState({
    type: 'business',
    tone: 'professional',
    prompt: '',
    useTemplate: false,
  })
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleTemplateSelect = (template) => {
    setFormData({
      ...formData,
      type: template.type,
      tone: template.tone,
      prompt: template.template,
      useTemplate: true,
    })
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulating API call for now
    setTimeout(() => {
      const email = formData.useTemplate 
        ? formData.prompt
            .replace('{recipient}', '[Recipient Name]')
            .replace('{sender}', '[Your Name]')
            .replace(/{.*?}/g, '[Fill in detail]')
        : `Dear [Recipient],

I hope this email finds you well. This is a ${formData.tone.toLowerCase()} ${formData.type} email based on your prompt: ${formData.prompt}

[Email content will be generated here based on the API integration]

Best regards,
[Your name]`

      setGeneratedEmail(email)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Choose a Template (Optional)</h2>
          <TemplateList onSelectTemplate={handleTemplateSelect} />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              {EMAIL_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tone</label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              {TONES.map(tone => (
                <option key={tone.id} value={tone.id}>{tone.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {formData.useTemplate ? 'Customize Template' : 'What do you want to say?'}
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            className="w-full p-2 border rounded-md h-32"
            placeholder={formData.useTemplate 
              ? "Customize the template text above..."
              : "Example: Write a follow-up email to schedule a meeting with a client"}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !formData.prompt.trim()}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isGenerating || !formData.prompt.trim() 
              ? 'bg-gray-400' 
              : 'bg-black hover:bg-gray-800'
          }`}
        >
          {isGenerating ? 'Generating...' : 'Generate Email'}
        </button>

        {generatedEmail && (
          <div className="mt-8">
            <h3 className="font-medium mb-2">Generated Email:</h3>
            <div className="p-4 border rounded-md whitespace-pre-wrap bg-gray-50">
              {generatedEmail}
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => navigator.clipboard.writeText(generatedEmail)}
                className="py-2 px-4 border rounded-md hover:bg-gray-50"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  setGeneratedEmail('')
                  setFormData({
                    type: 'business',
                    tone: 'professional',
                    prompt: '',
                    useTemplate: false,
                  })
                }}
                className="py-2 px-4 border rounded-md hover:bg-gray-50"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailGenerator