import { ObjectId } from 'mongodb';

// Assuming db is passed correctly via middleware
export const getAllEmployees = async (req, res) => {
    const db = req.db;
    try {
        const employees = await db.collection('employees').find({}).toArray();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get employees.' });
    }
};

export const createEmployee = async (req, res) => {
    const db = req.db;
    const { name, title, email, extension, dateHired, currentlyEmployed } = req.body;
    try {
        const newEmployee = {
            name, title, email, extension,
            dateHired: new Date(dateHired),
            currentlyEmployed
        };
        const result = await db.collection('employees').insertOne(newEmployee);
        res.status(201).json(result.ops[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to create employee.", error: err.message });
    }
};

export const getEmployee = async (req, res) => {
    const db = req.db;
    const { id } = req.params;
    try {
        const employee = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!employee) {
            return res.status(404).send('Employee not found');
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Error retrieving employee');
    }
};

export const updateEmployee = async (req, res) => {
    const db = req.db;
    const { id } = req.params;
    try {
        const updated = await db.collection('employees').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        if (updated.modifiedCount === 0) {
            return res.status(404).send('No updates made or employee not found');
        }
        res.status(200).send('Employee updated successfully');
    } catch (err) {
        res.status(500).send('Failed to update employee');
    }
};

export const deleteEmployee = async (req, res) => {
    const db = req.db;
    const { id } = req.params;
    try {
        const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).send('Employee not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Failed to delete employee');
    }
};
