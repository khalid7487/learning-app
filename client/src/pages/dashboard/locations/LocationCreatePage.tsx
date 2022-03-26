import React, {ReactElement, RefAttributes, useState, useEffect} from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { create, addVehicle } from "./Location.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


// import profileImg from '../../icons/profile-img.png'
import defaultImage from '../../../icons/car.png';


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function LocationCreatePage({ handleClose }: any): ReactElement {


    const [formData, setFormData]: any = useState({
        domain: '',
        name: '',
        location: '',
        latitude: '',
        longitude: ''
    })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('location', formData.location)
        data.append('latitude', formData.latitude)
        data.append('longitude', formData.longitude)

        console.log(data)

        const res = await addVehicle(data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);

        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }

    }

    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Location Add Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Location </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="location" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.location ? formData.location : ''}
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
                                        value={formData.latitude ? formData.latitude : ''}
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
                                        value={formData.longitude ? formData.longitude : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <div className="float-right">
                            <Button className="shadow-none" type="button" size="sm" onClick={onUploadAction}> Save </Button>
                        </div>


                    </Form>
               
                </Card.Body>
            </Card>
        </div>


    )
};