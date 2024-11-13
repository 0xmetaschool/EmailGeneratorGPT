import TemplateList from '../../components/templates/TemplateList'

export default function TemplatesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Email Templates</h1>
        <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
          Create Template
        </button>
      </div>
      <TemplateList />
    </div>
  )
}