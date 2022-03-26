import React, { ReactElement, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, } from "react-bootstrap";
import { ToastFailedMsg, ToastSuccessMsg } from "../../common/toast";
import { getLoggedUserId } from "../../common/http";
import { addUsersPost } from "./UsersPosts.service";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function UserPostsCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();
    let history = useHistory();

    const [formData, setFormData]: any = useState({
        tutor_type:'',
        preffered_version:'',
        price_per_month:'',
        number_of_days_in_week:'',
        preffered_class:'',
        preffered_subject:'',
        preffered_time:'',
        location:'',
        description:'',
        user: getLoggedUserId()
    })

    let [tutorType, setTutorType]: any = useState([
        { name: 'Physical ', value: 0 }, { name: 'Virtual', value: 1 }
    ]);

    let prefferedVersion = ["Bangla", "English"]

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // onFormSubmit(formData)      // call parent method
        e.preventDefault();

        let res = await addUsersPost(formData)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Post Successfully saved")
            history.push('/me/user-posts')
            setFormData({})

        } else {
            ToastFailedMsg("Post Failed to saved")
        }
    }

    return (

        <div className="mt-4 d-flex justify-content-center container-fluid">

            <Card >
                <Card.Header>
                    <Row>
                        <Col>Teacher Post Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body style={{ width: '35rem' }}>

                    <Form method="post" onSubmit={onFormSubmit}>

                        <Row>
                            <Col lg={6}>

                                <Form.Label > Tutor Type* </Form.Label>
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
                                    <Form.Label >Price Per Month* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="price_per_month" aria-label="Small"
                                            placeholder="Please Enter Price Per Month"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.price_per_month ? formData.price_per_month : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label >Preffered Time* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="preffered_time" aria-label="Small"
                                            placeholder="Please Enter Preffered Time"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.preffered_time ? formData.preffered_time : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label >Preffered Subject* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="textarea" className="shadow-none" type="text" name="preffered_subject" aria-label="Small"
                                            placeholder="Please Enter Preffered Subject"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.preffered_subject ? formData.preffered_subject : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>


                            </Col>


                            <Col lg={6}>

                                <Form.Label >Preffered Version* </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="preffered_version" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Preffered Version</option>
                                        {prefferedVersion.map((preffered_version: any, index: number) =>
                                            <option value={preffered_version} key={index}>{preffered_version}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                <Form.Group >
                                    <Form.Label >Number of Days/Week* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="number_of_days_in_week" aria-label="Small"
                                            placeholder="Number of Days in Week"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.number_of_days_in_week ? formData.number_of_days_in_week : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label >Preffered Class* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="preffered_class" aria-label="Small"
                                            placeholder="Please Enter Preffered Class"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.preffered_class ? formData.preffered_class : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Form.Group>


                                <Form.Group >
                                    <Form.Label >Location* </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="textarea" className="shadow-none" type="text" name="location" aria-label="Small"
                                            placeholder="Please Enter Preffered Area to Teach"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={formData.location ? formData.location : ''}
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
                            <Button type="submit" className="float-right" size="sm"> Submit </Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        </div >


    )
};