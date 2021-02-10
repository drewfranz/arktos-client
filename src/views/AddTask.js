import React, { useState } from "react";
import { Row, Col, Container, FormGroup, Form, Label, Input, Button } from 'reactstrap';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Loading } from "../components";
import { Redirect } from "react-router-dom";

const AddTask = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { user } = useAuth0();
    const { sub } = user;
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        issueURL: '',
        size: 1,
        status: 'open',
        hoursSpent: 0,
        estimatedHours: 0,
        isPriority: false,
        isBlocked: false

    });
    const [ redirect, setRedirect ] = useState(false)
    const [isLoading, setIsLoading ] = useState(false);

    const handleOnChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        // Clone the current state.
        let createdTask = {...newTask};
        if (name === 'estimatedHours' || name === 'hoursSpent') {
            value = parseFloat(value, 10);
        }
        // Assign the changed values.
        createdTask[name] = value;
        // Save to the state.
        setNewTask(createdTask);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const token = await getAccessTokenSilently();

        fetch(process.env.REACT_APP_API_URL + '/tasks', {
            method: 'POST',
            body: JSON.stringify(newTask),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(task => {
            if (!task.message) {
                setRedirect(true);
            } else {
                const [prefix, field] = task.message.split(': ');

                setIsLoading(false);
                if (field !== undefined) {
                    document.getElementById(field.trim() + 'Group')
                        .classList.add('has-danger');
                    document.getElementById(field.trim())
                        .classList.add('is-invalid');
                }
            }
        });
        
    }

    if (redirect) return <Redirect to="/tasks" />;

    if (isLoading) return <Loading />
    
    return (
        <Container className="py-5">
            <Row className="align-items-center add-task-header">
                <Col className="text-md-left">
                    <h2>New Task</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleOnSubmit}>
                        <FormGroup row id="titleGroup">
                            <Label for="title" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Input type="text" name="title" id="title" onChange={e => handleOnChange(e)} />
                                <div className="invalid-feedback">Title is required.</div>
                            </Col>
                        </FormGroup>
                        <FormGroup row id="descriptionGroup">
                            <Label for="description" sm={2}>Description</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="description" id="description" onChange={handleOnChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row if="statusGroup">
                            <Label for="status" sm={2}>Status</Label>
                            <Col sm={10}>
                                <Input type="select" name="status" id="status" onChange={handleOnChange}>
                                    <option value="open">Open</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="test">Ready For Test</option>
                                    <option value="approved">Approved</option>
                                    <option value="closed" disabled="disabled">Closed</option>
                                </Input>
                                <div className="invalid-feedback">Status is required.</div>
                            </Col>
                        </FormGroup>
                        <FormGroup row id="sizeGroup">
                            <Label for="size" sm={2}>Size</Label>
                            <Col sm={2}>
                                <Input
                                    type="number"
                                    min="1"
                                    max="10"
                                    name="size"
                                    id="size"
                                    onChange={handleOnChange}
                                />
                                <div className="invalid-feedback">Size is required.</div>
                            </Col>
                            <Label for="estimatedHours" sm={2}>Est. Hours</Label>
                            <Col sm={2}>
                                <Input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    name="estimatedHours"
                                    id="estimatedHours"
                                    onChange={handleOnChange}
                                />
                            </Col>
                            <Label for="hoursSpent" sm={2}>Hours Spent</Label>
                            <Col sm={2}>
                                <Input
                                    type="number"
                                    min="0.00"
                                    step="0.01"
                                    name="hoursSpent"
                                    id="hoursSpent"
                                    onChange={handleOnChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row id="issueURLGroup">
                            <Label for="issueURL" sm={2}>Issue URL</Label>
                            <Col sm={10}>
                                <Input type="url" name="issueURL" id="issueURL" onChange={handleOnChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row className="py-3" id="priorityGroup">
                            <Col sm={6}>
                                <Label check>
                                    <Input type="checkbox" name="isBlocked" id="isBlocked" onChange={handleOnChange}/> Blocked
                                </Label>
                            </Col>
                            <Col sm={6}>
                                <Label check>
                                    <Input type="checkbox" name="isPriority" id="isPriority" onChange={handleOnChange}/> Is Priority
                                </Label></Col>
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default withAuthenticationRequired(AddTask, {
    onRedirecting: () => <Loading />,
});