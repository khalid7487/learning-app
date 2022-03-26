import React, { ReactElement, RefAttributes, useState, useEffect } from "react";
import { Container, Button, Card, Col, Form, FormControl, InputGroup, Row, Image } from "react-bootstrap";
import { create, addCourse } from "./Course.service";
import { getUser } from "../../../auth/auth.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


// import profileImg from '../../icons/profile-img.png'
import defaultImage from '../../../icons/car1.png';


export default function VehicleCreatePage({ handleClose }: any): ReactElement {

    let [response, setResponse]: any = useState([]);

    const [formData, setFormData]: any = useState({
        name: '',
        price: '',
        total_duration: '',
        start_date: '',
        end_date: '',
        minimum_participant: '',
        maximum_participant: '',
        description: '',
        user: ''
    })
    // 0-> Trail, 1-> Full Payment, 2-> Regular, 3-> Demo Class, 4-> Monthly,5-> Weekly

    let [courseType, setCourseType]: any = useState([
        { name: 'Trail', value: 0 },
        { name: 'Full Payment', value: 1 },
        { name: 'Regular', value: 2 },
        { name: 'Demo Class', value: 3 },
        { name: 'Monthly', value: 4 },
        { name: 'Weekly', value: 5 }
    ]);

    let [tutorType, setTutorType]: any = useState([
        { name: 'Physical', value: 0 },
        { name: 'Virtual', value: 1 }
    ]);

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

        data.append('name', formData.name)
        data.append('course_type', formData.course_type)
        data.append('tutor_type', formData.tutor_type)
        data.append('price', formData.price)
        data.append('total_duration', formData.total_duration)
        data.append('start_date', formData.start_date)
        data.append('end_date', formData.end_date)
        data.append('minimum_participant', formData.minimum_participant)
        data.append('maximum_participant', formData.maximum_participant)
        data.append('course_video_url', formData.course_video_url)
        data.append('description', formData.description)
        // vehicleImage.map((item: any, index: any) => (
        //     data.append('vehicle_photo' + (index + 1), item["file"])
        // ))

        data.append('course_photo1', formData.course_photo1);
        data.append('course_photo2', formData.course_photo2);

        data.append('user', formData.user);

        console.log(data)

        const res = await addCourse(data)
        if (res.ok) {
            const result = await res.json()
            // console.log('msg', data);
            ToastSuccessMsg("Course Successfully saved")
        } else if (res.status === 401) {
            ToastFailedMsg("Course Failed to saved")
        } else {
            ToastFailedMsg("Course Failed to saved")
        }

    }



    return (

        <div className="mt-4 d-flex justify-content-center container-fluid">

            <Card style={{ width: '40rem' }}>
                <Card.Header>
                    <Row>
                        <Col>Course Add Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form>

                        <Form.Label >Please Upload Course Photo</Form.Label>
                        <Form.Group as={Row}>

                            <Col xs={12} lg={4} className="mt-3">
                                <Image style={{ width: '150px', height: '80px' }} src={previewImage(formData.course_photo1)} rounded />
                                <input className="mt-3" type="file" name="course_photo1" id="input" accept="image/*" onChange={onInputFileChange} />
                            </Col>
                            <Col xs={12} lg={4} className="mt-3">
                                <Image style={{ width: '150px', height: '80px' }} src={previewImage(formData.course_photo2)} rounded />
                                <input className="mt-3" type="file" name="course_photo2" id="input" accept="image/*" onChange={onInputFileChange} />
                            </Col>

                        </Form.Group>

                        <Row>
                            <Col sm={12} lg={6}>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="course_type" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Course Type</option>
                                        {courseType.map((course_type: any, index: number) =>
                                            <option value={course_type.value} key={index}>{course_type.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                <Form.Group >
                                    <Form.Label > Name </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                            placeholder="Please Enter Course Name"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.name ? formData.name : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Start Date </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="start_date" required type="date" onChange={onInputChange}
                                        //    defaultValue={moment().format("YYYY-MM-DD")}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Total Duration </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="total_duration" aria-label="Small"
                                            placeholder="Please Enter Duration Hour"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.total_duration ? formData.total_duration : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Minimum Participant </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="minimum_participant" aria-label="Small"
                                            placeholder="Please Enter Minimum Participant"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.minimum_participant ? formData.minimum_participant : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>


                            </Col>
                            <Col sm={12} lg={6}>

                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="tutor_type" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Tutor Type</option>
                                        {tutorType.map((tutor_type: any, index: number) =>
                                            <option value={tutor_type.value} key={index}>{tutor_type.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                <Form.Group >
                                    <Form.Label > Price </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="price" aria-label="Small"
                                            placeholder="Please Enter Price"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.price ? formData.price : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > End Date </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="end_date" aria-label="Small"
                                            required type="date" onChange={onInputChange}
                                        //    defaultValue={moment().format("YYYY-MM-DD")}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label >Course Video URL </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="course_video_url" aria-label="Small"
                                            placeholder="Please Enter Course Video URL"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.course_video_url ? formData.course_video_url : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Maximum Participant </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="maximum_participant" aria-label="Small"
                                            placeholder="Please Enter Minimum Participant"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.maximum_participant ? formData.maximum_participant : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                            </Col>
                        </Row>

                        <Form.Group as={Row}>
                            <Col >
                                <Form.Label > Description </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="textarea" className="shadow-none" type="text" name="description" aria-label="Small"
                                        placeholder="Please Enter Description"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.description ? formData.description : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <div className="float-right">
                            <Button type="button" size="sm" className="shadow-none" onClick={onUploadAction}> Save </Button>
                        </div>


                    </Form>

                </Card.Body>
            </Card>
        </div>


    )
};