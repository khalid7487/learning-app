import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row } from 'react-bootstrap';
import { gets, getTeacherById } from "../DefaultHome.service";
import { useHistory } from "react-router-dom";

import background from "../../icons/background.jpg";
import car from "../../icons/car.png";
import defaultImage from "../../icons/car.png";
import location from "../../icons/location.png";
import message from "../../icons/message.png";

import DefaultImagePreview from "../../common/DefaultImage.preview";
import { getLoggedUserId } from "../../common/http";
import { ToastFailedMsg, ToastSuccessMsg } from "../../common/toast";
import { getAllUserPosts } from "./UsersPosts.service";

interface Props {

}

export default function StudentNeedPage({ }: Props): ReactElement {

    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let tripType = ["One Way", "Two Way", "Round Way", "Full Body"]
    let [teacherId, setTeacherId]: any = useState({});

    const [formData, setFormData]: any = useState({
        trip_type: '',
        from_location: '',
        to_location: '',
        from_date: '',
        to_date: '',
    })

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: 0,
        from_location: '',
        to_location: '',
        trip_type: '',
    });


    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData(filterQueries);
        })()


    }, [])

    const loadData = async (queries: any) => {


        let res = await getAllUserPosts(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            //    console.log('msg', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
            // const date = new Date(data.promo_expire_date);
            console.log("Test data ->", data);

        } else {
            //let error = await res.json()
        }
    }

    const onOpenClick = async (item: any) => {

        history.push(`/me/stdent-need-details/${item.id}`)
    }

    const teacher = async (id: any) => {
        console.log("course id ->", id)
        let res = await getTeacherById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // console.log("User", data)
            setTeacherId(data)
            console.log("teacher-> ", data.id)
        } else {
            ToastFailedMsg("Enrol Failed to saved")
        }
    }

    const onOrderClick = async (item: any) => {
        history.push(`/order/${item.id}`)
        // await teacher(item.id)

    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>

            {/* <Row style={{ marginRight: "-10px" }}>
                <img className="background-img" src={background} alt="alt" />
                <div className="top-left text-light ">
                    <h2>Reach your destination</h2>
                    <h2>In just a few taps!</h2>
                </div>
            </Row> */}

            <div className="container-fluid">

                {/* <Form className="shadow-lg p-3 mb-3 bg-white rounded jumbotron"
                    style={{ marginTop: '-130px', background: '#FFFFFF', minHeight: '200px' }}>

                    <Row className="pt-2 row mt-5">

                        <Col lg={3}>
                            <Form.Group >
                                <div className="mb-2 d-flex align-item-center">
                                    <img style={{ height: '20px' }} src={car} alt="car" />
                                    <span className="ml-2 ">What type of trip you are taking?</span>
                                </div>
                      
                                <FormControl as="select" className="shadow-none" type="text" name="trip_type"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    size="sm"
                                    onChange={onInputChange}>
                                    <option>Select Trip Type</option>
                                    {tripType.map((trip_type: any, index: number) =>
                                        <option value={trip_type} key={index}>{trip_type}</option>
                                    )}
                                </FormControl>
                            </Form.Group>


                        </Col>

                        <Col lg={3}>
                            <Form.Group>

                                <div className="mb-2 d-flex align-item-center">
                                    <img style={{ height: '20px' }} src={location} alt="car" />
                                    <span className="ml-2 ">Enter the location of your trip</span>
                                </div>

                                <FormControl className="shadow-none" placeholder="From" type="text"
                                    name="from_location" aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    size="sm"
                                    value={filterQueries.from_location ? filterQueries.from_location : ''}
                                    onChange={onInputChange}
                                />
                                

                            </Form.Group>
                        </Col>

                        <Col lg={3}>
                            <Form.Group >
                                <div className="mb-2 d-flex align-item-center">
                                    <img style={{ height: '20px' }} src={location} alt="car" />
                                    <span className="ml-2 ">Enter the destination of your trip</span>
                                </div>
                                <FormControl className="shadow-none" type="text" placeholder="To" name="to_location"
                                    aria-label="Small"
                                    size="sm"
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={filterQueries.to_location ? filterQueries.to_location : ''}
                                    onChange={onInputChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col lg={1} sm={12} className="mt-2">
                            <br />
                            <Button type="button" variant="primary" className="w-100 shadow-none"
                                onClick={e => loadData({
                                    from_location: filterQueries?.from_location,
                                    page: response.page - 1,
                                    to_location: filterQueries?.to_location,
                                    trip_type: filterQueries?.trip_type
                                })}
                                size="sm"> Search </Button>
                        </Col>

                    </Row>
                </Form> */}

                <Row>

                    {response.data?.map((item: any, index: number) =>

                        <Col key={index} className="mt-3 " sm="6" md="6" lg="4">
                            <Card className="shadow-lg bg-white  rounded" role="button">
                                <Card.Body>
                                    <Row>
                                        <Col onClick={((event: any) => onOpenClick(item))} sm={2} md={12}>
                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="h5 text-primary ">BDT <span className="h3 ">{item.price_per_month}</span></div>
                                            </div>

                                            <div className="d-flex justify-content-between mt-1">
                                                <span className="text-capitalize"><strong className="text-success ">Class: </strong> <span className="text-danger">{item?.preffered_class}</span></span>
                                                <span className="text-capitalize"><strong className="text-info ">Subject: </strong> <span className="text-danger">{item?.preffered_subject}</span></span>
                                            </div>
                                            <div className="d-flex justify-content-between mt-1">
                                                <span className="text-capitalize"><strong className="text-info ">Time: </strong> <span className="text-danger">{item?.preffered_time}</span></span>
                                                <span className="text-capitalize"><strong className="text-success ">Version: </strong> <span className="text-danger">{item?.preffered_version}</span></span>
                                            </div>

                                            <div className="d-flex justify-content-between mt-1">
                                                <span>
                                                    <strong className="text-info" >Tutor Type:</strong >
                                                    {item?.tutor_type === 0 && (<span className="text-danger"> Physical</span>)}
                                                    {item?.tutor_type === 1 && (<span className="text-danger"> Virtual</span>)}
                                                </span>
                                                {/* <span className="text-capitalize"><strong className="text-success ">Preffered Time: </strong> <span className="text-danger">{item?.preffered_time}</span></span> */}
                                            </div>
                                            <span className="d-flex flex-column  text-capitalize mt-1">
                                                <span><strong className="text-primary">Number of days in week:</strong> <span className="text-danger">{item?.number_of_days_in_week}</span> </span>
                                            </span>

                                            <span className="d-flex flex-column  text-capitalize mt-1">
                                                <span><strong className="text-primary">Location:</strong> <span className="text-danger">{item?.location}</span> </span>
                                            </span>

                                            {/* <div className="d-flex justify-content-between mt-1">
                                                <span>Success: 4 trips</span>
                                            </div> */}



                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-flex  float-right">
                                                {/* <Button type="button" size="sm" > <img style={{ height: "20px" }} src={call} /> Call </Button> */}
                                                <Button type="button" variant="outline-primary" className="mt-2" style={{ position: 'relative', zIndex: 2 }}
                                                    size="sm" onClick={((event: any) => onOrderClick(item))}> <img style={{ height: "20px" }} src={message} />
                                                    Enrol Now </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}
                </Row>

                <div className="d-flex mt-2 justify-content-between">
                    <div>Items: {response?.limit}</div>

                    <div>
                        <Pagination size="sm">
                            <Pagination.Prev onClick={e => loadData({
                                from_location: filterQueries?.from_location,
                                page: response.page - 1,
                                to_location: filterQueries?.to_location,
                                trip_type: filterQueries?.trip_type
                            })} />
                            <Pagination.Item> Pages: {response?.page} / {response?.totalPage} </Pagination.Item>
                            <Pagination.Next onClick={e => loadData({
                                to_location: filterQueries?.to_location,
                                page: response.page + 1,
                                from_location: filterQueries?.from_location,
                                trip_type: filterQueries?.trip_type
                            })} />
                        </Pagination>
                    </div>

                    <div>Total: {response?.count}</div>
                </div>
            </div>
        </div>
    )
};
