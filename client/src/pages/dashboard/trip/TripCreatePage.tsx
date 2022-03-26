import React, { ReactElement, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, } from "react-bootstrap";
import { create } from "./Trip.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function TripCreatePage({ handleClose }: any): ReactElement {

    const [formData, setFormData]: any = useState({
        domain: '',
        ac_type: '',
        trip_type: '',
        from_location: '',
        to_location: '',
        price: '',
        from_date: '',
        to_date: '',
        referral_by: '',
        promo_code: '',
        comments: '',
        sourceRef: '',
        sourceType: '',
    })
    let [sit, setSit]: any = useState(5);

    let acType = ['AC', 'Non AC']
    let tripType = ["One Way", "Two Way", "Round Way"]

    const printNumbers0To5 = () => {
        const row = [];
        for (var i = 0; i < sit; i++) {
            // row.push(<p key={i}>{i}</p>);
             row.push(
                <div  key={i} className="p-2" style={{
                    padding: '1rem',
                    backgroundColor: '#33b5e5',
                    border: '2px solid #fff',
                    color: '#fff',
                    textAlign: 'center'
                }}>{i + 1}</div>
             );
        }
        return row;
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // onFormSubmit(formData)      // call parent method
        e.preventDefault();

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
                        <Col>Trip Panel</Col>
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

                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="select" className="shadow-none" type="text" name="ac_type" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={onInputChange}>
                                <option>Select AC Type</option>
                                {acType.map((ac_type: any, index: number) =>
                                    <option value={ac_type} key={index}>{ac_type}</option>
                                )}
                            </FormControl>
                        </InputGroup>

                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="select" className="shadow-none" type="text" name="trip_type" aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={onInputChange}>
                                <option>Select Trip Type</option>
                                {tripType.map((trip_type: any, index: number) =>
                                    <option value={trip_type} key={index}>{trip_type}</option>
                                )}
                            </FormControl>
                        </InputGroup>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> From Location </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="from_location" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.from_location ? formData.from_location : ''}
                                        onChange={onInputChange} />
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
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> From Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="date" name="from_date" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.from_date ? formData.from_date : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> To Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="date" name="to_date" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.to_date ? formData.to_date : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Price </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="number" name="price" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.price ? formData.price : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Distance </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="number" name="distance" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.distance ? formData.distance : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <div className="d-flex flex-row">

                            {/* for(var i = 0; i < {5}; i++) {

                                <div className="p-2" style={{
                                    padding: '1rem',
                                    backgroundColor: '#33b5e5',
                                    border: '2px solid #fff',
                                    color: '#fff',
                                    textAlign: 'center'
                                }}>Flex item 1</div>

                            }  */}
                            {
                                printNumbers0To5()
                            }


                        </div>

                        <div className="float-right">
                            <Button type="submit" className="float-right" size="sm"> Submit Trip</Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            
            </Card>
        </div >


    )
};