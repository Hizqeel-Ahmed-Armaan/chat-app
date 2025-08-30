import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected Successfully');
    } catch (error) {
        console.log('Error in ConnectDB', error);
    }
}

export default connectDB;