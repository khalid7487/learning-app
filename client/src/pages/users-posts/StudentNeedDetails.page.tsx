import React, { RefAttributes, ReactElement, useState, useEffect } from "react";
import { Button, Card, Col, Row, Container, Form, InputGroup, FormControl, Image, Carousel } from 'react-bootstrap';

import { useParams, useHistory } from "react-router-dom";
import Footer from "../../common/Footer.page";
import { getuserPostsByUserId, getUserPostsWiseUserById } from "./UsersPosts.service";


export default function StudentNeedDetailsPage({ handleClose }: any): ReactElement {


    let { id }: any = useParams();
    let history = useHistory();


    let [teacherPosts, setTeacherPosts]: any = useState({});

    let [teacher, setTeacher]: any = useState({});
    let [packages, setPackage]: any = useState([]);
    let [video, setVideo]: any = useState()

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadStudentPostsDetails(id);
            // await loadVehicleDetails(id);
            await loadUserDetails(id);
            // await loadPackageDetails(userId);
        })();
    }, [id])

    const loadStudentPostsDetails = async (id: any) => {
        let res = await getuserPostsByUserId(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setTeacherPosts(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadUserDetails = async (id: any) => {

        let res = await getUserPostsWiseUserById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log("User", data)
            setTeacher(data)
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }

    const onOrderClick = async (item: any) => {
        history.push(`/order/${item.id}`)
    }

    const onHiredriverClick = async (item: any) => {
        history.push(`/hire-teachers/${item.id}`)
    }

    return (
        <>

            <div className="container-fluid">

                <Row>

                    <Col className="mt-3" lg="6" sm="12">
                        <Card style={{ height: '300px' }} className="shadow-lg bg-white rounded">
                            <Card.Body >
                                <Row>

                                    <Col sm={2} md={9} lg={12}>
                                        <Row className="d-flex justify-content-between">
                                            <Col className="h5 text-primary ">BDT <span className="h3 ">{teacherPosts.price_per_month}</span></Col>
                                        </Row>

                                        {/* <span className="font-weight-bold text-uppercase " >{teacherPosts.from_location} to {teacherPosts.to_location}</span> */}

                                        <Row className="d-flex justify-content-between  text-capitalize mt-1">
                                            <Col> <strong className="text-primary">Class:</strong> <span className="text-warning">{teacherPosts.preffered_class}</span></Col>
                                            <Col>
                                                <span className="text-capitalize"><strong className="text-info ">Subject: </strong> <span className="text-danger">{teacherPosts?.preffered_subject}</span></span>
                                            </Col>

                                        </Row>

                                        <Row className="d-flex justify-content-between  text-capitalize mt-1">
                                            <Col><strong className="text-info">Preffered Time:</strong> <span className="text-danger"> {teacherPosts.preffered_time} </span></Col>
                                            <Col><strong className="text-info">Preffered Version: </strong>  <span className="text-danger">{teacherPosts.preffered_version}</span></Col>
                                        </Row>
                                        <Row className="d-flex  justify-content-between text-capitalize mt-1">
                                            <Col>
                                                <strong className="text-info" >Tutor Type:</strong >
                                                {teacherPosts?.tutor_type === 0 && (<span className="text-danger"> Physical</span>)}
                                                {teacherPosts?.tutor_type === 1 && (<span className="text-danger"> Virtual</span>)}
                                            </Col>
                                            <Col>
                                                <span><strong className="text-primary">Number of days in week:</strong> <span className="text-danger">{teacherPosts?.number_of_days_in_week}</span> </span>
                                            </Col>
                                        </Row>


                                        <Row className="d-flex  justify-content-between text-capitalize mt-1">
                                            <Col> <strong className="text-info">Location:</strong> {teacherPosts.location}</Col>
                                        </Row>

                                        <Row className="d-flex  justify-content-between text-capitalize mt-1">
                                            <Col> <strong className="text-info">Description:</strong> {teacherPosts.description}</Col>
                                        </Row>



                                        <div className="d-flex justify-content-between mt-2">
                                            {/* <Button className="shadow-none" variant="outline-primary" type="button" size="sm"> Messenger </Button> */}
                                            <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onOrderClick(teacherPosts))} > Enrol Now </Button>
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
                                            <Col xs={12} className="mt-3 mb-1 d-flex"><h5 className="mr-2 " style={{ color: '#62646a' }}> Name: </h5> <span className="text-capitalize" style={{ color: '#7a7d85' }}> {teacher.firstname} {teacher.lastname}</span> </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="mb-1 d-flex  "><h5 className="mr-2" style={{ color: '#62646a' }}>Member Since: </h5>  <span style={{ color: '#7a7d85' }}> {new Date(teacher?.create_at).toDateString()} </span></Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} className="mb-1 d-flex"><h5 className="mr-2" style={{ color: '#62646a' }}>Address:</h5> <span style={{ color: '#7a7d85' }}> {teacher.address}</span></Col>
                                        </Row>
                                        <Row>
                                            <Col className="float-right">
                                                <Button type="button" className="shadow-none" size="sm" onClick={((event: any) => onHiredriverClick(teacher))} > Contact </Button>
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