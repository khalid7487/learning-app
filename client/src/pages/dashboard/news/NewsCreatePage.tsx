import React, { RefAttributes, ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, Image } from "react-bootstrap";
import { create } from "./news.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";

import pp from "../../../icons/profile-img.png";
// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function NewsCreatePage({ handleClose }: any): ReactElement {

    const [formData, setFormData]: any = useState({
        domain: '',
        title: '',
        description: '',
        video_url: '',
        promo_code: '',
        promo_expire_date: '',
        promo_discount_percentage: '',
        to_date: '',
        referral_by: '',
        comments: '',
        sourceRef: '',
        sourceType: '',
    })

    const onInputFileChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })
    }

    const previewImage = (file: RefAttributes<HTMLImageElement>) => {
        if (file) return URL.createObjectURL(file)
        return pp;
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onUploadAction = async (e: any) => {
        // onFormSubmit(formData)      // call parent method

        let data = new FormData();

        let date = new Date(formData.promo_expire_date).getTime();
        
        data.append('title', formData.title)
        data.append('description', formData.description)
        data.append('image_url', formData.image_url)
        data.append('video_url', formData.video_url)
        data.append('promo_code', formData.promo_code)
        data.append('promo_expire_date', date.toString())
        data.append('promo_discount_percentage', formData.promo_discount_percentage)

        console.log(data)

        let res = await create(data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("News Successfully saved")

            setFormData({})

        } else {
            //let error = await res.json()
            //console.log("error", error)
            ToastFailedMsg("News Failed to saved")
        }
    }

    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>News Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}

                    <Form >

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Title </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="title" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.title ? formData.title : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Description </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.description ? formData.description : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col xs={4} >
                                <Image style={{ height: '100px', width: '150px' }} src={previewImage(formData.image_url)} rounded />
                                <input className="mt-3" type="file" name="image_url" id="input" accept="image/*" onChange={onInputFileChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Video Url </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="video_url" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.video_url ? formData.video_url : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Promo Code </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="promo_code" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.promo_code ? formData.promo_code : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Promo Expire Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="date" name="promo_expire_date" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.promo_expire_date ? formData.promo_expire_date : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Promo discount Percentage</Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="number" name="promo_discount_percentage" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.promo_discount_percentage ? formData.promo_discount_percentage : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <div className="float-right">
                            <Button type="button" className="shadow-none" size="sm" onClick={onUploadAction}> Save </Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                
                </Card.Body>
            </Card>
        </div >


    )
};