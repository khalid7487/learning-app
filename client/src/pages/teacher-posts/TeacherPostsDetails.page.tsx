import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import { getTeacherPostsByUserId, getVehicleByUserId, updateTeacherPosts } from "./TeacherPosts.service";

import { ToastFailedMsg, ToastSuccessMsg } from "../../common/toast";



export default function TeacherPostsDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [teacherPost, setTeacherPost]: any = useState({});

    let [tutorType, setTutorType]: any = useState([
        { name: 'Physical ', value: 0 }, { name: 'Virtual', value: 1 }
    ]);
    let prefferedVersion = ["Bangla", "English"]

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadTeacherPostsDetails(id);
        })();


    }, [id])

    const loadTeacherPostsDetails = async (id: any) => {

        let res = await getTeacherPostsByUserId(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setTeacherPost(data)

        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherPost({
            ...teacherPost,
            [e.target.name]: e.target.value
        })
    }


  


    const onUploadAction = async (e: any) => {
        let data = new FormData();

        data.append('tutor_type', teacherPost.tutor_type)
        data.append('preffered_version', teacherPost.preffered_version)
        data.append('price_per_month', teacherPost.price_per_month)
        data.append('number_of_days_in_week', teacherPost.number_of_days_in_week)
        data.append('designation', teacherPost.designation)
        data.append('qualification', teacherPost.qualification)
        data.append('preffered_class', teacherPost.preffered_class)
        data.append('preffered_subject', teacherPost.preffered_subject)
        data.append('preffered_time', teacherPost.preffered_time)
        data.append('area_covered', teacherPost.area_covered)
        data.append('description', teacherPost.description)
        // console.log(data)

        const res = await updateTeacherPosts(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', result);
            ToastSuccessMsg("Update Successfully")
        } else if (res.status === 401) {
            console.log("failed")
        } else {
            console.log("Error submitting form!");
            ToastFailedMsg("Update falied")
        }

    }


    return (

        <div className="mt-1 d-flex justify-content-center align-items-center container-fluid">

            {teacherPost &&
                <Card style={{ width: '30rem' }}>
                    <Card.Header>
                        <Row>
                            <Col>Edit Teacher Post</Col>
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
                                                {teacherPost.tutor_type == 0 && 'Physical'}
                                                {teacherPost.tutor_type == 1 && 'Virtual'}
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
                                                defaultValue={teacherPost.price_per_month ? teacherPost.price_per_month : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Designation* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="designation" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.designation ? teacherPost.designation : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Preffered Time* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="preffered_time" aria-label="Small"
                                              
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.preffered_time ? teacherPost.preffered_time : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Preffered Subject* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl as="textarea" className="shadow-none" type="text" name="preffered_subject" aria-label="Small"
                                               
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.preffered_subject ? teacherPost.preffered_subject : ''}
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
                                                {teacherPost.preffered_version == "Bangla" && "Bangla"}
                                                {teacherPost.preffered_version == "English" && "English"}
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
                                                defaultValue={teacherPost.number_of_days_in_week ? teacherPost.number_of_days_in_week : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label >Qualification*</Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="qualification" aria-label="Small"
                                               
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.qualification ? teacherPost.qualification : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>



                                    <Form.Group >
                                        <Form.Label >Preffered Class* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="preffered_class" aria-label="Small"
                                             
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.preffered_class ? teacherPost.preffered_class : ''}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>


                                    <Form.Group >
                                        <Form.Label >Preffered Area to Teach* </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl as="textarea" className="shadow-none" type="text" name="area_covered" aria-label="Small"
                                                
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={teacherPost.area_covered ? teacherPost.area_covered : ''}
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
                                        defaultValue={teacherPost.description ? teacherPost.description : ''}
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