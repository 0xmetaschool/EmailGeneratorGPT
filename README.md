# EmailGeneratorGPT

EmailGeneratorGPT is an AI-powered email writing assistant that helps users create professional, context-aware emails quickly and efficiently. Using advanced language models, it generates high-quality email content for various business and personal scenarios while maintaining your unique voice and style.

## Live Demo
[https://email-generator-gpt.vercel.app/](https://magic-mail-six.vercel.app/)

## Features
- Smart email generation with customizable tone and style (formal, casual, friendly, professional)
- Multiple purpose-built templates for common scenarios (business proposals, follow-ups, networking, etc.)
- Context-aware suggestions based on recipient history and previous correspondence
- Real-time grammar and tone checking with enhancement suggestions
- Multi-language support with automatic translation capabilities
- Email performance analytics and engagement tracking
- Save and organize email templates for future use

## Technologies Used
- Next.js and React for Frontend and Backend
- Tailwind CSS for Styling
- OpenAI API for Natural Language Processing
- MongoDB for Database Management
- Nodemailer for Email Integration

## Use Cases
- Business professionals needing to craft polished emails quickly
- Sales teams generating personalized outreach campaigns
- HR departments creating standardized yet personalized communication
- Customer service teams responding to inquiries efficiently
- Non-native English speakers seeking assistance with professional communication

## Installation Steps

**1. Clone the repository:**
```bash
git clone https://github.com/yourusername/email-generator-gpt.git
cd email-generator-gpt
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up the database:**
Configure MongoDB instance either locally or through MongoDB Atlas. Create a new cluster and obtain the connection string.

**4. Set up environment variables:**
Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**5. Run the development server:**
```bash
npm run dev
```

**6. Open your browser and navigate to `http://localhost:3000`**

## Screenshots
<div style="display: flex; justify-content: space-between; padding:20px;">
  <img src="/public/email-generator-dashboard.png" alt="EmailGeneratorGPT Dashboard" style="width: 49%; border: 2px solid black;" />
  <img src="/public/email-composer.png" alt="Email Composer Interface" style="width: 49%; border: 2px solid black;" />
</div>
<div style="display: flex; justify-content: space-between; padding:20px;">
  <img src="/public/template-library.png" alt="Template Library" style="width: 49%; border: 2px solid black;" />
</div>

## How to use the application
1. Sign in using your email and password
2. Select an email type or template from the dashboard
3. Input key details about your email (recipient, context, purpose)
4. Choose your preferred tone and style
5. Generate the email content
6. Edit and customize the generated content as needed
7. Save templates for future use or send directly through the platform
8. Track email performance and engagement through the analytics dashboard

## Advanced Features
- **AI Style Learning**: The system learns from your editing patterns to better match your writing style
- **Smart Suggestions**: Context-aware recommendations for subject lines and content
- **Template Management**: Create, save, and organize custom templates
- **Integration Capabilities**: Connect with popular email clients and CRM systems
- **Analytics Dashboard**: Track email performance metrics and recipient engagement

## Contributing
We welcome contributions! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
For support, feature requests, or bug reports, please open an issue in the GitHub repository.

## Acknowledgments
- OpenAI for providing the GPT API
- Contributors and beta testers who helped shape the project
- Open source community for various tools and libraries used in this project
