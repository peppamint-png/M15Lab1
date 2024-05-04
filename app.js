import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './db/connect.js';
import routes from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(async (req, res, next) => {
    try {
        if (!req.db) {
            req.db = await connectDB();
        }
        next();
    } catch (error) {
        console.error('Database connection failed', error);
        res.status(500).send('Database connection failed');
    }
});

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use(routes);  // Use the routes defined in routes.js

// POST endpoint for adding an employee
app.post('/api/employees', (req, res) => {
    const employee = req.body;  // Assuming the body contains an employee object
    console.log('Adding new employee:', employee);

    // Here you would typically add the employee to a database
    // For demonstration, we'll just send the employee back
    res.status(201).json({ message: "Employee added successfully", employee });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
