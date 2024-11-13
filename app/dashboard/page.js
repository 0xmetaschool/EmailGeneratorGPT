import EmailGenerator from '../../components/email/EmailGenerator'

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Generate Email</h1>
      <EmailGenerator />
    </div>
  )
}