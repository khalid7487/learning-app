import React, {ReactElement, useState, useEffect} from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {create, getUser} from "./order.service";
import {ToastFailedMsg, ToastSuccessMsg} from "../../../common/toast";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function OrderCreatePage({handleClose}: any): ReactElement {

    const [formData, setFormData]: any = useState({
        domain: '',
        orginal_price: '',
        from_location: '',
        to_location: '',
        from_date: '',
        to_date: '',
        referral_by: '',
        promo_code:'',
        comments:'',
        sourceRef: '',
        sourceType: '',
        user:''
    })

    let [response, setResponse]: any = useState([]);

    useEffect(() => {
        (async () => {
            await loadData();
        })()

    }, [])
    const loadData = async () => {
        let res = await getUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

          
            // if (isMounted) setResponse(data)
            setResponse(data)
            console.log('id', data.id);
            setFormData({
                ...formData,
                user: data.id
            })
        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // onFormSubmit(formData)      // call parent method
        e.preventDefault();
        
        let data = new FormData();
        data.append('user', formData.user);

        let res = await create(formData)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Script Successfully saved")

            setFormData({})

        } else {
            //let error = await res.json()
            //console.log("error", error)
            ToastFailedMsg("Script Failed to saved")
        }
    }

    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Order Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}

                    <Form method="post" onSubmit={onFormSubmit}>

                        {/* <Form.Group as={Row}>
                            <Form.Label column sm="2"> Select Domain </Form.Label>
                            <Col sm="10">
                            </Col>
                        </Form.Group> */}

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Original Price </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="orginal_price" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.orginal_price ? formData.orginal_price : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> From Location </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="from_location" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.from_location ? formData.from_location : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> To Location </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="to_location" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.to_location ? formData.to_location : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> From Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="from_date" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.from_date ? formData.from_date : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> To Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="to_date" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.to_date ? formData.to_date : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Referral By </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="referral_by" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.referral_by ? formData.referral_by : ''}
                                                 onChange={onInputChange}/>
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
                                                 onChange={onInputChange}/>
                                </InputGroup>
                                <Button type="submit" className="float-right" size="sm"> Apply Promo </Button>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Comments </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="comments" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.comments ? formData.comments : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        {/* <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Contents</Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl as="textarea" rows={15} className="shadow-none" type="text"
                                             name="description"
                                             value={formData.description? formData.description : ''}
                                             aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                             onChange={onInputChange}/>
                            </InputGroup>
                        </Form.Group> */}

                        {/* <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}> Data Source </Form.Label>
                            <Col sm={10}>

                            </Col>
                        </Form.Group> */}

                        <div className="float-right">
                            <Button type="submit" className="float-right" size="sm"> Submit Order</Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        </div>


    )
};