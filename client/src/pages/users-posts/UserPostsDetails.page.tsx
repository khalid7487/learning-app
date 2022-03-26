import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
// @ts-ignore
import { getuserPostsByUserId, getVehicleByUserId, updateUserPosts } from "./UsersPosts.service";

import { ToastFailedMsg, ToastSuccessMsg } from "../../common/toast";



export default function UserPostsDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let history = useHistory();
    let [userPost, setUserPost]: any = useState({});

    let [tutorType, setTutorType]: any = useState([
        { name: 'Physical ', value: 0 }, { name: 'Virtual', value: 1 }
    ]);
    let prefferedVersion = ["Bangla", "English"]

    useEffect(() => {

        (async () => {
            await loadUserPostsDetails(id);
        })();


    }, [id])

    const loadUserPostsDetails = async (id: any) => {

        let res = await getuserPostsByUserId(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setUserPost(data)

        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({
            ...userPost,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {
        let data = new FormData();

        data.append('tutor_type', userPost.tutor_type)
        data.append('preffered_version', userPost.preffered_version)
        data.append('price_per_month', userPost.price_per_month)
        data.append('number_of_days_in_week', userPost.number_of_days_in_week)
        data.append('preffered_class', userPost.preffered_class)
        data.append('preffered_subject', userPost.preffered_subject)
        data.append('preffered_time', userPost.preffered_time)
        data.append('location', userPost.location)
        data.append('description', userPost.description)
        // console.log(data)

        const res = await updateUserPosts(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', result);
            ToastSuccessMsg("Update Successfully")
            history.push('/me/user-posts')
        } else if (res.status === 401) {
            console.log("failed")
        } else {
            console.log("Error submitting form!");
            ToastFailedMsg("Update falied")
        }

    }


    return (

        <div className="mt-1 d-flex justify-content-center align-items-center container-fluid">

            {userPost &&
                <Card style={{ width: '30rem' }}>
                    <Card.Header>
                        <Row>
                            <Col>Edit User Post</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                                <div className="float-right">
                                    {/*Source: {vehicle.sourceType} | Domain: {vehicle.domain}*/}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body >

                        <Form>

                            <Row>
                                <Col sm={12} lg={6}>
                                    <Form.Label >Tutor Type* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="select" className="shadow-none" type="text" name="tutor_type" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={onInputChange}>
                                            <option>
                                                {userPost.tutor_type == 0 && 'Physical'}
                                                {userPost.tutor_type == 1 && 'Virtual'}
                                            </option>
                                            {tutorType.map((tutor_type: any, index: number) =>
                                                <option value={tutor_type.value} key={index}>{tutor_type.name}</option>
                                            )}
                                        </FormControl>
                                    </InputGroup>

                                    <Form.Group >
                                        <Form.Label >Price Per Month* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="number" name="price_per_month" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.price_per_month ? userPost.price_per_month : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>


                                    <Form.Group >
                                        <Form.Label >Preffered Time* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="preffered_time" aria-label="Small"

                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.preffered_time ? userPost.preffered_time : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Preffered Subject* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl as="textarea" className="shadow-none" type="text" name="preffered_subject" aria-label="Small"

                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.preffered_subject ? userPost.preffered_subject : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                </Col>
                                <Col sm={12} lg={6}>
                                    <Form.Label >Preffered Version* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="select" className="shadow-none" type="text" name="preffered_version" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={onInputChange}>
                                            <option>
                                                {userPost.preffered_version == "Bangla" && "Bangla"}
                                                {userPost.preffered_version == "English" && "English"}
                                            </option>
                                            {prefferedVersion.map((preffered_version: any, index: number) =>
                                                <option value={preffered_version} key={index}>{preffered_version}</option>
                                            )}
                                        </FormControl>
                                    </InputGroup>

                                    <Form.Group >
                                        <Form.Label >Number of Days/Week* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="number" name="number_of_days_in_week" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.number_of_days_in_week ? userPost.number_of_days_in_week : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Preffered Class* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="preffered_class" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.preffered_class ? userPost.preffered_class : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>


                                    <Form.Group >
                                        <Form.Label >Location</Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl as="textarea" className="shadow-none" type="text" name="location" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={userPost.location ? userPost.location : ''}
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
                                        defaultValue={userPost.description ? userPost.description : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Form.Group>
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