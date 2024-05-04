import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb+srv://student:mongodb@sandbox.y6sn8cp.mongodb.net/?retryWrites=true&w=majority&appName=Sandbox';

const connectDB = async () => {
    try {
        const client = new MongoClient(mongoURI);
        await client.connect();
        console.log('Connected to MongoDB successfully');
        return client;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        return null;
    }
};

const testDatabaseOperation = async () => {
    const client = await connectDB();
    if (!client) {
        console.log('Failed to connect to the database');
        return;
    }

    try {
        const db = client.db('sample_employees');  // Specify the database name explicitly
        const collection = db.collection('employees');  // Change 'employees' to your actual collection name if different
        const documents = await collection.find({}).limit(5).toArray();  // Fetch the first 5 documents
        console.log('Documents:', documents);
    } catch (error) {
        console.error('Error performing database operation:', error);
    } finally {
        await client.close();  // Ensure to close the connection
    }
};

testDatabaseOperation();