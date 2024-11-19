'use client';
import { useState } from 'react';
import { Mail, Sparkles, History, Save, ChevronRight, Book, Wand2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  },
  {
    id: 'introduction',
    label: 'Introduction',
    icon: '👋',
    description: 'First-time connections and networking emails'
  },
  {
    id: 'support',
    label: 'Customer Support',
    icon: '🎮',
    description: 'Help desk and customer service responses'
  },
  {
    id: 'application',
    label: 'Job Application',
    icon: '📝',
    description: 'Cover letters and job-related correspondence'
  },
  {
    id: 'request',
    label: 'Request/Proposal',
    icon: '📊',
    description: 'Formal requests and business proposals'
  },
  {
    id: 'feedback',
    label: 'Feedback & Review',
    icon: '⭐',
    description: 'Performance reviews and constructive feedback'
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
  },
  {
    id: 'enthusiastic',
    label: 'Enthusiastic',
    description: 'Energetic and positive'
  },
  {
    id: 'empathetic',
    label: 'Empathetic',
    description: 'Understanding and compassionate'
  },
  {
    id: 'assertive',
    label: 'Assertive',
    description: 'Confident and direct'
  },
  {
    id: 'diplomatic',
    label: 'Diplomatic',
    description: 'Tactful and considerate'
  },
  {
    id: 'persuasive',
    label: 'Persuasive',
    description: 'Compelling and influential'
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

export default function EmailGenerator() {
  const router = useRouter();
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
    <div className="w-full max-w-7xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {['Type', 'Tone', 'Length', 'Content', 'Result'].map((label, index) => (
            <div
              key={label}
              className={`relative flex flex-col items-center ${
                index < step - 1 ? 'text-white' : 
                index === step - 1 ? 'text-white' : 'text-gray-500'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 border-2 transition-colors ${
                index < step - 1 ? 'bg-white/20 border-white' : 
                index === step - 1 ? 'bg-white/10 border-white' : 'bg-gray-800 border-gray-600'
              }`}>
                {index < step - 1 ? '✓' : index + 1}
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Email Type */}
      {step === 1 && (
        <div className="space-y-8 animate-fadeIn">
          <h2 className="text-2xl font-semibold text-white">Select Email Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMAIL_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => {
                  setFormData({ ...formData, type: type.id });
                  setStep(2);
                }}
                className={`group p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 ${
                  formData.type === type.id 
                    ? 'bg-white/20 border-2 border-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/50'
                }`}
              >
                <div className="text-3xl mb-3 transform transition-transform group-hover:scale-110">{type.icon}</div>
                <h3 className="font-medium text-white mb-2">{type.label}</h3>
                <p className="text-sm text-white/70">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Tone Selection */}
      {step === 2 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Select Tone</h2>
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TONES.map(tone => (
              <button
                key={tone.id}
                onClick={() => {
                  setFormData({ ...formData, tone: tone.id });
                  setStep(3);
                }}
                className={`group p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 ${
                  formData.tone === tone.id 
                    ? 'bg-white/20 border-2 border-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/50'
                }`}
              >
                <h3 className="font-medium text-white mb-2">{tone.label}</h3>
                <p className="text-sm text-white/70">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Length Selection */}
      {step === 3 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Select Length</h2>
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LENGTH_OPTIONS.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setFormData({ ...formData, lengthOption: option.id });
                }}
                className={`group p-6 rounded-xl backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 ${
                  formData.lengthOption === option.id 
                    ? 'bg-white/20 border-2 border-white'
                    : 'bg-white/5 border border-white/10 hover:border-white/50'
                }`}
              >
                <div className="text-3xl mb-3 transform transition-transform group-hover:scale-110">{option.icon}</div>
                <h3 className="font-medium text-white mb-2">{option.label}</h3>
                <p className="text-sm text-white/70">{option.description}</p>
              </button>
            ))}
          </div>
          
          {formData.lengthOption === 'custom' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                {WORD_COUNT_PRESETS.map(preset => (
                  <button
                    key={preset.value}
                    onClick={() => setFormData({ ...formData, wordCount: preset.value })}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      formData.wordCount === preset.value 
                        ? 'bg-white/20 border-2 border-white'
                        : 'bg-white/5 border border-white/10 hover:border-white/50'
                    }`}
                  >
                    <span className="text-white">{preset.label}</span>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
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
                  className="w-full p-3 bg-white/5 border border-white/10 text-white rounded-xl focus:border-white focus:ring-1 focus:ring-white transition-colors"
                />
                <p className="text-xs text-white/50">Min: 50 words, Max: 1000 words</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setStep(4)}
            className="w-full py-4 bg-white/20 text-white rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 4: Content Input */}
      {step === 4 && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Describe Your Email</h2>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-white/50">
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
              className="w-full h-48 p-4 bg-white/5 border border-white/10 text-white rounded-xl focus:border-white focus:ring-1 focus:ring-white placeholder-white/30 transition-colors"
            />
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}
            <button
              onClick={handleGenerate}
              disabled={!formData.prompt.trim() || isGenerating}
              className="w-full py-4 bg-white/20 text-white rounded-xl hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Crafting Your Email...
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
        <div className="space-y-8 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Your Generated Email</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/50">
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
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-lg">
            <pre className="whitespace-pre-wrap font-sans text-white/90 leading-relaxed">{generatedEmail.content}</pre>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigator.clipboard.writeText(generatedEmail.content)}
              className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <Save className="w-5 h-5" />
              Copy to Clipboard
            </button>
            <button
              onClick={handlePreviewEmail}
              className="flex items-center justify-center gap-2 py-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Open in Mail App
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center justify-center gap-2 py-4 bg-white/20 text-white rounded-xl hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}