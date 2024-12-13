// app/api/generate-email/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
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
      model: "gpt-4",
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
      targetWordCount: lengthOption === 'custom' ? wordCount : wordCountEstimate,
      emailId: Date.now().toString() // Use timestamp as ID for local storage
    });

  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email', details: error.message },
      { status: 500 }
    );
  }
}