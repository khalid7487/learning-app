import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Card, Button, Col, Row, Form, FormControl, InputGroup, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getRoleById, getUser, getUserById, updateImageUser, updateRole, updateUser } from "./auth.service";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../common/toast";
import ImagePreview from "../common/Image.preview";

export default function RoleUpdatePage({ }: any): ReactElement {

    let { id }: any = useParams();

    let [role, setRole]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadUserDetails(id);
        })();
    }, [id])


    const loadUserDetails = async (id: any) => {

        let res = await getRoleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setRole(data)
            console.log(data)
        } else {
            //let error = await res.json()
        }
    }

    const [formData, setFormData]: any = useState(role)



    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('name', role.name)
        data.append('code', role.code)
        data.append('description', role.description)
        data.append('permissions', role.permissions)

        console.log("data", data)

        const res = await updateRole(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Successfully");
        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }

    }

    return (
        <div className="mt-4 container-fluid">

            {role &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> User Name: {role.location} - UserId: {role.id}</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>

                        <Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Name</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={role.name}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Code</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="code" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={role.code}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Description </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={role.description}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Permissions </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="permissions" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={role.permissions}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <div className="float-right">
                                <Button type="button" size="sm" onClick={onUploadAction}> Update </Button>
                            </div>

                        </Form>

                    </Card.Body>

                </Card>
            }
        </div>


    )
}