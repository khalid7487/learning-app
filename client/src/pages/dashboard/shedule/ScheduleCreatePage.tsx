import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, } from "react-bootstrap";
import { getVehicleById } from "../course/Course.service";
import { create } from "../trip/Trip.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";
import { getLoggedUserId } from "../../../common/http";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function TripCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();

    const [formData, setFormData]: any = useState({
        name: '',
        schedule_type: '',
        start: '',
        end: '',
        duration: '',
        location: '',
        meeting_url: '',
        promo_code: '',
        description: '',
        user: ''
    })

    let [scheduleType, setScheduleType]: any = useState([
        { name: 'Free', value: 0 }, { name: 'Paid', value: 1 }
    ]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // onFormSubmit(formData)      // call parent method
        e.preventDefault();

        let data = new FormData();

        data.append('schedule_type', formData.schedule_type)
        data.append('name', formData.name)
        data.append('start', formData.start)
        data.append('end', formData.end)
        data.append('price', formData.price)
        data.append('location', formData.location)
        data.append('duration', formData.duration)
        data.append('meeting_url', formData.meeting_url)
        data.append('description', formData.description)
        data.append('user', getLoggedUserId())

        let res = await create(data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Schedule Successfully saved")

            setFormData({})

        } else {
            ToastFailedMsg("Schedule Failed to saved")
        }
    }

    return (

        <div className="mt-4 d-flex justify-content-center container-fluid">

            <Card >
                <Card.Header>
                    <Row>
                        <Col>Schedule Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body >

                    <Form method="post" onSubmit={onFormSubmit}>

                        <Row>
                            <Col lg={6}>

                                <Form.Group >
                                    <Form.Label > Name </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                            placeholder="Please Enter Schedule Name"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.name ? formData.name : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Start Date </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="start" required type="datetime-local" onChange={onInputChange}
                                        //    defaultValue={moment().format("YYYY-MM-DD")}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label >Location </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="location" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.location ? formData.location : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Label > Schedule Type </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="schedule_type" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Schedule Type</option>
                                        {scheduleType.map((schedule_type: any, index: number) =>
                                            <option value={schedule_type.value} key={index}>{schedule_type.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>


                            </Col>


                            <Col lg={6}>

                                <Form.Group >
                                    <Form.Label > Price </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="price" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.price ? formData.price : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > End Date </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="end" aria-label="Small"
                                            required type="datetime-local" onChange={onInputChange}
                                        //    defaultValue={moment().format("YYYY-MM-DD")}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Duration </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="duration" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.duration ? formData.duration : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Meeting Url </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="meeting_url" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.meeting_url ? formData.meeting_url : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>


                            </Col>
                        </Row>
                        
                        <Form.Group >
                            <Form.Label > Description </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl as="textarea" className="shadow-none" type="text" name="description" aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={formData.description ? formData.description : ''}
                                    onChange={onInputChange} />
                            </InputGroup>
                        </Form.Group>

                        <div className="float-right mt-2">
                            <Button type="submit" className="float-right" size="sm"> Submit Schedule</Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        </div >


    )
};