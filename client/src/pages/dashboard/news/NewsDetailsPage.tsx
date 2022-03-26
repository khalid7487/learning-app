import React, { RefAttributes, ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { getnewsById, updateNews } from "./news.service";
import { useParams } from "react-router-dom";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";

import defaultImage from '../../../icons/car.png';

export default function NewsDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();

    let [news, setNews]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadScriptDetails(id);
        })();

    }, [id])

    const loadScriptDetails = async (id: any) => {
        let res = await getnewsById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log(data)
            setNews(data)
            let temp = data.promo_expire_date
            console.log(parseInt(temp))
            let date = new Date(parseInt(temp)).toLocaleString()
            console.log(date)
            setDate(date)
        } else {
            //let error = await res.json()
        }
    }

    const [formData, setFormData]: any = useState(news)
    const [date, setDate]: any = useState()

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNews({
            ...news,
            [e.target.name]: e.target.value
        })
    }

    const onInputFileChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })
    }

    const previewImage = (file: RefAttributes<HTMLImageElement>) => {
        if (file) return URL.createObjectURL(file)
        return defaultImage;
    }


    const onUploadAction = async (e: any) => {

        let data = new FormData();
        console.log(news.promo_expire_date)
        let milisecond =news.promo_expire_date 
        let date1 = new Date(milisecond).getTime();

        console.log(date1)
        data.append('promo_expire_date',date1.toString())

        data.append('title', news.title)
        data.append('description', news.description)
        data.append('image_url', formData.image_url);
        data.append('video_url', news.video_url)
        data.append('promo_code', news.promo_code)

        data.append('promo_discount_percentage', news.promo_discount_percentage)

        console.log(data)

        const res = await updateNews(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', result);
            ToastSuccessMsg("News Update Successfully")
        } else if (res.status === 401) {
            console.log("failed")
        } else {
            console.log("Error submitting form!");
        }

    }

    return (

        <div className="mt-4 container-fluid">

            {news &&
                <Card>
                    <Card.Header>
                        <Row>
                            {/* { date } */}
                            <Col> News Title: {news.title} - NewsId: {news.id}</Col>
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                                <div className="float-right">
                                    Source: {news.sourceType} | Domain: {news.domain}
                                </div>
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>

                        <Form>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Title </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="title"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={news.title ? news.title : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Description </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="description"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={news.description ? news.description : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col xs={4} >
                                    <Image style={{ height: '100px', width: '150px' }}
                                        src={previewImage(formData.image_url)} rounded />
                                    <input className="mt-3" type="file" name="image_url" id="input"
                                        accept="image/*" onChange={onInputFileChange} />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Video Url </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="video_url"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={news.video_url ? news.video_url : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Promo Code </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="promo_code"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={news.promo_code ? news.promo_code : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row}>
                                <Form.Label column sm="2"> Promo Expire Date </Form.Label>
                                <Col sm="10">
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="promo_expire_date"
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={  news.promo_expire_date ? date : ''}
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
                                            value={news.promo_discount_percentage ? news.promo_discount_percentage : ''}
                                            onChange={onInputChange} />
                                    </InputGroup>
                                </Col>
                            </Form.Group>


                            <div className="float-right">
                                <Button type="button" size="sm" onClick={onUploadAction}> Update </Button>
                            </div>
                        </Form>

                    </Card.Body>

                    <Card.Footer>
                        {news.sourceRef}
                    </Card.Footer>
                </Card>
            }
        </div>


    )
};