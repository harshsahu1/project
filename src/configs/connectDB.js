import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB is connected....');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the function to test the connection
export default connectDB;
