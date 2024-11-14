// app/api/auth/signin/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { verifyPassword, createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    console.log('Signin request received');

    const { email, password } = await request.json();
    console.log('Email:', email);

    // Connect to database
    await connectDB();
    console.log('Connected to database');

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.hashedPassword);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = await createToken({ userId: user._id });

    // Create response
    const response = NextResponse.json(
      { message: 'Logged in successfully' },
      { status: 200 }
    );

    // Set auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    console.log('Login successful, sending response');
    return response;

  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}