//utils/connectDB.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return mongoose.connection.db; // Return database object
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        return mongoose.connection.db; // Return database object
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Re-throw error to be caught in the API route
    }
};

export default connectDB;
