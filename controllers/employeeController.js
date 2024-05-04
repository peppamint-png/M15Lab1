// employeeController.js

let employees = []; // This will act as a "database" for your prototype

// Get all employees
exports.getAllEmployees = (req, res) => {
    res.status(200).json(employees);
};

// Get a single employee by ID
exports.getEmployee = (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    res.status(200).json(employee);
};

// Create a new employee
exports.createEmployee = (req, res) => {
    const newEmployee = {
        id: employees.length + 1, // simple way to assign a new ID
        ...req.body
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

// Update an employee
exports.updateEmployee = (req, res) => {
    let employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    Object.assign(employee, req.body);
    res.status(200).json(employee);
};

// Delete an employee
exports.deleteEmployee = (req, res) => {
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    res.status(204).send();
};

