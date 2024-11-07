//utils/connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connections[0] && mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB');
      return mongoose.connections[0]; // Return the existing connection object
    }

    // Make sure MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is missing in environment variables');
    }

    // Connect to MongoDB without deprecated options
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI); // No need for useNewUrlParser or useUnifiedTopology

    console.log('Connected to MongoDB');
    return mongoose.connection; // Return the full connection object
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Re-throw the error to be caught in the API route
  }
};

export default connectDB;
