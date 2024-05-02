import React from 'react';
import EmployeeFilter from './EmployeeFilter.jsx';
import EmployeeAdd from './EmployeeAdd.jsx';

function EmployeeRow({ employee, onDelete }) {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.extension}</td>
            <td>{employee.email}</td>
            <td>{employee.title}</td>
            <td>{employee.dateHired}</td>
            <td>{employee.currentlyEmployed ? "Yes" : "No"}</td>
            <td><button onClick={() => onDelete(employee.id)}>DELETE</button></td>
        </tr>
    );
}

function EmployeeTable({ employees, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Extension</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Date Hired</th>
                    <th>Currently Employed?</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <EmployeeRow key={employee.id} employee={employee} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}

class EmployeeList extends React.Component {
    state = {
        employees: [
            // Example employees
            { id: 1, name: "John Doe", extension: 1234, email: "john.doe@example.com", title: "Developer", dateHired: "Jan 1, 2020", currentlyEmployed: true },
            { id: 2, name: "Jane Smith", extension: 5678, email: "jane.smith@example.com", title: "Manager", dateHired: "Feb 1, 2020", currentlyEmployed: true }
        ]
    };

    handleDelete = (id) => {
        this.setState({
            employees: this.state.employees.filter(employee => employee.id !== id)
        });
    }

    render() {
        return (
            <div>
                <h1>Employee Management Application</h1>
                <EmployeeFilter />
                <EmployeeAdd />
                <EmployeeTable employees={this.state.employees} onDelete={this.handleDelete} />
            </div>
        );
    }
}

export default EmployeeList;
