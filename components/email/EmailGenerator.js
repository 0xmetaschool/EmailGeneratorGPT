'use client';
import { useState } from 'react';
import { Mail, Sparkles, Check, AlertCircle, History } from 'lucide-react';

// Constants
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
];

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
];

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
];

const WORD_COUNT_PRESETS = [
  { value: 100, label: 'Brief (~100 words)' },
  { value: 200, label: 'Standard (~200 words)' },
  { value: 300, label: 'Detailed (~300 words)' },
  { value: 500, label: 'Long (~500 words)' }
];
// Main EmailGenerator Component
export default function EmailGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    tone: '',
    prompt: '',
    lengthOption: 'flexible',
    wordCount: 200,
  });
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const generateEmailContent = async (targetWordCount) => {
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          tone: formData.tone,
          prompt: formData.prompt,
          lengthOption: formData.lengthOption,
          wordCount: targetWordCount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to generate email: ${response.status}`);
      }

      const data = await response.json();
      if (!data.content) {
        throw new Error('No content received from API');
      }

      // Save to history
      const historyItem = {
        id: Date.now(),
        type: formData.type,
        tone: formData.tone,
        prompt: formData.prompt,
        content: data.content,
        wordCount: data.wordCount,
        timestamp: new Date().toISOString()
      };

      // Get existing history
      const existingHistory = JSON.parse(localStorage.getItem('emailHistory') || '[]');
      
      // Add new email to history (limit to 50 items)
      const updatedHistory = [historyItem, ...existingHistory].slice(0, 50);
      
      // Save updated history
      localStorage.setItem('emailHistory', JSON.stringify(updatedHistory));

      return data;
    } catch (error) {
      console.error('Error generating email:', error);
      throw new Error('Failed to generate email. Please try again.');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const targetWordCount = formData.lengthOption === 'custom' ? formData.wordCount : 200;
      const email = await generateEmailContent(targetWordCount);
      setGeneratedEmail(email);
      setStep(5);
    } catch (error) {
      setError(error.message || 'Failed to generate email. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewEmail = () => {
    const emailContent = generatedEmail.content;
    const subject = "RE: " + formData.prompt;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Type', 'Tone', 'Length', 'Content', 'Result'].map((label, index) => (
            <div
              key={label}
              className={`text-sm font-medium ${
                step > index + 1 ? 'text-white' : 
                step === index + 1 ? 'text-white' : 'text-gray-400'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4" />
          Email saved to history
        </div>
      )}

      {/* Step 1: Email Type */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Select Email Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {EMAIL_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData({ ...formData, type: type.id });
                  setStep(2);
                }}
                className={`p-6 border rounded-xl text-left hover:border-blue-500 transition-colors ${
                  formData.type === type.id ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <h3 className="font-medium text-white mb-1">{type.label}</h3>
                <p className="text-sm text-gray-300">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Tone Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Select Tone</h2>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-300 hover:text-white"
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {TONES.map(tone => (
              <button
                key={tone.id}
                onClick={() => {
                  setFormData({ ...formData, tone: tone.id });
                  setStep(3);
                }}
                className={`p-6 border rounded-xl text-left hover:border-blue-500 transition-colors ${
                  formData.tone === tone.id ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                }`}
              >
                <h3 className="font-medium text-white mb-1">{tone.label}</h3>
                <p className="text-sm text-gray-300">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Length Selection */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Select Length</h2>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-300 hover:text-white"
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {LENGTH_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setFormData({ ...formData, lengthOption: option.id });
                }}
                className={`p-6 border rounded-xl text-left hover:border-blue-500 transition-colors ${
                  formData.lengthOption === option.id ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <h3 className="font-medium text-white mb-1">{option.label}</h3>
                <p className="text-sm text-gray-300">{option.description}</p>
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
                    className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${
                      formData.wordCount === preset.value ? 'border-blue-500 bg-gray-800' : 'border-gray-700 bg-gray-800'
                    }`}
                  >
                    <span className="text-white">{preset.label}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Custom Word Count</label>
                <input
                  type="number"
                  min="50"
                  max="1000"
                  value={formData.wordCount}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    wordCount: Math.min(1000, Math.max(50, parseInt(e.target.value) || 50))
                  })}
                  className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-400">Min: 50 words, Max: 1000 words</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(4)}
            className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 4: Content Input */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Describe Your Email</h2>
            <button
              onClick={() => setStep(3)}
              className="text-sm text-gray-300 hover:text-white"
            >
              Back
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
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
              className="w-full h-40 p-4 bg-gray-700 border border-gray-600 text-white rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
            />
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
            <button
              onClick={handleGenerate}
              disabled={!formData.prompt.trim() || isGenerating}
              className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </div>
              ) : (
                'Generate Email'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Result */}
      {step === 5 && generatedEmail && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Generated Email</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Word count: {generatedEmail.wordCount} 
                {formData.lengthOption === 'custom' && 
                  ` / Target: ~${generatedEmail.targetWordCount}`
                }
              </span>
              <button
                onClick={() => {
                  setStep(1);
                  setFormData({
                    type: '',
                    tone: '',
                    prompt: '',
                    lengthOption: 'flexible',
                    wordCount: 200,
                  });
                  setGeneratedEmail('');
                  setError('');
                }}
                className="text-sm text-gray-300 hover:text-white"
              >
                Start Over
              </button>
            </div>
          </div>
          <div className="bg-gray-700 p-6 rounded-xl border border-gray-600">
            <pre className="whitespace-pre-wrap font-sans text-white">{generatedEmail.content}</pre>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigator.clipboard.writeText(generatedEmail.content)}
              className="flex-1 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handlePreviewEmail}
              className="flex-1 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
            >
              Open in Mail App
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}