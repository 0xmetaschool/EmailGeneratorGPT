import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('New database connection established');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
};