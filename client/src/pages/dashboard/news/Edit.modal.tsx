import React, {ReactElement, useState} from "react";
import {Button, Col, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }


export default function EditModal({onFormSubmit, selectedItem, show, handleClose}: any): ReactElement {

    const [formData, setFormData] = useState(selectedItem)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...selectedItem,
            [e.target.name]: e.target.value
        })
    }

    let dataSource = ['MONO', 'DI', 'MULTI',
        'READ', 'LECTURE', 'NOISY', 'COMMAND'
    ]

    const onFormSubmitClose = async () => {
        handleClose();
    }

    const onFormSubmitLocal = async (e: React.FormEvent<HTMLFormElement>) => {
        onFormSubmit(formData)      // call parent method
        e.preventDefault()
    }

    return (

        <Modal size="lg" show={show} onHide={onFormSubmitClose}>
            <Form method="post" onSubmit={onFormSubmitLocal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Panel</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                         defaultValue={selectedItem.name} aria-describedby="inputGroup-sizing-sm"
                                         onChange={onInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Content</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="textarea" rows={5} className="shadow-none" type="text" name="description"
                                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                         defaultValue={selectedItem.description} onChange={onInputChange}/>
                        </InputGroup>
                    </Form.Group>


                    {/*<Button type="submit" className="float-right" size="sm"> Submit </Button>*/}


                    <Form.Group as={Row}>
                        <Form.Label column sm="2"> Script Source Reference </Form.Label>
                        <Col sm="10">
                            <InputGroup size="sm" className="mb-3">
                                <FormControl className="shadow-none" type="text" name="sourceRef" aria-label="Small"
                                             aria-describedby="inputGroup-sizing-sm"
                                             value={selectedItem.sourceRef ? selectedItem.sourceRef : ''}
                                             onChange={onInputChange}/>
                            </InputGroup>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}> Data Source
                            <br/>
                            <span>{selectedItem.sourceType ? selectedItem.sourceType : ''}</span>
                        </Form.Label>
                        <Col sm={10}>



                            {dataSource.map((source: any, index: number) =>

                                <Form.Check
                                    key={index}
                                    type="radio"
                                    label={source}
                                    name="sourceType"
                                    value={source}
                                    // value={selectedItem.sourceType ? selectedItem.sourceType : source}
                                    // checked={selectedItem.sourceType ? selectedItem.sourceType : false}
                                    onChange={onInputChange}
                                    id={source + index}
                                />
                            )}
                        </Col>
                    </Form.Group>


                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
                    <Button size="sm" variant="primary" type="submit"> Save Changes </Button>
                </Modal.Footer>

            </Form>
        </Modal>


    )
};