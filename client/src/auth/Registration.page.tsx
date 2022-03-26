import React, { ReactElement, RefAttributes, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Nav, Row } from "react-bootstrap";
import { getAllRoles, registrationUser } from "./auth.service";
import { ToastFailedMsg, ToastSuccessMsg } from "../common/toast";

import pp from "../icons/profile-img.png";
import TopNav from '../common/TopNav.page';
import BottomNav from '../common/BottomNav.page';
import Footer from '../common/Footer.page';


interface Props {

}

export default function Registration({ }: Props): ReactElement {

    let history = useHistory();

    let [roles, setRoles]: any = useState([])

    useEffect(() => {

        (async () => {


            let res = await getAllRoles();
            if (res.status === 200 || res.status === 201) {
                let result = await res.json()
                //setRoles(result)

                setRoles(result.filter((item: any) => item.name !== 'ADMIN'));

                console.log('msg--role', roles);
            } else {
                let error = await res.json()
                console.log("error", error)
            }


            // if(getLoggedUserRoles().some( (item:any) => item.name != 'ADMIN')) {
            //     console.log('msg', 'remove admin role');
            // }


        })()

    }, [])


    const [formData, setFormData]: any = useState({
        user_type: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        dob: "",
        username: "",
        password: "",
        address: "",
        gender: "",
        profile_image: "",
    })


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSingleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        //console.log('onSingleSelectChange]', [JSON.parse(e.target.value).id]);

        setFormData({
            ...formData,
            [e.target.name]: [JSON.parse(e.target.value).id]
        })
    }


    const onRolesSelectChange = (e: any) => {

        let options = e.target.options;
        let values: any = [];
        // values = options.map( (item:any, index :any) => item.id )
        // console.log(values)
        for (let option of options) {
            if (option.selected) {
                values.push(JSON.parse(option.value).id);
            }
        }

        // @ts-ignore
        // let values = Array.from(e.target.selectedOptions, option => option.value);
        // const values = [...e.target.selectedOptions].map(opt => opt.value);
        setFormData({
            ...formData,
            [e.target.name]: values
        })
    }

    const onFormReset = async (e: any) => {
        setFormData({
            cPassword: "",
            email: "",
            user_type: '',
            firstname: "",
            dob: "",
            gender: "",
            lastname: "",
            address: "",
            password: "",
            phone: "",
            username: "",
            profile_image: "",
        })
    }

    const onLoginClick = async (e: any) => {
        history.push('/login');
    }


    const onFormSubmit = async (e: any) => {
        e.preventDefault()

        let data = new FormData();

        data.append('phone', formData.phone)
        data.append('email', formData.email)
        data.append('password', formData.password)
        data.append('firstname', formData.firstname)
        data.append('lastname', formData.lastname)
        data.append('dateOfbirth', formData.dob)
        data.append('address', formData.address)
        data.append('profile_image', formData.profile_image);
        data.append('role_ids', JSON.stringify(formData.roles));

        if(typeof formData.roles === 'undefined'){
            ToastFailedMsg("Please select user type")
            return
        }

        // console.log('onFormSubmit', formData);

        // if (await registrationUser(data)) {
        //     ToastSuccessMsg("User Registration Successful")
        // } else {
        //     ToastFailedMsg("User Registration Failed")
        // }
        const res = await registrationUser(data)
        if (res.ok || res.status === 201) {
            ToastSuccessMsg("Register Successfully")
            history.push('/login')
        } else if(res.status === 400){        
            ToastFailedMsg("Phone or Email already taken")
        }
        else {
            ToastFailedMsg("Registration Failed")
        }

    }

    const previewImage = (file: RefAttributes<HTMLImageElement>) => {
        if (file) return URL.createObjectURL(file)
        return pp;
    }


    const onInputFileChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })
    }


    return (
        <>
            <TopNav />


            <div className="mt-1 d-flex justify-content-center align-items-center container-fluid">
                <Form>

                    <Card >
                        {/* <Card.Header> Basic Information </Card.Header> */}
                        <Card.Title className="mt-3 pl-2 pr-2">Registration</Card.Title>
                        <Card.Text className="ml-2 mr-2" >Welcome to our community && Get ready to learn with us.</Card.Text >
                        <Card.Body>


                            {/* <Col lg={4} sm={12}>
                                <Form.Group >
                                    <label htmlFor="upload">
                                        <Image style={{ height: '150px', width: '150px' }}
                                            src={previewImage(formData.profile_image)} roundedCircle />
                                        <input id="upload" style={{ display: 'none' }} className="mt-2" type="file" name="profile_image"
                                            accept="image/*" onChange={onInputFileChange} />

                                        <div style={{ marginTop: '-40px', color: '#ffffff' }} className="text-center">Upload Profile</div>
                                    </label>

                                </Form.Group>
                            </Col> */}
                            <Row>
                                <Col sm={12} lg={6}>

                                    <Form.Group>
                                        <Form.Label >First Name</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="text" aria-label="Small"
                                                name="firstname" aria-describedby="inputGroup-sizing-sm"
                                                value={formData.firstname}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Phone Number*</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="text" aria-label="Small"
                                                value={formData.phone}
                                                name="phone" aria-describedby="inputGroup-sizing-sm"
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="email" aria-label="Small"
                                                value={formData.email}
                                                name="email" aria-describedby="inputGroup-sizing-sm"
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                </Col>

                                <Col sm={12} lg={6}>
                                    <Form.Group>
                                        <Form.Label >Last Name</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="text" aria-label="Small"
                                                name="lastname" aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={formData.lastname} onChange={onInputChange} />
                                            {/* <Button className="shadow-none" size="sm"> GET </Button> */}
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password*</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="password" aria-label="Small"
                                                name="password" aria-describedby="inputGroup-sizing-sm"
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Birth of Date</Form.Label>
                                        <InputGroup size="sm">
                                            <FormControl className="shadow-none" type="date" aria-label="Small"
                                                name="dob" aria-describedby="inputGroup-sizing-sm"
                                                value={formData.dob}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Form.Group>
                                <Form.Label>Join as* </Form.Label>

                                {/*<Form.Control as="select" multiple name="roles" onChange={onRolesSelectChange}>*/}
                                {/*    {roles && roles?.map((item: any, index: number) =>*/}
                                {/*        <option value={JSON.stringify(item)} key={index}>{item.name}</option>*/}
                                {/*    )}*/}
                                {/*</Form.Control>*/}

                                <Form.Control className="shadow-none" as="select" name="roles" onChange={onSingleSelectChange}>
                                    <option>Select User Type</option>
                                    {roles && roles?.map((item: any, index: number) =>
                                        <option value={JSON.stringify(item)} key={index}>{item.name}</option>
                                    )}
                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <InputGroup size="sm">
                                    <FormControl as="textarea" className="shadow-none" type="text" aria-label="Small"
                                        name="address" aria-describedby="inputGroup-sizing-sm"
                                        value={formData.address}
                                        onChange={onInputChange} />
                                </InputGroup>
                            </Form.Group>



                            <Button className="btn-block shadow-none" type="submit" size="sm" onClick={onFormSubmit}> Submit </Button>
                            {/* <Button variant="outline-secondary" className="mt-3 shadow-none btn-block" size="sm" onClick={onLoginClick}> Login </Button> */}
                            {/* <Nav.Link className="text-primary text-center" href="/change-password">Change Password</Nav.Link> */}
                            <div className="p-3 d-sm-block d-lg-none">
                                Already have an account?<Link to="/login"> Log in</Link>
                            </div>








                        </Card.Body>
                    </Card>
                </Form>
            </div>

            {/* <Footer /> */}
            <BottomNav />
        </>
    )
}
