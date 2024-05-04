import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // MongoDB URI is in environment variables

export const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI);
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db(); // returns the database instance
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
    }
}

