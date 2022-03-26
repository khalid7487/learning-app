import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Card, Button, Col, Row, Form, FormControl, InputGroup, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUser, getUserById, updateImageUser, updateUser } from "./auth.service";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../common/toast";
import ImagePreview from "../common/Image.preview";


export default function UserDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [user, setUser]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadUserDetails(id);
        })();
    }, [id])

    const loadUserDetails = async (id: any) => {

        let res = await getUserById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setUser(data)
            console.log(data)
        } else {
            //let error = await res.json()
        }
    }

    const [formData, setFormData]: any = useState(user)



    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const onInputFileChange = (e: any) => {

        console.log('Name', `${e.target.name}`);
        console.log('File', `${e.target.files[0]}`);

        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })


        console.log('formData', formData);

    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('firstname', user.firstname)
        data.append('lastname', user.lastname)
        data.append('dateOfbirth', user.dateOfbirth)
        data.append('address', user.address)
        data.append('latitude', user.latitude)
        data.append('longitude', user.longitude)
        data.append('nid_no', user.nid_no)
        data.append('passport_no', user.passport_no)
        data.append('short_bio', user.short_bio)
        data.append('bio', user.bio)
        data.append('nid_front', formData.nid_front ? formData.nid_front : user?.identity?.nid_front);
        data.append('nid_back', formData.nid_back ? formData.nid_back : user?.identity?.nid_back);
        data.append('passport_front', formData.passport_front ? formData.passport_front : user?.identity?.passport_front);
        data.append('passport_back', formData.passport_back ? formData.passport_back : user?.identity?.passport_back);
        // data.append('vehicle_licence_back', formData.vehicle_licence_back ? formData.vehicle_licence_back : vehicle.vehicle_licence_back);

        console.log("data", data)

        const res = await updateUser(id, data)
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

    const updateImage = async (e: any) => {
        let data = new FormData();
        data.append('profile_image', formData.profile_image ? formData.profile_image : user.profile_image)

        console.log("data", data)

        const res = await updateImageUser(id, data)
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

            {user &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> User Name: {user.name} - UserId: {user.id}</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>

                        <Form>

                            <Col xs={4}>
                                <ImagePreview imagePath={user.profile_image} inputName="profile_image" onInputFileChange={onInputFileChange} />
                                <Button className="mt-3" type="button" size="sm" onClick={updateImage}> Update Profile Image </Button>
                            </Col>

                            <Form.Group className="mt-3" as={Row}>
                                <Form.Label column sm="2"> First Name</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="firstname" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.firstname}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Last Name </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="lastname" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.lastname}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Date of Birth </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="dateOfbirth" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.dateOfbirth}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Address </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="address" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.address}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Latitude </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="latitude" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.latitude}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Longitude </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="longitude" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.longitude}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> NID Number </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="nid_no" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user?.identity?.nid_no}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col xs={4}>
                                    <ImagePreview imagePath={user?.identity?.nid_front} inputName="nid_front" onInputFileChange={onInputFileChange} />
                                </Col>
                                <Col xs={4}>
                                    <ImagePreview imagePath={user?.identity?.nid_back} inputName="nid_back" onInputFileChange={onInputFileChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Passport No </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="passport_no" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user?.identity?.passport_no}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col xs={4}>
                                    <ImagePreview imagePath={user?.identity?.passport_front} inputName="passport_front" onInputFileChange={onInputFileChange} />
                                </Col>
                                <Col xs={4}>
                                    <ImagePreview imagePath={user?.identity?.passport_back} inputName="passport_back" onInputFileChange={onInputFileChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Short Bio </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="short_bio" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.short_bio}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Bio </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="bio" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={user.bio}
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
};