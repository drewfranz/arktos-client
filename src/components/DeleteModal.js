import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

const DeleteModal = (props) => {
    const { deleteModal, handleOnDelete, toggle} = props;
    return (
        <Modal isOpen={deleteModal} fade={false} toggle={toggle}>
            <ModalHeader toggle={toggle} className="bg-danger">Delete Task</ModalHeader>
            <ModalBody>
                You are about to delete this item This action can not be undone.
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleOnDelete}>Yes, Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteModal;