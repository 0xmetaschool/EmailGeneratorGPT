'use client'

const EMAIL_TEMPLATES = [
  {
    id: 1,
    title: 'Meeting Follow-up',
    type: 'business',
    tone: 'professional',
    template: `Dear {recipient},

Thank you for taking the time to meet with me today regarding {topic}. I wanted to follow up on our discussion about {key_points}.

I look forward to our next steps and will {action_item}.

Best regards,
{sender}`,
  },
  {
    id: 2,
    title: 'Sales Introduction',
    type: 'sales',
    tone: 'friendly',
    template: `Hi {recipient},

I noticed that {company} is {observation}, and I thought you might be interested in how we could help you {benefit}.

Would you be open to a quick 15-minute chat to discuss how we can {value_proposition}?

Best,
{sender}`,
  },
  {
    id: 3,
    title: 'Thank You Note',
    type: 'personal',
    tone: 'grateful',
    template: `Dear {recipient},

I wanted to express my sincere thanks for {reason}. {specific_detail}.

Your kindness means a lot to me.

Best wishes,
{sender}`,
  },
]

const TemplateList = ({ onSelectTemplate }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {EMAIL_TEMPLATES.map((template) => (
        <div 
          key={template.id} 
          className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onSelectTemplate(template)}
        >
          <h3 className="font-bold text-lg mb-2">{template.title}</h3>
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">{template.type}</span>
            <span className="px-2 py-1 bg-gray-100 rounded text-sm">{template.tone}</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{template.template}</p>
        </div>
      ))}
    </div>
  )
}

export default TemplateList