'use client'
import { useState } from 'react'

const EMAIL_TYPES = [
  {
    id: 'business',
    label: 'Business Email',
    icon: '💼',
    description: 'Professional communication for business purposes'
  },
  {
    id: 'sales',
    label: 'Sales Pitch',
    icon: '🎯',
    description: 'Persuasive emails to promote products or services'
  },
  {
    id: 'personal',
    label: 'Personal Email',
    icon: '✉️',
    description: 'Friendly communication for personal matters'
  },
  {
    id: 'followup',
    label: 'Follow-up',
    icon: '🤝',
    description: 'Professional follow-up after meetings or events'
  }
]

const TONES = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Formal and business-appropriate'
  },
  {
    id: 'friendly',
    label: 'Friendly',
    description: 'Warm and approachable'
  },
  {
    id: 'casual',
    label: 'Casual',
    description: 'Relaxed and informal'
  },
  {
    id: 'formal',
    label: 'Formal',
    description: 'Highly professional and ceremonious'
  }
]

const LENGTH_OPTIONS = [
  {
    id: 'flexible',
    label: 'Flexible Length',
    icon: '↔️',
    description: 'AI will determine the best length'
  },
  {
    id: 'custom',
    label: 'Custom Length',
    icon: '📏',
    description: 'Specify your preferred length'
  }
]

const WORD_COUNT_PRESETS = [
  { value: 100, label: 'Brief (~100 words)' },
  { value: 200, label: 'Standard (~200 words)' },
  { value: 300, label: 'Detailed (~300 words)' },
  { value: 500, label: 'Long (~500 words)' }
]

export default function EmailGenerator() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    tone: '',
    prompt: '',
    lengthOption: 'flexible',
    wordCount: 200,
  })
  const [generatedEmail, setGeneratedEmail] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const generateEmailContent = (targetWordCount) => {
    const paragraphs = [
      `I hope this email finds you well. I am writing regarding ${formData.prompt}.`,
      `As discussed, I wanted to provide more details about our conversation. This will help ensure we're aligned on the key points and next steps.`,
      `To elaborate further, I believe this approach will help us achieve our objectives effectively and efficiently. We can leverage our combined expertise to deliver outstanding results.`,
      `I would like to emphasize the importance of our collaboration and the value it brings to both parties. This partnership has great potential for mutual growth and success.`,
      `Moving forward, I suggest we establish regular check-ins to track progress and address any questions or concerns that may arise. This will help maintain momentum and ensure we stay on course.`,
      `I am confident that with our combined efforts, we can achieve exceptional results. Your expertise and insights are invaluable to this process.`,
      `Please don't hesitate to reach out if you need any clarification or have additional thoughts to share. I'm here to help ensure our success.`,
      `I look forward to your response and am excited about the potential outcomes of our collaboration.`
    ]

    let email = `Dear [Recipient],\n\n`
    let currentWordCount = email.split(/\s+/).length
    let paragraphIndex = 0

    while (currentWordCount < targetWordCount && paragraphIndex < paragraphs.length) {
      email += paragraphs[paragraphIndex] + '\n\n'
      currentWordCount = email.split(/\s+/).length
      paragraphIndex++
    }

    email += `Best regards,\n[Your name]`
    const finalWordCount = email.split(/\s+/).length

    return {
      content: email,
      wordCount: finalWordCount,
      targetWordCount
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      const targetWordCount = formData.lengthOption === 'custom' ? formData.wordCount : 200
      const email = generateEmailContent(targetWordCount)
      setGeneratedEmail(email)
      setIsGenerating(false)
      setStep(5)
    }, 1500)
  }

  const handlePreviewEmail = () => {
    const emailContent = generatedEmail.content
    const subject = "RE: " + formData.prompt
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Type', 'Tone', 'Length', 'Content', 'Result'].map((label, index) => (
            <div
              key={label}
              className={`text-sm font-medium ${
                step > index + 1 ? 'text-black' : 
                step === index + 1 ? 'text-black' : 'text-gray-400'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-black rounded-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Email Type */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Select Email Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {EMAIL_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData({ ...formData, type: type.id })
                  setStep(2)
                }}
                className={`p-6 border rounded-xl text-left hover:border-black transition-colors ${
                  formData.type === type.id ? 'border-black' : 'border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <h3 className="font-medium mb-1">{type.label}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Tone Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Select Tone</h2>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-600 hover:text-black"
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TONES.map(tone => (
              <button
                key={tone.id}
                onClick={() => {
                  setFormData({ ...formData, tone: tone.id })
                  setStep(3)
                }}
                className={`p-6 border rounded-xl text-left hover:border-black transition-colors ${
                  formData.tone === tone.id ? 'border-black' : 'border-gray-200'
                }`}
              >
                <h3 className="font-medium mb-1">{tone.label}</h3>
                <p className="text-sm text-gray-600">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Length Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Select Length</h2>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-600 hover:text-black"
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {LENGTH_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setFormData({ ...formData, lengthOption: option.id })
                }}
                className={`p-6 border rounded-xl text-left hover:border-black transition-colors ${
                  formData.lengthOption === option.id ? 'border-black' : 'border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <h3 className="font-medium mb-1">{option.label}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </button>
            ))}
          </div>
          
          {formData.lengthOption === 'custom' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {WORD_COUNT_PRESETS.map(preset => (
                  <button
                    key={preset.value}
                    onClick={() => setFormData({ ...formData, wordCount: preset.value })}
                    className={`p-4 border rounded-lg text-left hover:border-black transition-colors ${
                      formData.wordCount === preset.value ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Custom Word Count</label>
                <input
                  type="number"
                  min="50"
                  max="1000"
                  value={formData.wordCount}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    wordCount: Math.min(1000, Math.max(50, parseInt(e.target.value) || 50))
                  })}
                  className="w-full p-2 border rounded-lg"
                />
                <p className="text-xs text-gray-500">Min: 50 words, Max: 1000 words</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(4)}
            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 4: Content Input */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Describe Your Email</h2>
            <button
              onClick={() => setStep(3)}
              className="text-sm text-gray-600 hover:text-black"
            >
              Back
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {formData.lengthOption === 'custom' 
                  ? `Target length: ~${formData.wordCount} words`
                  : 'Flexible length'}
              </span>
            </div>
            <textarea
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              placeholder="Example: Write a follow-up email to thank the client for the meeting and confirm next steps..."
              className="w-full h-40 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleGenerate}
              disabled={!formData.prompt.trim() || isGenerating}
              className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate Email'}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Result */}
      {step === 5 && generatedEmail && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Generated Email</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Word count: {generatedEmail.wordCount} 
                {formData.lengthOption === 'custom' && 
                  ` / Target: ~${generatedEmail.targetWordCount}`
                }
              </span>
              <button
                onClick={() => {
                  setStep(1)
                  setFormData({
                    type: '',
                    tone: '',
                    prompt: '',
                    lengthOption: 'flexible',
                    wordCount: 200,
                  })
                  setGeneratedEmail('')
                }}
                className="text-sm text-gray-600 hover:text-black"
              >
                Start Over
              </button>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <pre className="whitespace-pre-wrap font-sans">{generatedEmail.content}</pre>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigator.clipboard.writeText(generatedEmail.content)}
              className="flex-1 py-3 border border-black text-black rounded-xl hover:bg-gray-50 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handlePreviewEmail}
              className="flex-1 py-3 border border-black text-black rounded-xl hover:bg-gray-50 transition-colors"
            >
              Open in Mail App
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  )
}