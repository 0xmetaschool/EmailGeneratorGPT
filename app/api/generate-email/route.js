import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Make sure this is in your .env.local file
});

export async function POST(req) {
  try {
    const { type, tone, prompt, lengthOption, wordCount } = await req.json();

    // Validate required fields
    if (!type || !tone || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email generation prompt
    const systemPrompt = `You are an expert email writer. Write a ${type} email in a ${tone} tone.${
      lengthOption === 'custom' ? ` The email should be approximately ${wordCount} words.` : ''
    }`;

    const userPrompt = `Write an email about: ${prompt}\n\n
    Requirements:
    1. Write in a ${tone} tone
    2. Format as a proper email with greeting and signature
    3. Keep it ${type} style
    4. Make it clear and professional
    5. Include all necessary details from the prompt`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: lengthOption === 'custom' ? Math.min(Math.max(wordCount * 4, 150), 1000) : 500,
    });

    const generatedEmail = completion.choices[0].message.content;
    const wordCountEstimate = generatedEmail.split(/\s+/).length;

    return NextResponse.json({
      content: generatedEmail,
      wordCount: wordCountEstimate,
      targetWordCount: lengthOption === 'custom' ? wordCount : wordCountEstimate
    });

  } catch (error) {
    console.error('Email generation error:', error);
    
    // Check if it's an OpenAI API key error
    if (error.message.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured correctly' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate email. Please try again.' },
      { status: 500 }
    );
  }
}