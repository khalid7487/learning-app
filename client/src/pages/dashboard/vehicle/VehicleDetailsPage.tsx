import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import { getVehicleById, updateVehicle } from "./vehicle.service";

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

        data.append('vehicle_model', vehicle.vehicle_model)
        data.append('vehicle_color', vehicle.vehicle_color)
        data.append('vehicle_sits', vehicle.vehicle_sits)
        data.append('vehicle_plate_no', vehicle.vehicle_plate_no)
        
        data.append('vehicle_photo1', formData.vehicle_photo1 ? formData.vehicle_photo1 : vehicle.vehicle_photo1)
        data.append('vehicle_photo2', formData.vehicle_photo2 ? formData.vehicle_photo2 : vehicle.vehicle_photo2)
        data.append('vehicle_photo3', formData.vehicle_photo3 ? formData.vehicle_photo3 : vehicle.vehicle_photo3)
        data.append('vehicle_photo4', formData.vehicle_photo4 ? formData.vehicle_photo4 : vehicle.vehicle_photo4)

        // vehicleImage.map((item: any, index: any) => (
        //     data.append('vehicle_photo' + (index + 1), item["file"])
        // ))


        data.append('vehicle_licence_no', vehicle.vehicle_licence_no)
        data.append('vehicle_licence_front', formData.vehicle_licence_front ? formData.vehicle_licence_front : vehicle.vehicle_licence_front);
        data.append('vehicle_licence_back', formData.vehicle_licence_back ? formData.vehicle_licence_back : vehicle.vehicle_licence_back);

        data.append('driving_licence_no', vehicle.driving_licence_no)
        data.append('driving_licence_front', formData.driving_licence_front ? formData.driving_licence_front : vehicle.driving_licence_front);
        data.append('driving_licence_back', formData.driving_licence_back ? formData.driving_licence_back : vehicle.driving_licence_back);


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


    return (

        <div className="mt-4 container-fluid">

            {vehicle &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> Vehicle Name: {vehicle.name} - Model: {vehicle.vehicle_model} - VehicleId: {vehicle.id}</Col>
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

                            <Form.Group as={Row}>

                                <Form.Label column sm="2"> Update 4 Vehicle Images </Form.Label>

                                <Row>
                                    <Col>
                                        <ImagePreview imagePath={vehicle.vehicle_photo1} inputName="vehicle_photo1" onInputFileChange={onInputFileChange}/>
                                        {/*<Image style={{ height: '100px', width: '150px' }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + vehicle.vehicle_photo2} rounded /><br/>*/}
                                        {/*<input className="mt-1" type="file" name="vehicle_photo1" accept="image/*" onChange={onInputFileChange} />*/}
                                    </Col>

                                    <Col>
                                        <ImagePreview imagePath={vehicle.vehicle_photo2} inputName="vehicle_photo2" onInputFileChange={onInputFileChange}/>
                                    </Col>

                                    <Col>
                                        <ImagePreview imagePath={vehicle.vehicle_photo3} inputName="vehicle_photo3" onInputFileChange={onInputFileChange}/>
                                    </Col>

                                    <Col>
                                        <ImagePreview imagePath={vehicle.vehicle_photo4} inputName="vehicle_photo4" onInputFileChange={onInputFileChange}/>
                                    </Col>
                                </Row>

                                <br />


                                {/* {vehicleImage && vehicleImage?.map((item: any, index: any) =>
                                    <Col xs={2}>
                                        <Image key={index} style={{ height: '100px', width: '150px' }} src={item.reader}
                                            rounded />
                                    </Col>
                                )
                                } */}
                                {/* <Col xs={12}>
                                    <input type="file" name="image-upload" id="input" accept="image/*"
                                        onChange={imageHandler} />
                                </Col> */}

                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Car Model </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="vehicle_model"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.vehicle_model ? vehicle.vehicle_model : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Car Color </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="vehicle_color"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.vehicle_color ? vehicle.vehicle_color : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Car Seats </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="vehicle_sits"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.vehicle_sits ? vehicle.vehicle_sits : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Car Number </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="vehicle_plate_no"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={vehicle.vehicle_plate_no ? vehicle.vehicle_plate_no : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <div>
                                <Card.Title>Vehicle Info</Card.Title>
                                <hr></hr>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="2"> Car License</Form.Label>
                                    <Col sm="10">
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="vehicle_licence_no"
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={vehicle.vehicle_licence_no ? vehicle.vehicle_licence_no : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="2"> Driving License</Form.Label>
                                    <Col sm="10">
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="driving_licence_no"
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={vehicle.driving_licence_no ? vehicle.driving_licence_no : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Col>
                                </Form.Group>




                                <Form.Group as={Row}>
                                    <Col xs={4}>
                                        <ImagePreview imagePath={vehicle.vehicle_licence_front} inputName="vehicle_licence_front" onInputFileChange={onInputFileChange}/>
                                    </Col>
                                    <Col xs={4}>
                                        <ImagePreview imagePath={vehicle.vehicle_licence_back} inputName="vehicle_licence_back" onInputFileChange={onInputFileChange}/>
                                    </Col>
                                </Form.Group>

                            </div>

                            <div>
                                <Card.Title>Driver Info</Card.Title>
                                <hr></hr>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="2"> Driver License</Form.Label>
                                    <Col sm="10">
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="driving_licence_no"
                                                aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={vehicle.driving_licence_no ? vehicle.driving_licence_no : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row}>
                                    <Col xs={4}>
                                        <ImagePreview imagePath={vehicle.driving_licence_front} inputName="driving_licence_front" onInputFileChange={onInputFileChange}/>
                                    </Col>
                                    <Col xs={4}>
                                        <ImagePreview imagePath={vehicle.driving_licence_back} inputName="driving_licence_back" onInputFileChange={onInputFileChange}/>
                                    </Col>
                                </Form.Group>

                            </div>


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