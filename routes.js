import express from 'express';
import { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';

const express = require('express');

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/api/employees', getAllEmployees);
app.get('/api/employees/:id', getEmployee);
app.post('/api/employees', createEmployee);
app.patch('/api/employees/:id', updateEmployee);
app.delete('/api/employees/:id', deleteEmployee);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
