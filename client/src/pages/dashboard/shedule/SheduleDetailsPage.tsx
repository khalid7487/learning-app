import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { getSchduleById, UpdateSchedule } from "./Shedule.service";
import { useParams } from "react-router-dom";
import { CgLoupe } from "react-icons/cg";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";
import moment from "moment";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function TripDetailsPage({ }: any): ReactElement {
    const [date1, setDate1]: any = useState()
    const [date2, setDate2]: any = useState()

    const [formData, setFormData]: any = useState({
        domain: '',
        ac_type: '',
        trip_type: '',
        from_location: '',
        to_location: '',
        price: '',
        from_date: '',
        to_date: '',

    })

    let { id }: any = useParams();
    let [trip, setTrip]: any = useState({});


    let acType = ['AC', 'Non AC']
    let tripType = ["One Way", "Two Way", "Round Way"]

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadTripDetails(id);
        })();

    }, [id])


    const loadTripDetails = async (id: any) => {
        console.log("id ->", id)

        let res = await getSchduleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setTrip(data)
            let temp1 = data.from_date
            let temp2 = data.to_date
            console.log(parseInt(temp1))
            console.log(parseInt(temp2))
            // let date1 = new Date(parseInt(temp1)).toLocaleString()
            // let date2 = new Date(parseInt(temp2)).toLocaleString()
            // console.log(date1)
            // console.log(date2)
            // setDate1(date1)
            // setDate2(date2)

        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrip({
            ...trip,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        // let milisecond = trip.from_date
        // let milisecond1 = trip.to_date
        // let date1 = new Date(milisecond).getTime();
        // let date2 = new Date(milisecond1).getTime();

        // console.log("date1", date1)
        // console.log("date2", date2)

        // data.append('from_date', date1.toString())
        // data.append('to_date', date2.toString())
        data.append('name', trip.name)
        data.append('start', trip.start)
        data.append('end', trip.end)
        data.append('location', trip.location)
        data.append('duration', trip.duration)
        data.append('meeting_url', trip.meeting_url)
        data.append('description', trip.description)

        console.log(data)

        let res = await UpdateSchedule(id, data)

        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Schedule Successfully saved")

            setFormData({})

        } else {
            //let error = await res.json()
            //console.log("error", error)
            ToastFailedMsg("Update Failed to saved")
        }
    }

    return (

        <div className="mt-4 container-fluid">

            {trip &&
                <Card>
                    <Card.Header>
                        <Row>
                            <Col> Schedule Name: {trip.name}  ScheduleId: {trip.id}</Col>
                        </Row>
                    </Card.Header>


                    <Card.Body>


                        {/* <Form method="put" onSubmit={onFormSubmit}> */}

                        <Form>

                            {/* <InputGroup size="sm" className="mb-3">
                            <FormControl as="select" className="shadow-none" type="text" name="ac_type" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={onInputChange}>
                                <option>Select AC Type</option>
                                {acType.map((ac_type: any, index: number) =>
                                    <option value={ac_type} key={index}>{ac_type}</option>
                                )}
                            </FormControl>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="select" className="shadow-none" type="text" name="trip_type" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={onInputChange}>
                                <option>Select Trip Type</option>
                                {tripType.map((trip_type: any, index: number) =>
                                    <option value={trip_type} key={index}>{trip_type}</option>
                                )}
                            </FormControl>
                        </InputGroup> */}

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Name </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip.name ? trip.name : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            {/*                 <Form.Group as={Row}>
                                <Form.Label column sm="2"> From Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="from_date" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip?.from_date ? date1 : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                         <Form.Group as={Row}>
                                <Form.Label column sm="2"> To Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="to_date" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip?.to_date ? date2 : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group> */}

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Start Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="start" required type="datetime-local" onChange={onInputChange}
                                            // defaultValue={moment(trip?.from_date).format("YYYY-MM-DD")}
                                            defaultValue={trip.start ? trip.start : ''}
                                        />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> End Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" name="end" aria-label="Small"
                                            required type="datetime-local" onChange={onInputChange}
                                            // defaultValue={moment(trip.to_date).format("YYYY-MM-DD")}
                                            defaultValue={trip.end ? trip.end : ''}
                                        />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Location </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="location" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip.location ? trip.location : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Duration </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="duration" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip.duration ? trip.duration : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Meeting Url </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="meeting_url" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip.meeting_url ? trip.meeting_url : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label as="textarea" column sm="2"> Description </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={trip.description ? trip.description : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <div className="float-right">
                                {/* <Button type="submit" className="float-right" size="sm"> Update Trip</Button> */}
                                <Button type="button" size="sm" onClick={onUploadAction}> Update </Button>
                            </div>


                        </Form>
                    </Card.Body>


                </Card>
            }
        </div>


    )
};