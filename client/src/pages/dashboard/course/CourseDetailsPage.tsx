import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import { getVehicleById, updateVehicle } from "./Course.service";

import defaultImage from '../../../icons/car.png';
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";
import ImagePreview from "../../../common/Image.preview";


export default function VehicleDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [vehicle, setVehicle]: any = useState({});

    const [vehicleImage, setVehicleImage]: any = useState([])


    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadVehicleDetails(id);
        })();


    }, [id])

    const loadVehicleDetails = async (id: any) => {

        let res = await getVehicleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setVehicle(data)

        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        })
    }


    const [formData, setFormData]: any = useState(vehicle)



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

        // setVehicle({
        //     ...vehicle,
        //     ...formData
        // })

        let data = new FormData();

        data.append('name', vehicle.name)
        data.append('price', vehicle.price)
        data.append('total_duration', vehicle.total_duration)
        data.append('start_date', vehicle.start_date)
        data.append('end_date', vehicle.end_date)
        data.append('course_type', vehicle.course_type)

        data.append('course_photo1', formData.course_photo1 ? formData.course_photo1 : vehicle.course_photo1)
        data.append('course_photo2', formData.course_photo2 ? formData.course_photo2 : vehicle.course_photo2)


        // vehicleImage.map((item: any, index: any) => (
        //     data.append('vehicle_photo' + (index + 1), item["file"])
        // ))


        data.append('minimum_participant', vehicle.minimum_participant)


        data.append('course_video_url', vehicle.course_video_url)

        data.append('description', vehicle.description)

        console.log(data)

        const res = await updateVehicle(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', result);
            ToastSuccessMsg("Update Successfully")
        } else if (res.status === 401) {
            console.log("failed")
        } else {
            console.log("Error submitting form!");
            ToastFailedMsg("Update falied")
        }

    }

    let [courseType, setCourseType]: any = useState([
        { name: 'Trail', value: 0 },
        { name: 'Full Payment', value: 1 },
        { name: 'Regular', value: 2 },
        { name: 'Demo Class', value: 3 },
        { name: 'Monthly', value: 4 },
        { name: 'Weekly', value: 5 }
    ]);



    return (

        <div className="mt-4 container-fluid">

            {vehicle &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> Course Name: {vehicle.name} - Model: {vehicle.vehicle_model} - VehicleId: {vehicle.id}</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                                <div className="float-right">
                                    {/*Source: {vehicle.sourceType} | Domain: {vehicle.domain}*/}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>


                        <Form>


                            <InputGroup size="sm" className="mb-3">
                                <FormControl as="select" className="shadow-none" type="text" name="course_type" aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={onInputChange}>
                                    <option>
                                        {vehicle.course_type == 0 && 'Trail'}
                                        {vehicle.course_type == 1 && 'Full Payment'}
                                        {vehicle.course_type == 2 && 'Regular'}
                                        {vehicle.course_type == 3 && 'Demo Class'}
                                        {vehicle.course_type == 4 && 'Monthly'}
                                        {vehicle.course_type == 5 && 'Weekly'}
                                    </option>
                                    {courseType.map((course_type: any, index: number) =>
                                        <option value={course_type.value} key={index}>{course_type.name}</option>
                                    )}
                                </FormControl>
                            </InputGroup>


                            <Form.Group as={Row}>
                                <Col xs={4}>
                                    <ImagePreview imagePath={vehicle.course_photo1} inputName="course_photo1" onInputFileChange={onInputFileChange} />
                                </Col>
                                <Col xs={4}>
                                    <ImagePreview imagePath={vehicle.course_photo2} inputName="course_photo2" onInputFileChange={onInputFileChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Name </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="name"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.name ? vehicle.name : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Price </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="price"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.price ? vehicle.price : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Total Duration </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="total_duration"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.total_duration ? vehicle.total_duration : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Start Date  </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="start_date" required type="date"
                                            defaultValue={vehicle.start_date ? vehicle.start_date : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> End Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="end_date" required type="date"
                                            defaultValue={vehicle.end_date ? vehicle.end_date : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>




                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Minimum Participant</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="minimum_participant"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.minimum_participant ? vehicle.minimum_participant : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Maximum Participant</Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="maximum_participant"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.maximum_participant ? vehicle.maximum_participant : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Course Video URL </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="course_video_url"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.course_video_url ? vehicle.course_video_url : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Description </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="description"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.description ? vehicle.description : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <div className="float-right">
                                <Button type="button" size="sm" onClick={onUploadAction}> Update </Button>
                            </div>


                        </Form>


                    </Card.Body>


                    <Card.Footer>
                        {/*none*/}
                    </Card.Footer>
                </Card>
            }
        </div>


    )
};