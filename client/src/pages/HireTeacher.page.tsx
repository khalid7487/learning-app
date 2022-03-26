import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BottomNav from "../common/BottomNav.page";
import { ToastFailedMsg, ToastSuccessMsg } from "../common/toast";
import TopNav from "../common/TopNav.page";
import { getUserById, getUserSchduleById, updateUser } from "../auth/auth.service";
import background from '../icons/teacher.jpg';
import teacher from '../icons/oxford.jpg';

import Footer from "../common/Footer.page";
import { scheduleEnrol } from "./DefaultHome.service";
import { getLoggedUserId } from "../common/http";

export default function HireDriver({ }: any): ReactElement {

    let { id }: any = useParams();
    let [user, setUser]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadUserDetails(id);
        })();
    }, [id])

    const loadUserDetails = async (id: any) => {
        let res = await getUserSchduleById(id)
        if (res.status === 200 || res.status === 201) {
            let [data] = await res.json()
            setUser(data)
            console.log("teacher", data)
        } else {
            //let error = await res.json()
        }
    }

    const onEnrolClick = async (item: any) => {

        let data = {
            'teacher_id': id,
            'user_id': getLoggedUserId(),
            'schedules': item.id
        }
        console.log(data)
        const res = await scheduleEnrol(data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Enrol Successfully saved")
        } else if (res.status === 401) {
            // alert("failed")
        } else {
            // alert("Error submitting form!");
            ToastFailedMsg("Enrol Failed to saved")
        }

    }


    return (
        <>
            <TopNav />
            <div>
                {/* <Row style={{ marginRight: "0px" }}>
                    <img className="background-img" src={background} alt="alt" />
                    <div className="top-left text-light ">
                        <h2>Reach your destination</h2>
                        <h2>In just a few taps!</h2>
                    </div>
                </Row> */}
                <div className="container-fluid ">

                    {user &&
                        <div className="shadow-lg p-3 mb-3 bg-white rounded" style={{ marginTop: '-100px' }}>

                            {/* <Card className="mx-2 mb-3"> */}
                            <Card.Img src={teacher} style={{ width: "100%", height: '250px' }} />
                            <Col
                                className="d-flex justify-content-center "
                                style={{ marginTop: "-70px" }}>
                                <Image className="bg-transparent" style={{ width: "150px", height: '150px' }} roundedCircle
                                    src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + user?.profile_image}
                                />
                                {/* <DefaultImagePreview imagePath={user?.profile_image} defaultImage={defaultImage} /> */}
                            </Col>

                            {/* </Card> */}
                            <p>Full Name: {user.firstname} {user.lastname}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Address: {user.address}</p>
                            <p>BIO: {user.bio}</p>
                            <p>Birthday: {user.dateOfbirth}</p>
                            <p>Rating: {user.rating} </p>
                            <p>Registration Date: {new Date(user?.create_at).toDateString()} </p>
                            <Row>
                                {user?.schedules?.map((item: any, index: number) =>
                                    <Col key={index} className="mt-3 " sm="4">
                                        <Card className="shadow-lg bg-white  rounded" role="button">
                                            <Card.Body>

                                                <Row>Start Date Time: {new Date(item.start).toLocaleString()}</Row>
                                                <Row>End Date Time:  {new Date(item.end).toLocaleString()}</Row>

                                                <div className="float-right">
                                                    <Button type="button" onClick={((event: any) => onEnrolClick(item))} className="float-right shadow-none" size="sm"> Enrol </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                            {/* <div >
                                <Form.Label > <strong>Message: </strong></Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="textarea" className="shadow-none" type="text" name="comments" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.comments ? formData.comments : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button type="submit" className="float-right shadow-none" size="sm"> Hire Driver</Button>
                            </div> */}

                        </div>

                    }
                </div>
            </div>
            <Footer />
            <BottomNav />
        </>

    )
};