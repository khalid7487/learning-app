import React, { ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, FormControl, InputGroup, Row, } from "react-bootstrap";
import { getVehicleById } from "./vehicle.service";
import { create } from "../trip/Trip.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../../../common/toast";
import moment from "moment";



// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function TripCreatePage({ handleClose }: any): ReactElement {

    let { id }: any = useParams();
    let [vehicleSits, setVehicleSits]: any = useState({});
    let [sit, setSit]: any = useState();

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadVehicleDetails(id);
        })();


    }, [id])

    const loadVehicleDetails = async (id: any) => {

        let res = await getVehicleById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setVehicleSits(data)
            // console.log(data.vehicle_sits)
            setSit(parseInt(data.vehicle_sits))
        } else {
            //let error = await res.json()
        }
    }


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
        details: ''
    })


    let acType = ['AC', 'Non AC']
    let tripType = ["One Way", "Two Way", "Round Way", "Full Body"]

    const printNumbers0To5 = () => {
        const row = [];
        console.log(sit)
        for (var i = 0; i < sit; i++) {
            // row.push(<p key={i}>{i}</p>);
            row.push(
                <div key={i} className="p-2" style={{
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

        let data = new FormData();



        let ac_status:any = 0 ;
        
        if(formData.ac_type === "AC"){
            ac_status = 1
        }else if(formData.ac_type === "Non AC"){
            ac_status = 2
        }
        
        let distance1: any = parseInt(formData.distance)

        data.append('ac_status', ac_status)
        data.append('trip_type', formData.trip_type)
        data.append('from_location', formData.from_location)
        data.append('to_location', formData.to_location)
        data.append('from_date', formData.from_date)
        data.append('to_date', formData.to_date)
        data.append('price', formData.price)
         data.append('distance', distance1)
         data.append('details', formData.details)
        data.append('vehicle', id)

        let res = await create(data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Trip Successfully saved")

            setFormData({})

        } else {
            //let error = await res.json()
            //console.log("error", error)
            ToastFailedMsg("Trip Failed to saved")
        }
    }

    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Trip Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>

                    <Form method="post" onSubmit={onFormSubmit}>
                      
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
                                    <FormControl className="shadow-none" name="from_date" required type="date"  onChange={onInputChange}
                                    //    defaultValue={moment().format("YYYY-MM-DD")}
                                       />
                                </InputGroup>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> To Date </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" name="to_date" aria-label="Small"
                                       required type="date"  onChange={onInputChange}
                                    //    defaultValue={moment().format("YYYY-MM-DD")}
                                    />
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
                        
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Details </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl  as="textarea" className="shadow-none" type="text" name="details" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={formData.details ? formData.details : ''}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Row  >
                            {
                                printNumbers0To5()
                            }


                        </Row >

                        <div className="float-right mt-2">
                            <Button type="submit" className="float-right" size="sm"> Submit Order</Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        </div >


    )
};