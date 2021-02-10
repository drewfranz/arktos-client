import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import {
    Alert,
    Button,
    Card,
    CardBody,
    FormGroup,
    Label,
    UncontrolledCollapse
} from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { DeleteModal } from '../components';
import { Redirect } from 'react-router-dom';


const TaskItemSidebarForm = (props) => {
    const { getAccessTokenSilently } = useAuth0();
    const { id } = useParams();
    const [ redirect, setRedirect ] = useState(false);
    const [ errorAlertIsVisible, setErrorAlertIsVisible] = useState(false);
    const { task, parentHandleOnChange } = props;
    const [selected, setSelected] = useState(task.status);
    const [deleteModal, setDeleteModal] = useState(false);

    const toggleDeleteModal = () => setDeleteModal(!deleteModal);

    const handleOnChange = e => {
        e.preventDefault();
        setSelected(e.target.value);
        parentHandleOnChange(e);
    }

    const handleDeleteOnClick = e => {
        e.preventDefault();
        toggleDeleteModal();
    }

    const handleOnDelete = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently();
        fetch(process.env.REACT_APP_API_URL + '/tasks/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status && res.status === 204) {
                setRedirect(true);
            } else {
                setErrorAlertIsVisible(true);
                toggleDeleteModal();
            }
        });
    }

    const onDismissErrorAlert = e => {
        setErrorAlertIsVisible(false);
    }

    if (redirect) return <Redirect to="/tasks" />;

    return (
        <>
            <FormGroup row className="p-3">
                <Label for="status" xs="12">Status</Label>
                <select className="col-12" name="status" id="status" onChange={handleOnChange} value={selected} >
                    <option value="open">Open</option>
                    <option value="inProgress">In Progress</option>
                    <option value="test">Ready For Test</option>
                    <option value="approved">Approved</option>
                    <option value="closed">Closed</option>
                </select>
            </FormGroup>
            <FormGroup row className="p-3 d-flex flex-column">
                <FaCog id="toggler" />
                <UncontrolledCollapse toggler="#toggler" className="py-2">
                    <Card>
                        <CardBody>
                            <Button color="outline-danger" onClick={handleDeleteOnClick}>Delete</Button>
                        </CardBody>
                    </Card>
                </UncontrolledCollapse>
            </FormGroup>
            <Alert color="danger" isOpen={errorAlertIsVisible} toggle={onDismissErrorAlert}>
                There was an error. The task was not deleted. Please try again.
            </Alert>
            <DeleteModal deleteModal={deleteModal} handleOnDelete={handleOnDelete} toggle={toggleDeleteModal} />
        </>
    );
}

export default TaskItemSidebarForm;
