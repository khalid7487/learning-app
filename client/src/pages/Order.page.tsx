import React, { ReactElement, useState, useEffect } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { AddOrders, AddPromo, getDecodeToken, getTeacherById, getCourseById, enrolCourse } from "./DefaultHome.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../common/toast";
import { useParams, useHistory } from "react-router-dom";
import TopNav from "../common/TopNav.page";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import { getLoggedUserId, getLoggedUserRoles, isLoggedIn } from "../common/http";


export default function OrderCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();

    let history = useHistory();

    const [formData, setFormData]: any = useState({
        domain: '',
        orginal_price: '',
        from_location: '',
        to_location: '',
        from_date: '',
        to_date: '',
        referral_by: '',
        promo_code: '',
        comments: '',
        sourceRef: '',
        sourceType: '',
        user: ''
    })

    let [user, setUser]: any = useState({});
    let [course, setCourse]: any = useState({});
    let [vehicle, setVehicle]: any = useState({});

    useEffect(() => {
        (async () => {
            if (isLoggedIn()) {
                await loadData();
                await loadCourseDetails(id);
                // await loadVehicleDetails(id);
            } else {
                history.push('/login')
            }


        })()

    }, [id])

    const loadData = () => {
        let res = getDecodeToken()
        console.log(res)
        setUser(res)
    }

    const loadCourseDetails = async (id: any) => {

        let res = await getCourseById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // console.log("Trip", data)
            setCourse(data)
            // console.log(data.id)
        } else {
            //let error = await res.json()
        }
    }

    // const loadVehicleDetails = async (id: any) => {

    //     let res = await getVehicleById(id)
    //     if (res.status === 200 || res.status === 201) {
    //         let data = await res.json()
    //         console.log("vehicle", data)
    //         setVehicle(data)
    //         // console.log(data.id)
    //     } else {
    //         //let error = await res.json()
    //     }
    // }


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...vehicle,
            [e.target.name]: e.target.value
        })
    }

    const onInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();


        let res = await getTeacherById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // console.log("User", data)
            console.log("teacher-> ", data.id)
            let enrol = {
                'teacher_id': data.id,
                'user_id': getLoggedUserId(),
                'comments': formData.comments,
                'courses': id
            }
            // console.log(enrol)
            // setTeacherId(enrol)
            const res1 = await enrolCourse(enrol)
            if (res1.ok) {
                const result = await res1.json()
                ToastSuccessMsg("Enrol Successfully saved")
            } else if (res1.status === 400) {
                ToastFailedMsg("Enrol is already pending. Check Your Dashborad")
            } else {
                ToastFailedMsg("Enrol Failed to saved")
            }

        } else {
            ToastFailedMsg("Enrol Failed to saved")
        }

        // let data = {
        //     user_id: user.id,
        //     trip_id: id,
        //     vehicle_id: vehicle.id,
        //     comments: formData.comments,
        //     promo_code: formData.promo_code,
        //     // driver_id: 2,
        //     // approve_by: 2,
        //     // referral_by: 2

        // }


        // if (getLoggedUserRoles()?.includes('TO_RENT')) {
        //     let res = await AddOrders(data)
        //     if (res.status === 200 || res.status === 201) {
        //         let data = await res.json()
        //         console.log('msg', data);
        //         ToastSuccessMsg("Order Successfully saved")
        //         setFormData({})

        //     } else if (res.status === 400) {
        //         ToastFailedMsg("Order is already pending. Check Your Dashborad")
        //     } else {

        //         ToastFailedMsg("Order Failed to saved.")
        //     }
        // }else{
        //     ToastFailedMsg("Order Not available.")
        // }


    }







    return (
        <>
            <TopNav />
            <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">

                <Card>

                    {/* <Card.Header>
                        <Row>
                            <Col>Order Panel</Col>
                        </Row>
                    </Card.Header> */}

                    <Card.Title className="mt-3 pl-2 pr-2">Enroll Panel</Card.Title>

                    <Card.Text className="pl-2 pr-2" >You have to login before Enrolls and you may leve your commnet</Card.Text >

                    <Card.Body>

                        <Form method="post" onSubmit={onFormSubmit}>

                            <Form.Label>Price </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="price"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={course.price ? course.price : ''}
                                    onChange={onInputChange} />
                            </InputGroup>

                            <Form.Label> Name </Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="name"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={course.name ? course.name : ''}
                                    onChange={onInputChange} />
                            </InputGroup>



                            <Form.Label> Course Start Date </Form.Label>

                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="start_date"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={course.start_date ? course.start_date : ''}
                                    onChange={onInputChange} />
                            </InputGroup>

                            <Form.Label> Course End Date </Form.Label>

                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" readOnly name="end_date"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    defaultValue={course.end_date ? course.end_date : ''}
                                    onChange={onInputChange} />
                            </InputGroup>

                            {/* <div>
                                <Form.Label> Promo Code </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="promo_code"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.promo_code ? formData.promo_code : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                               
                                <Button className="float-right mb-3 shadow-none" variant="outline-primary" type="button" onClick={onUploadAction} size="sm"> Apply Promo </Button>
                            </div> */}
                            <div >
                                <Form.Label > Message </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="textarea" className="shadow-none" type="text" name="comments" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.comments ? formData.comments : ''}
                                        onChange={onInputChange1} />
                                </InputGroup>
                            </div>

                            <div className="float-right">
                                <Button type="submit" className="float-right shadow-none" size="sm"> Submit Order</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
            <BottomNav />
        </>
    )
};