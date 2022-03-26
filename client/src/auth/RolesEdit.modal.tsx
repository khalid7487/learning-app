import React, {ReactElement, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {post} from "../common/http";

interface Props {
    role: any,
    show: boolean,
    handleClose: any,
}

export default function RolesEditModal({role, show, handleClose}: Props): ReactElement {

    let {collectionId}: any = useParams();

    const [formData, setFormData] = useState({})

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // let res = await post("/auth/register", formData)
        // if (res.status === 200 || res.status === 201) {
        //     //success
        //     let data = await res.json()
        //     localStorage.setItem('basic', data.data.accessToken)
        //     history.push('/')
        // } else {
        //     //failure
        //     let error = await res.json()
        //     console.log("error", error)
        // }


        console.log('msg', {...role, ...formData});
        handleClose();
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Form method="post" onSubmit={onFormSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Role Edit Panel</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                    defaultValue={role.name} aria-describedby="inputGroup-sizing-sm" onChange={onInputChange}/>
                    </InputGroup>

                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl className="shadow-none" type="description" name="description" aria-label="Small"
                                     defaultValue={role.description} aria-describedby="inputGroup-sizing-sm" onChange={onInputChange}/>
                    </InputGroup>

                    {/*<Button type="submit" className="float-right" size="sm"> Submit </Button>*/}


            </Modal.Body>
            <Modal.Footer>
                <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
                <Button size="sm" variant="primary" type="submit"> Save Changes </Button>
            </Modal.Footer>

        </Form>
        </Modal>


    )
};