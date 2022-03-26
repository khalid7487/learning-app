import React, {ReactElement, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {post} from "../common/http";

interface Props {
    data: any,
    show: boolean,
    handleClose: any,
}

export default function UsersDetailsModal({data, show, handleClose}: Props): ReactElement {

    return (

        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details Panel</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div> Date Of Birth: {data.dateOfBirth} </div>
                <div> Profession: {data.profession} </div>
                <div> Locality: {data.locality} </div>
                <div> Economic Situation: {data.economicSituation} </div>
                <div> Level of Education: {data.levelOfEducation} </div>
                <div> Hearing Status: {data.hearingStatus? "YES": "NO"} </div>
                <div> Address: {data.address} </div>
                <div> Comments: {data.comments} </div>
                <div> IS Smoker: {data.smoker? "YES": "NO"} </div>
                <div> IS Stutter: {data.stutte? "YES": "NO"} </div>

            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
            </Modal.Footer>
        </Modal>


    )
};