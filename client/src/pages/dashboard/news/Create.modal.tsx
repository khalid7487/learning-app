import React, {ReactElement, useState} from "react";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";

// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function CreateModal({onFormSubmit, show, handleClose}: any): ReactElement {

    const [formData, setFormData] = useState({})

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    let domains = ['NATURAL_AND_PURE_SCIENCE', 'APPLIED_SCIENCE', 'SOCIAL_AND_COMMUNITY',
        'WORLD_AND_CURRENT_AFFAIRS', 'COMMERCE_AND_FINANCE', 'ARTS', 'BELIEF_AND_THOUGHT',
        'LEISURE', 'LITERATURE', 'EDUCATIONAL_OR_INFORMATIVE', 'BUSINESS', 'PUBLIC_OR_INSTITUTIONAL'
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
                    <Modal.Title>Create Panel</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <InputGroup size="sm" className="mb-3">
                        <FormControl as="select" className="shadow-none" type="text" name="domain" aria-label="Small"
                                     aria-describedby="inputGroup-sizing-sm"
                                     onChange={onInputChange}>

                            <option>Select Domain</option>
                            {domains.map((domain: any, index: number) =>
                                <option value={domain} key={index}>{domain}</option>
                            )}
                        </FormControl>
                    </InputGroup>

                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl className="shadow-none" type="text" name="name" aria-label="Small"
                                         aria-describedby="inputGroup-sizing-sm"
                                         onChange={onInputChange}/>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlInput2">
                        <Form.Label>Description</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            <FormControl as="textarea" rows={5} className="shadow-none" type="text" name="description"
                                         aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                                         onChange={onInputChange}/>
                        </InputGroup>
                    </Form.Group>


                    {/*<Button type="submit" className="float-right" size="sm"> Submit </Button>*/}


                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
                    <Button size="sm" variant="primary" type="submit"> Save </Button>
                </Modal.Footer>

            </Form>
        </Modal>


    )
};