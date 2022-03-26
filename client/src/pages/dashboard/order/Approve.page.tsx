import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Container, Form, InputGroup, FormControl, Image } from 'react-bootstrap';
// import { gets } from "./DefaultHome.service";

// import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../common/toast";
import { useHistory } from "react-router-dom";

import pp from "../icons/profile-img.png";

interface Props {

}

export default function DefaultHome({ }: Props): ReactElement {

    let history = useHistory();

    let [response, setResponse]: any = useState([]);

    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData();
        })()

        // return () => {
        //     isMounted = false
        // };



    }, [])

    const loadData = async () => {
        let data = new FormData();
        // console.log(news.promo_expire_date)
        // let milisecond =news.promo_expire_date 
        // let date1 = new Date(milisecond).getTime();

        // console.log(date1)
        // data.append('promo_expire_date',date1.toString())

        // data.append('title', news.title)
        // data.append('description', news.description)
        // data.append('image_url', formData.image_url);
        // data.append('video_url', news.video_url)
        // data.append('promo_code', news.promo_code)

        // data.append('promo_discount_percentage', news.promo_discount_percentage)

        // console.log(data)


        // let res = await gets(data)
        // if (res.status === 200 || res.status === 201) {
        //     let data = await res.json()

        //     // //console.log('msg', data);
        //     // if (isMounted) setResponse(data)
        //     setResponse(data.data)
        //     // const date = new Date(data.promo_expire_date);
        //     console.log(data.data);

        // } else {
        //     //let error = await res.json()
        // }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/details/${item.id}`)
    }

    return (

        <div className="mt-5" >
            <Form >
                <Row>
                    <Col lg={6}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Approve Order </Form.Label>
                            <Col lg="6">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="title" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    // value={formData.title ? formData.title : ''}
                                    // onChange={onInputChange} 
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Description </Form.Label>
                            <Col lg="6">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    // value={formData.description ? formData.description : ''}
                                    // onChange={onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Description </Form.Label>
                            <Col sm="6">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    // value={formData.description ? formData.description : ''}
                                    // onChange={onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Description </Form.Label>
                            <Col sm="6">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="description" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                    // value={formData.description ? formData.description : ''}
                                    // onChange={onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Button type="submit" className="float-right m-1" size="sm"
                        > Submit </Button>
                    </Col>
                </Row>
            </Form>



        </div >
    )
};
