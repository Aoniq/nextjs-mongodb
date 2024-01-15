import mongoose from 'mongoose';
import Post from './models/Post';

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    throw new Error('MongoDB connection failed ' + error);
  }
}

export default connect;