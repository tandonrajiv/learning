import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentRollno = this.onChangeStudentRollno.bind(this);
    this.onChangeStudentDescription = this.onChangeStudentDescription.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      email: '',
      rollno: '',
      file:'',
      filename:'',
      description:''
    }
  }
  
  saveFile(e) {
    this.setState({ file: e.target.files[0], filename: e.target.files[0].name })
  }
  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentRollno(e) {
    this.setState({ rollno: e.target.value })
  }
  onChangeStudentDescription(e) {
    this.setState({ description: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
     const formData = new FormData();
     formData.append("file", this.state.file);
     formData.append("fileName", this.state.filename);
     formData.append("name", this.state.name);
     formData.append("email", this.state.email);
     formData.append("rollno", this.state.rollno);
     formData.append("description", this.state.description);
     console.log(formData);

    axios.post('http://localhost:4000/students/create-student', formData)
      .then(res => console.log(res.data));

    this.setState({ name: '', email: '', rollno: '', file:'', description:'' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="projectFile">
          <Form.Label>Name of Project *</Form.Label>
          <Form.Control type="file" onChange={this.saveFile} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Your Email Address</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={this.state.rollno} onChange={this.onChangeStudentRollno} />
        </Form.Group>
        
        <Form.Group controlId="Name">
          <Form.Label>Project Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={this.state.description} onChange={this.onChangeStudentDescription} />
        </Form.Group>
      
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}