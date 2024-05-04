import React, { Component } from 'react';

class EmployeeAdd extends Component {
    state = {
        name: '',
        title: ''
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onEmployeeAdd({
            name: this.state.name,
            title: this.state.title
        });
        this.setState({ name: '', title: '' }); // Reset form fields
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Title"
                />
                <button type="submit">Add Employee</button>
            </form>
        );
    }
}

export default EmployeeAdd;
