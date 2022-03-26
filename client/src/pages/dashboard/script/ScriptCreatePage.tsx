import React, {ReactElement, useState} from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {create} from "./script.service";
import {ToastFailedMsg, ToastSuccessMsg} from "../../../common/toast";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function ScriptCreatePage({handleClose}: any): ReactElement {

    const [formData, setFormData]: any = useState({
        domain: '',
        name: '',
        description: '',
        sourceRef: '',
        sourceType: '',
    })

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
                        <Col>Script Panel</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}

                    <Form method="post" onSubmit={onFormSubmit}>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Select Domain </Form.Label>
                            <Col sm="10">
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Script Title </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.name ? formData.name : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Script Source Reference </Form.Label>
                            <Col sm="10">
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl className="shadow-none" type="text" name="sourceRef" aria-label="Small"
                                                 aria-describedby="inputGroup-sizing-sm"
                                                 value={formData.sourceRef ? formData.sourceRef : ''}
                                                 onChange={onInputChange}/>
                                </InputGroup>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlInput2">
                            <Form.Label>Contents</Form.Label>
                            <InputGroup size="sm" className="mb-3">
                                <FormControl as="textarea" rows={15} className="shadow-none" type="text"
                                             name="description"
                                             value={formData.description? formData.description : ''}
                                             aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                             onChange={onInputChange}/>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}> Data Source </Form.Label>
                            <Col sm={10}>

                            </Col>
                        </Form.Group>

                        <div className="float-right">
                            <Button type="submit" className="float-right" size="sm"> Submit </Button>
                            {/*<Button onClick={event => setFormData({})} className="" size="sm"> Rest </Button> {' | '}*/}
                        </div>


                    </Form>
                </Card.Body>
            </Card>
        </div>


    )
};