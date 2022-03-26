import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Card, Button, Col, Row, Form, FormControl, InputGroup, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getLocationById, updateLocation } from "./Location.service";
import {ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg} from "../../../common/toast";


export default function LocationDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [locations, setLocations]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadScriptDetails(id);
        })();
    }, [id])

    const loadScriptDetails = async (id: any) => {
        let res = await getLocationById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setLocations(data)

        } else {
            //let error = await res.json()
        }
    }

    const [formData, setFormData]: any = useState(locations)


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...locations,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('location', formData.location)
        data.append('latitude', formData.latitude)
        data.append('longitude', formData.longitude)

        console.log(data)

        const res = await updateLocation(id, data)
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

            {locations &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> Location Name: {locations.location} - LocationId: {locations.id}</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                                <div className="float-right">
                                    Source: {locations.sourceType} | Domain: {locations.domain}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>


                        {/*<Card.Title>Special title treatment</Card.Title>*/}
                        {/* {JSON.stringify(locations)} */}

                        <Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Locations</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="location" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={locations.location}
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
                                            defaultValue={locations.latitude}
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
                                            defaultValue={locations.longitude}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <div className="float-right">
                                <Button type="button" size="sm" onClick={onUploadAction}> Save </Button>
                            </div>

                        </Form>

                    </Card.Body>
                    <Card.Footer>
                        {locations.sourceRef}
                    </Card.Footer>
                </Card>
            }
        </div>


    )
};