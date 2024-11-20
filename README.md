# EmailGeneratorGPT

EmailGeneratorGPT is an intelligent email generation platform powered by OpenAI's GPT. Create professional, personalized, and contextually appropriate emails for any situation with the help of advanced AI. Built with Next.js and styled with Tailwind CSS, this application offers a seamless user experience with real-time email generation and customization options.

## Live Demo
[https://emailgeneratorgpt.vercel.app/](https://magic-mail-six.vercel.app/)

## Features

- **AI-Powered Email Generation**: Utilize OpenAI's GPT for creating contextually appropriate emails
- **Multiple Email Types**: Support for 9 different email categories including business, sales, personal, follow-up, and more
- **Customizable Tones**: Choose from 9 unique tones to match your communication style
- **Smart Length Control**: Flexible or custom word count options to fit your needs
- **Email History**: Track and reuse your previously generated emails
- **User Authentication**: Secure account system with email/password authentication
- **Responsive Design**: Modern, clean interface that works on all devices
- **Real-time Generation**: Quick, responsive email generation with loading states
- **Copy & Share**: Easy options to copy emails or open in your default mail client

## Technologies Used

- **Frontend**: Next.js 14, React
- **Styling**: Tailwind CSS
- **Authentication**: JWT, bcrypt
- **Database**: MongoDB
- **AI Integration**: OpenAI API
- **State Management**: React Hooks
- **Deployment**: Vercel

## Use Cases

- Professional business communication
- Sales and marketing outreach
- Personal correspondence
- Follow-up emails after meetings
- Job applications and cover letters
- Customer support responses
- Networking and introductions
- Formal requests and proposals
- Performance reviews and feedback

## Installation Steps

**1. Clone the repository:**
```bash
git clone https://github.com/0xmetaschool/EmailGeneratorGPT.git
cd EmailGeneratorGPT
```

**2. Install dependencies:**
```bash
npm install
```

**3. Set up environment variables:**
Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

**4. Run the development server:**
```bash
npm run dev
```

**5. Open your browser and navigate to** `http://localhost:3000`

## Screenshots

![image](https://github.com/user-attachments/assets/48fdbf7a-1cba-4d5d-8786-1e600dd1ac4c)
![image](https://github.com/user-attachments/assets/536f2a59-82e2-4f18-808d-61b631d00601)
![image](https://github.com/user-attachments/assets/dcf55b67-bbde-44ab-8601-b4e1126beb79)


## How to Use the Application

1. Sign up or sign in with your email and password
2. Choose your email type from 9 different categories
3. Select the appropriate tone for your email
4. Set your desired email length (flexible or custom)
5. Describe what you want to say in your email
6. Click generate and get your AI-crafted email
7. Copy, edit, or send the generated email
8. Access your email history anytime

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- Multiple language support
- Email templates library
- Team collaboration features
- Advanced customization options
- Analytics dashboard
- API access for developers
- Browser extension integration

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please open an issue in the GitHub repository.

## Acknowledgments

- OpenAI for providing the GPT API
- Next.js team for the amazing framework
- All contributors and users of EmailGeneratorGPT
