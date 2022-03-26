import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

interface Props {
    user: any,
    show: boolean,
    handleClose: any,
}

export default function DeleteConfirmation({show, handleClose}: Props): ReactElement {
    let {collectionId}: any = useParams();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button size="sm" variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
};