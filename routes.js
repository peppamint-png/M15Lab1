import express from 'express';
import { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController';

const router = express.Router();

// Route for getting all employees
router.route('/api/employees').get(getAllEmployees).post(createEmployee);

// Routes for individual employee operations
router.route('/api/employees/:id')
    .get(getEmployee)
    .patch(updateEmployee)
    .delete(deleteEmployee);

export default router;

