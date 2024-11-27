# EmailGeneratorGPT

EmailGeneratorGPT is an intelligent email generation platform powered by OpenAI's GPT. Create professional, personalized, and contextually appropriate emails for any situation with the help of advanced AI.

Built with Next.js and styled with Tailwind CSS, this application offers a seamless user experience with real-time email generation and customization options.

## Live Demo
[https://emailgeneratorgpt.vercel.app/](https://email-generator-gpt.vercel.app/)

## Features

- Utilize OpenAI's GPT for creating contextually appropriate emails
- Support for 9 different email categories including business, sales, personal, follow-up, and more
- Flexible or custom word count options to fit your needs
- Quick, responsive email generation with loading states

## Technologies Used

- Next.js 14 for frontend and backend
- OpenAI API for email generation
- MongoDB for data storage
- Tailwind CSS for styling
- JWT and bcrypt for authentication
- React Hooks for state management

## Use Cases

- Professional business communication
- Sales and marketing outreach
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

Open your browser and navigate to `http://localhost:3000`

## Screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/0xmetaschool/EmailGeneratorGPT/blob/main/public/email-generator-gpt-template-landing-page.png?raw=true" alt="EmailGenerator GPT Template Landing Page screenshot" style="width: 49%; border: 2px solid black;" />
  <img src="https://github.com/0xmetaschool/EmailGeneratorGPT/blob/main/public/email-generator-gpt-template-sign-up.png?raw=true" alt="EmailGenerator GPT Template Sign Up screenshot" style="width: 49%; border: 2px solid black;" />
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="https://github.com/0xmetaschool/EmailGeneratorGPT/blob/main/public/email-generator-gpt-template-home-page.png?raw=true" alt="EmailGenerator GPT Template Home Page screenshot" style="width: 49%; border: 2px solid black;" />
</div>


## How to Use the Application

1. Sign up or sign in with your email and password
2. Choose your email type from 9 different categories
3. Select the appropriate tone for your email
4. Set your desired email length (flexible or custom)
5. Describe what you want to say in your email
6. Click Generate and get your AI-crafted email
7. Copy, edit, or send the generated email
8. Access your email history anytime

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any queries or support, please open an issue in the GitHub repository.
