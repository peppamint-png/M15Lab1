import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI; // MongoDB URI is in environment variables

export const connectDB = async () => {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB");
        return client;  // Return the MongoClient object
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        return null;  // Return null in case of an error
    }
};

