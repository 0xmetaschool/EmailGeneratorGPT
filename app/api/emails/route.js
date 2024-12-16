import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Get and verify auth token
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      console.log('No auth token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = await verifyToken(token);
    const userId = decoded.userId;

    // Connect to database
    await connectDB();

    // Fetch emails for the user, sorted by timestamp descending
    const emails = await Email.find({ userId })
      .sort({ timestamp: -1 })
      .lean()
      .exec();

    return NextResponse.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    // Get and verify auth token
    const token = req.cookies.get('auth-token')?.value;
    if (!token) {
      console.log('No auth token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token and get user ID
    const decoded = await verifyToken(token);
    const userId = decoded.userId;

    // Get email ID from request
    const { searchParams } = new URL(req.url);
    const emailId = searchParams.get('id');

    if (!emailId) {
      return NextResponse.json(
        { error: 'Email ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Delete the email
    await Email.findOneAndDelete({
      _id: emailId,
      userId // Ensure user can only delete their own emails
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting email:', error);
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    );
  }
}
