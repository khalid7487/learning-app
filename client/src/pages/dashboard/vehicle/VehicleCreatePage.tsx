import React, { ReactElement, RefAttributes, useState, useEffect } from "react";
import { Container, Button, Card, Col, Form, FormControl, InputGroup, Row, Image } from "react-bootstrap";
import { create, addVehicle } from "./vehicle.service";
import { getUser } from "../../../auth/auth.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


// import profileImg from '../../icons/profile-img.png'
import defaultImage from '../../../icons/car1.png';


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function VehicleCreatePage({ handleClose }: any): ReactElement {

    let [response, setResponse]: any = useState([]);

    const [formData, setFormData]: any = useState({
        domain: '',
        name: '',
        description: '',
        vehicle_model: '',
        vehicle_color: '',
        vehicle_sits: 0,
        vehicle_plate_no: '',
        vehicle_licence_no: '',
        driving_licence_no: '',
        user: ''
    })

    const [vehicleImage, setVehicleImage]: any = useState([])
    // const [token, setToken]: any = useState(getToken)

    useEffect(() => {
        (async () => {
            await loadData();
        })()

    }, [])

    const loadData = async () => {
        let res = await getUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()


            // if (isMounted) setResponse(data)
            setResponse(data)
            console.log('id', data.id);
            setFormData({
                ...formData,
                user: data.id
            })
        } else {
            //let error = await res.json()
        }
    }

    //For array
    const imageHandler = (e: any) => {
        const reader = new FileReader();
        console.log(vehicleImage.length);
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (vehicleImage.length < 4) {
                    setVehicleImage([...vehicleImage, { reader: reader.result, ["file"]: e.target.files[0] }])
                } else {
                    console.log("")
                }

            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const onInputFileChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const previewImage = (file: RefAttributes<HTMLImageElement>) => {
        if (file) return URL.createObjectURL(file)
        return defaultImage;
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('vehicle_model', formData.vehicle_model)
        data.append('vehicle_color', formData.vehicle_color)
        data.append('vehicle_sits', formData.vehicle_sits)
        data.append('vehicle_plate_no', formData.vehicle_plate_no)

        vehicleImage.map((item: any, index: any) => (
            data.append('vehicle_photo' + (index + 1), item["file"])
        ))

        data.append('vehicle_licence_no', formData.vehicle_licence_no)
        data.append('vehicle_licence_front', formData.vehicle_licence_front);
        data.append('vehicle_licence_back', formData.vehicle_licence_back);

        data.append('driving_licence_no', formData.driving_licence_no)
        data.append('driving_licence_front', formData.driving_licence_front);
        data.append('driving_licence_back', formData.driving_licence_back);

        data.append('user', formData.user);

        console.log(data)

        const res = await addVehicle(data)
        if (res.ok) {
            const result = await res.json()
            // console.log('msg', data);
            ToastSuccessMsg("Vehicle Successfully saved")
        } else if (res.status === 401) {
            ToastFailedMsg("Vehicle Failed to saved")
        } else {
            ToastFailedMsg("Vehicle Failed to saved")
        }

    }



    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Vehicle Add Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Add 4 Vehicle Images </Form.Label>
                            {vehicleImage && vehicleImage?.map((item: any, index: any) =>
                                <Col xs={12} lg={2} >
                                    <Image key={index} style={{ height: '100px', width: '150px' }} className="mt-2" src={item.reader} rounded />
                                </Col>
                            )
                            }
                            <Col xs={12}>
                                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
                            </Col>

                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Car Model </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="vehicle_model" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.vehicle_model ? formData.vehicle_model : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Car Color </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="vehicle_color" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.vehicle_color ? formData.vehicle_color : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Car Seats </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="number" name="vehicle_sits" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.vehicle_sits ? formData.vehicle_sits : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Car Number </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="vehicle_plate_no" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.vehicle_plate_no ? formData.vehicle_plate_no : ''}
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
                                        <FormControl className="shadow-none" type="text" name="vehicle_licence_no" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.vehicle_licence_no ? formData.vehicle_licence_no : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Label >Please Upload Vehicle Licence Photo Front And Back</Form.Label>
                            <Form.Group as={Row}>
                              
                                <Col xs={12} lg={4}  className="mt-3">
                                    <Image style={{ width: '150px' }} src={previewImage(formData.vehicle_licence_front)} rounded />
                                    <input className="mt-3" type="file" name="vehicle_licence_front" id="input" accept="image/*" onChange={onInputFileChange} />
                                </Col>
                                <Col xs={12} lg={4}  className="mt-3">
                                    <Image style={{ width: '150px' }} src={previewImage(formData.vehicle_licence_back)} rounded />
                                    <input className="mt-3" type="file" name="vehicle_licence_back" id="input" accept="image/*" onChange={onInputFileChange} />
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
                                        <FormControl className="shadow-none" type="text" name="driving_licence_no" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.driving_licence_no ? formData.driving_licence_no : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Label >Plaese Upload Driver Licence Photo Front And Back</Form.Label>
                            <Form.Group as={Row}>
                                <Col xs={12} lg={4}  className="mt-3">
                                    <Image style={{ width: '150px' }} src={previewImage(formData.driving_licence_front)} rounded />
                                    <input className="mt-3" type="file" name="driving_licence_front" id="input" accept="image/*" onChange={onInputFileChange} />
                                </Col>
                                <Col xs={12} lg={4}  className="mt-3">
                                    <Image style={{ width: '150px' }} src={previewImage(formData.driving_licence_back)} rounded />
                                    <input className="mt-3" type="file" name="driving_licence_back" id="input" accept="image/*" onChange={onInputFileChange} />
                                </Col>
                            </Form.Group>
                        </div>

                        <div className="float-right">
                            <Button type="button" size="sm" className="shadow-none" onClick={onUploadAction}> Save </Button>
                        </div>


                    </Form>

                </Card.Body>
            </Card>
        </div>


    )
};