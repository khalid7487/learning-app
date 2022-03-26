import React, { RefAttributes, ReactElement, useState, useEffect } from "react";
import { Button, Card, Col, Row, Container, Form, InputGroup, FormControl, Image, Carousel } from 'react-bootstrap';
import { getPackageById, getCourseById, getTeacherById, enrolCourse } from "./DefaultHome.service";

import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../common/toast";
import { useParams, useHistory } from "react-router-dom";

import pp from "../icons/profile-img.png";
import car from "../icons/car.png";

import TopNav from "../common/TopNav.page";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import defaultImage from "../icons/d-background.jpg";

import DefaultImagePreview from "../common/DefaultImage.preview";

import message from "../icons/message.png";
import banner from "../icons/banner.png"

import { getLoggedUserId } from "../common/http";


import './carousel/slider-section.scss'
import './carousel/left-banner.scss'
import './carousel/right-banner.scss'
import './carousel/slider.scss'
import CarouselImagePreview from "./carousel/CarouselImage.preview";


export default function DetailsPage({ handleClose }: any): ReactElement {


    let { id }: any = useParams();
    let history = useHistory();


    let [course, setCourse]: any = useState({});
    let [vehicle, setVehicle]: any = useState({});

    let [teacher, setTeacher]: any = useState({});
    let [packages, setPackage]: any = useState([]);
    let [video, setVideo]: any = useState()

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadCourseDetails(id);
            // await loadVehicleDetails(id);
            await loadTeacherDetails(id);
            // await loadPackageDetails(userId);
        })();
    }, [id])

    const loadCourseDetails = async (id: any) => {

        let res = await getCourseById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setCourse(data)
            console.log("video_URl", data.course_video_url)

            // let str = data.course_video_url;
            // @ts-ignore
            // const str = 'https://www.youtube.com/watch?v=yEHCfRWz-EI';
            // const str = 'https://youtu.be/2jil1JDTQGg?list=RDLiI_srSg1AY';
            const str = data.course_video_url;
            console.log(str)
            // @ts-ignore
            const str1 = str.replace('watch?v=', 'embed/')
            console.log(str1)
            setVideo(str1)
        } else {
            //let error = await res.json()
        }
    }


    const loadTeacherDetails = async (id: any) => {

        let res = await getTeacherById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("User", data)
            setTeacher(data)
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }


    const onOpenClick = async (item: any) => {
        history.push(`/details/${item.id}`)
    }

    const onOrderClick = async (item: any) => {
        history.push(`/order/${item.id}`)
        // console.log(item.id);
        // let data = {
        //     'teacher_id': teacher?.id,
        //     'user_id': getLoggedUserId(),
        //     'courses': item.id
        // }
        // console.log(data)
        // const res = await enrolCourse(data)
        // if (res.ok) {
        //     const result = await res.json()
        //     console.log('msg', data);
        //     ToastSuccessMsg("Enrol Successfully saved")
        // } else if (res.status === 401) {
        //     // alert("failed")
        // } else {
        //     // alert("Error submitting form!");
        //     ToastFailedMsg("Enrol Failed to saved")
        // }

    }

    const onHiredriverClick = async (item: any) => {
        history.push(`/hire-teachers/${item.id}`)
    }

    return (
        <>
            <TopNav />
            <div className="container-fluid">

                <div className="mt-3 slider-container">

                    <div className="left-banner">
                        <img src={banner} alt="banner" />
                    </div>

                    <Carousel fade className="w-100 h-100">
                        <Carousel.Item interval={1000}>
                            <CarouselImagePreview imagePath={course?.course_photo1} defaultImage={defaultImage} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={1000}>
                            <CarouselImagePreview imagePath={course?.course_photo2} defaultImage={defaultImage} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>

                    <div className="right-sidebar">
                        <img src={banner} alt="banner" />
                    </div>
                </div>


                <Row>

                    <Col className="mt-2">
                        {/* <video
                                    controls
                                    src={course.course_video_url}
                                    style={{ width: "100%", height: "250px" }}
                                /> */}

                        <iframe
                            style={{ width: "100%", height: "250px" }}
                            src={video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded watch youtube"
                        />

                    </Col>
                </Row>


                <Row>

                    <Col className="mt-3" lg="6" sm="12">
                        <Card style={{ height: '300px' }} className="shadow-lg bg-white rounded">
                            <Card.Body >
                                <Row>

                                    <Col sm={2} md={9}>
                                        {/* <div className="d-flex justify-content-between">
                                            <span>BDT:{vehicletrip.price}</span>
                                            <span>ratiing</span>
                                        </div> */}
                                        <Row className="d-flex justify-content-between">
                                            <Col className="h5 text-primary ">BDT <span className="h3 ">{course.price}</span></Col>
                                            <Col className="font-weight-bold text-danger "> &#9733; 4.5 Rating</Col>
                                        </Row>

                                        {/* <span className="font-weight-bold text-uppercase " >{course.from_location} to {course.to_location}</span> */}

                                        <Row className="d-flex justify-content-between  text-capitalize mt-1">
                                            <Col> <strong className="text-primary">Course Name:</strong> <span className="text-warning">{course.name}</span></Col>
                                            <Col><strong className="text-info">Course Duration:</strong> <span className="text-danger"> {course.total_duration} Hour </span></Col>
                                        </Row>

                                        <Row className="d-flex justify-content-between  text-capitalize mt-1">
                                            <Col><strong className="text-info"> Start Date:</strong> <span className="text-danger"> {course.start_date} </span></Col>
                                            <Col><strong className="text-info"> End Date: </strong>  <span className="text-danger">{course.end_date}</span></Col>
                                        </Row>
                                        <Row className="d-flex  justify-content-between text-capitalize mt-1">
                                            <Col> <strong>Minimum Participant:</strong> <span className="text-warning font-weight-bold"> {course.minimum_participant} </span></Col>
                                            <Col> <strong>Maximum Participant:</strong> <span className="text-warning font-weight-bold"> {course?.maximum_participant}</span> </Col>
                                        </Row>


                                        <Row className="d-flex justify-content-between mt-1">
                                            <Col><strong className="text-primary">Course Type:</strong>
                                                {course?.course_type === 0 && (<span className="text-danger"> Trail</span>)}
                                                {course?.course_type === 1 && (<span className="text-danger"> Full Payment</span>)}
                                                {course?.course_type === 2 && (<span className="text-danger"> Regular</span>)}
                                                {course?.course_type === 3 && (<span className="text-danger"> Demo Class</span>)}
                                                {course?.course_type === 4 && (<span className="text-danger"> Monthly</span>)}
                                                {course?.course_type === 5 && (<span className="text-danger"> Weekly</span>)}
                                            </Col>
                                        </Row>
                                        <Row className="d-flex  justify-content-between text-capitalize mt-1">
                                            <Col> <strong className="text-info">Description:</strong> {course.description}</Col>
                                        </Row>

                                        <div className="d-flex justify-content-between mt-2">
                                            {/* <Button className="shadow-none" variant="outline-primary" type="button" size="sm"> Messenger </Button> */}
                                            <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onOrderClick(course))} > Enrol Now </Button>
                                        </div>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col className="mt-3" lg="6" sm="12">

                        <Card style={{ height: '300px' }} className="shadow-lg rounded d-flex " >
                            <Card.Body >

                                <Row>
                                    <Col >
                                        <Image roundedCircle style={{ width: "100px", marginLeft: '15%', height: '100px' }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + teacher?.profile_image} alt="img" />
                                        {/* <DefaultImagePreview imagePath={teacher?.profile_image} defaultImage={pp} /> */}

                                    </Col>
                                    <Col >
                                        <span className="font-weight-bold text-danger float-right "> &#9733; 4.5 Rating</span>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col >
                                        <Row>
                                            <Col xs={12} className="mt-3 mb-1 d-flex"><h5 className="mr-2" style={{ color: '#62646a' }}> Name: </h5> <span style={{ color: '#7a7d85' }}> {teacher.firstname} {teacher.lastname}</span> </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="mb-1 d-flex  "><h5 className="mr-2" style={{ color: '#62646a' }}>Member Since: </h5>  <span style={{ color: '#7a7d85' }}> {new Date(teacher?.create_at).toDateString()} </span></Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="mb-1 d-flex"><h5 className="mr-2" style={{ color: '#62646a' }}>Address:</h5> <span style={{ color: '#7a7d85' }}> {teacher.address}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col className="float-right">
                                                <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onHiredriverClick(teacher))} > Hire Teacher </Button>
                                            </Col>
                                        </Row>

                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                {/* <div className="mt-3">
                    <strong> Vechile Packages:</strong>
                </div>

                <Row>

                    {packages?.map((item: any, index: number) =>

                        <Col key={index} className="mt-3" sm="4">
                            <Card className="shadow-lg bg-white rounded">
                                <Card.Body role="button">
                                    <Row>
                                        
                                        <Col onClick={((event: any) => onOpenClick(item))} sm={6} md={3}>
                                            <DefaultImagePreview imagePath={item.vehicle?.vehicle_photo1} defaultImage={car} />
                                          
                                        </Col>

                                        <Col onClick={((event: any) => onOpenClick(item))} sm={2} md={9}>

                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="h5 text-primary ">BDT <span className="h3 ">{item?.price}</span></div>
                                                <span className="font-weight-bold text-danger "> &#9733; 4.5 Rating</span>
                                            </div>

                                            <span className="font-weight-bold text-uppercase">{item.from_location} to {item.to_location}</span>

                                            <span className="d-flex justify-content-between  text-capitalize mt-1">
                                                <span>From: {item.from_date}</span>
                                                <span>To: {item.to_date}</span>
                                            </span>

                                            <span className="d-flex justify-content-between text-capitalize mt-1">
                                                <span>Distance: {item.distance}</span>
                                                <span className="text-uppercase">Model-{item?.vehicle?.vehicle_model}</span>

                                            </span>
    
                                        </Col>
                                        <Col>
                                            <div className="d-flex  float-right">
                                               
                                                <Button type="button" variant="outline-primary" className="mt-2 shadow-none" style={{ position: 'relative', zIndex: 2 }}
                                                    size="sm" onClick={((event: any) => onOrderClick(item))}> <img style={{ height: "20px" }} src={message} />
                                                    Book Now </Button>
                                            </div>
                                        </Col>

                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    )}


                </Row> */}

            </div >
            <Footer />
        </>
    )
};