import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    const { email } = await req.json();

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });

    // Always return success to prevent email enumeration
    return NextResponse.json({ 
      message: 'If an account exists with that email, password reset instructions have been sent.' 
    });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}