import React, { Component } from 'react';

class EmployeeAdd extends Component {
    state = {
        name: '',
        title: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const employeeData = {
            name: this.state.name,
            title: this.state.title
        };

        this.createEmployee(employeeData);
    }

    createEmployee = (employee) => {
        fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employee)
        })
        .then(response => response.json())
        .then(newEmployee => {
            // Assuming newEmployee is the employee object returned by the server
            // And assuming there's a method to update the employee list in the parent component
            this.props.onEmployeeAdd(newEmployee);
            this.setState({ name: '', title: '' }); // Reset form
        })
        .catch(err => console.error('Error adding employee:', err));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </label>
                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

export default EmployeeAdd;
