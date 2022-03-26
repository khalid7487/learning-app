import React, {ReactElement, useEffect, useState} from "react";
import {Button, Card, Col, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import {getAllRoles, registrationUser} from "./auth.service";
import {ToastFailedMsg, ToastSuccessMsg} from "../common/toast";
import moment from "moment";

interface Props {
    user: any,
    show: boolean,
    handleClose: any,
}

export default function UsersEditModal({user, show, handleClose}: Props): ReactElement {

    let {economicSituation, gender, levelOfEducation, locality, profession}: any = {
        economicSituation: ['LOWER_CLASS', 'MIDDLE_CLASS', 'UPPER_CLASS'],
        gender: ['UNSPECIFIED', 'MALE', 'FEMALE', 'NEUTRAL'],
        levelOfEducation: ['UNEDUCATED', 'SECONDARY', 'HIGHER_SECONDARY', 'POSTGRADUATE', 'GRADUATE'],
        locality: ['BARENDRI', 'RAJBONGSHI', 'KAMRUPI', 'MIDDLE_EAST', 'NORTH_EAST', 'South_East', 'CHATTOGRAM', 'NOAKHALI', 'ADIVASHI'],
        profession: ['SELF_EMPLOYED', 'JOB_HOLDER', 'STUDENT', 'UNEMPLOYED'],
        // roles: ['ADMIN', 'USER', 'ANNOTATOR', 'COLLECTOR'],
    }

    let [roles, setRoles] = useState<any>([])

    const [formData, setFormData] = useState(user)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {

        (async () => {
            let res = await getAllRoles();
            if (res.status === 200 || res.status === 201) {
                let result = await res.json()
                setRoles(result.data)

                console.log('msg--role', roles);
            } else {
                //let error = await res.json()
                //console.log("error", error)
            }
        })()

    }, [])


    const onUserProfileInputChange = (e: any) => {
        let temp = {...user}
        temp.userProfile[e.target.name] = e.target.value
        setFormData(temp)
    }

    const onRolesSelectChange = (e: any) => {

        let options = e.target.options;
        let values: any = [];
        for (let option of options) {
            if (option.selected) {
                values.push(JSON.parse(option.value));
            }
        }

        console.log('msg', values);
        user.roles = values;

        // @ts-ignore
        // let values = Array.from(e.target.selectedOptions, option => option.value);
        // const values = [...e.target.selectedOptions].map(opt => opt.value);
        setFormData({
            ...user,
            [e.target.name]: values
        })
    }

    const onFormSubmit = async (e: any) => {
        e.preventDefault()
        console.log('onFormSubmit', formData);

        //todo: need to update user info

        // if (await registrationUser(formData)) {
        //     // history.push('/')
        //     ToastSuccessMsg("User Registration Successful")
        // } else {
        //     ToastFailedMsg("User Registration Failed")
        // }
        handleClose();
    }

    return (

        <Modal size="lg" show={show} onHide={handleClose}>
            <Form method="post" onSubmit={onFormSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>User Edit Panel</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {user && user.userProfile ?
                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <Card.Header> Basic Information </Card.Header>
                                    <Card.Body>


                                        <Row>

                                            <Col lg={6}>
                                                <Form.Group>
                                                    <Form.Label>First Name</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     name="firstname"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     defaultValue={user.firstname}
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Last Name</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     defaultValue={user.lastname}
                                                                     name="lastname"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Phone</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     defaultValue={user.phone}
                                                                     name="phone"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Email</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     defaultValue={user.email}
                                                                     name="email"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>NID</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     name="nid" aria-describedby="inputGroup-sizing-sm"
                                                                     defaultValue={user.nid}
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Gender </Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="gender"
                                                                      value={user.gender ? user.gender: ''}
                                                                      onChange={onInputChange}>

                                                            {gender?.map((item: any, index: number) =>
                                                                <option key={index} value={item}>{item}</option>
                                                            )}
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>


                                            <Col lg={6}>

                                                <Form.Group>
                                                    <Form.Label>Date of Birth</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl className="shadow-none" type="date"
                                                                     aria-label="Small"
                                                                     name="dateOfBirth"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     onChange={onUserProfileInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>

                                                <Form.Group>
                                                    <Form.Label>Username</Form.Label>
                                                    <InputGroup size="sm">
                                                        <FormControl readOnly={true} className="shadow-none" type="text"
                                                                     aria-label="Small"
                                                                     name="username"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     defaultValue={user.username}
                                                                     onChange={onInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>


                                                {/*<Form.Group>
                                                <Form.Label>Password</Form.Label>
                                                <InputGroup size="sm">
                                                    <FormControl className="shadow-none" type="text" aria-label="Small"
                                                                 name="password" aria-describedby="inputGroup-sizing-sm"
                                                                 onChange={onInputChange}/>
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>C Password</Form.Label>
                                                <InputGroup size="sm">
                                                    <FormControl className="shadow-none" type="text" aria-label="Small"
                                                                 name="cPassword" aria-describedby="inputGroup-sizing-sm"
                                                                 onChange={onInputChange}/>
                                                </InputGroup>
                                                {errors.cPassword && <p>{errors.cPassword.message}</p>}
                                            </Form.Group>*/}


                                                <Form.Group>
                                                    <Form.Label>Roles</Form.Label>
                                                    <Form.Control as="select" multiple name="roles"
                                                                  onChange={onRolesSelectChange}>

                                                        {roles && roles?.map((item: any, index: number) =>
                                                            <option value={JSON.stringify(item)}
                                                                    key={index}>{item.name}</option>
                                                        )}
                                                    </Form.Control>

                                                    Assigned Roles:

                                                    [{user && user.roles?.map((item: any, index: number) =>
                                                    <span style={{color: "red"}} key={index}>{item.name} |</span>
                                                )}]

                                                </Form.Group>

                                            </Col>
                                        </Row>


                                    </Card.Body>
                                </Card>
                            </Col>


                            <Col lg={6}>
                                <Card>
                                    <Card.Header> Speaker Profile</Card.Header>
                                    <Card.Body>


                                        <Row>
                                            <Col lg={6}>
                                                <Form.Group>
                                                    <Form.Label>Locality</Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="locality"
                                                                      value={user.userProfile.locality ? user.userProfile.locality: ''}
                                                                      onChange={e => onUserProfileInputChange(e)}>

                                                            {locality?.map((item: any, index: number) =>
                                                                <option key={index}>{item}</option>
                                                            )}
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Profession</Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="profession"
                                                                      value={user.userProfile.profession ? user.userProfile.profession : ''}
                                                                      onChange={e => onUserProfileInputChange(e)}>

                                                            {profession?.map((item: any, index: number) =>
                                                                <option key={index}>{item}</option>
                                                            )}
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Economic Situation</Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="economicSituation"
                                                                      value={user.userProfile.economicSituation ? user.userProfile.economicSituation :'' }
                                                                      onChange={onUserProfileInputChange}>

                                                            {economicSituation?.map((item: any, index: number) =>
                                                                <option key={index}>{item}</option>
                                                            )}
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Education</Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="levelOfEducation"
                                                                      value={user.userProfile.levelOfEducation ? user.userProfile.levelOfEducation : ''}
                                                                      onChange={onUserProfileInputChange}>

                                                            {levelOfEducation?.map((item: any, index: number) =>
                                                                <option key={index}>{item}</option>
                                                            )}
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>


                                            <Col lg={6}>
                                                <Form.Group>
                                                    <Form.Label>Hearing Status</Form.Label>
                                                    <InputGroup size="sm">
                                                        <Form.Control as="select" name="hearingStatus"
                                                                      value={user.userProfile.hearingStatus? user.userProfile.hearingStatus: 'false'}
                                                                      onChange={onUserProfileInputChange}>

                                                            <option value="true">YES</option>
                                                            <option value="false">NO</option>
                                                        </Form.Control>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Address</Form.Label>
                                                    <InputGroup size="sm" className="mb-3">
                                                        <FormControl as="textarea" rows={3} className="shadow-none"
                                                                     type="text"
                                                                     name="address"
                                                                     aria-label="Small"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     defaultValue={user.userProfile.address}
                                                                     onChange={onUserProfileInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label>Comments</Form.Label>
                                                    <InputGroup size="sm" className="mb-3">
                                                        <FormControl as="textarea" rows={3} className="shadow-none"
                                                                     type="text"
                                                                     name="comments"
                                                                     defaultValue={user.userProfile.comments}
                                                                     aria-label="Small"
                                                                     aria-describedby="inputGroup-sizing-sm"
                                                                     onChange={onUserProfileInputChange}/>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/*<Button type="submit" className="float-right" size="sm"*/}
                                        {/*        onClick={onFormSubmit}> Submit </Button>*/}

                                    </Card.Body>
                                </Card>
                            </Col>


                        </Row> : ""
                    }

                </Modal.Body>
                <Modal.Footer>
                    {/*<Button className="" size="sm" onClick={onFormReset}> Rest </Button>*/}
                    <Button size="sm" variant="secondary" onClick={handleClose}> Close </Button>
                    <Button size="sm" variant="primary" type="submit"> Save Changes </Button>
                </Modal.Footer>

            </Form>
        </Modal>


    )
};