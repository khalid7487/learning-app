import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { get, isLoggedIn, post, setToken } from '../common/http'
import { Button, Card, Form, FormControl, InputGroup, Table } from "react-bootstrap";

import home from "../icons/home.png";
import BottomNav from '../common/BottomNav.page';
import { ToastFailedMsg } from '../common/toast';

interface Props {

}

//ES7/React/Redux
//rfc js
//tfc ts

interface FormDataI {
    phone: string;
    password: string
}

export interface UserInfoI {
    firstName: string;
    lastName: string
}

export default function Login({ }: Props): ReactElement {

    const [formData, setFormData] = useState<FormDataI>({ phone: '', password: '' })
    const [usersInfo, setUsersInfo] = useState<UserInfoI | null>(null)

    const history = useHistory()


    useEffect(() => {
        //called when jwt changed
        if (isLoggedIn()) {
            history.push('/')
        }
    }, [])

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let res = await post("/auth/login", formData)
        if (res.status === 200 || res.status === 201) {
            //success
            let data = await res.json()

            setToken(data);

            //history.push('/')
            window.location.reload();

            console.log('msg', 'login done');
        } else {
            ToastFailedMsg("Phone or Password is Invalid.")
        }

    }

    const onOpenClick = async () => {
        history.push('/registration')
    }

    const onHomeClick = async () => {
        history.push('/')
    }

    return (
        <div className="min-vw-100 min-vh-100 d-flex justify-content-center align-items-center container-fluid">

            <Card className="mt-5 mb-5">
                {/* <Card.Header> Login Panel </Card.Header> */}
                <Card.Body>
                    <Form method="post" onSubmit={onFormSubmit}>
                        <div className="d-flex justify-content-between align-items">
                            <Card.Subtitle >Rental App</Card.Subtitle >
                            <img src={home} onClick={onHomeClick} alt="home" />
                        </div>
                        <Card.Title className="mt-3">Let's get Started</Card.Title>
                        <Card.Text>Enter your Phone and password to Login </Card.Text>
                        <Form.Label>Phone Number</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            {/* <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Phone</InputGroup.Text>
                            </InputGroup.Prepend> */}
                            <FormControl className="shadow-none" type="text" placeholder="Enter your phone Number" name="phone" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={onInputChange} />
                        </InputGroup>

                        <Form.Label>Password</Form.Label>
                        <InputGroup size="sm" className="mb-3">
                            {/* <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
                            </InputGroup.Prepend> */}
                            <FormControl className="shadow-none" type="password" name="password" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={onInputChange} />
                        </InputGroup>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Keep me signed in" />
                        </Form.Group>
                        <Button variant="outline-primary" className="float-left" size="sm" type="button" onClick={onOpenClick}> Registration </Button>
                        <Button className="float-right" variant="primary" size="sm" type="submit"> Login </Button>

                    </Form>
                </Card.Body >
            </Card>

            <BottomNav />

            {/*<form onSubmit={onFormSubmit}>*/}
            {/*    <label>Username:</label>*/}
            {/*    <input type="text" name="phone" className="form-control shadow-none" onChange={onInputChange}/>*/}
            {/*    <label>Password:</label>*/}
            {/*    <input type="text" name="password" className="form-control " />*/}
            {/*    <br/>*/}
            {/*    <button type="submit">Submit</button>*/}
            {/*</form>*/}

            {

                //userInfo ? <p>userName: {userInfo.firstName + " " + userInfo.lastName}</p> : null
                // userInfo &&(
                //     <p>userName: {userInfo.firstName + " " + userInfo.lastName}</p>
                // )
            }
        </div>
    )
}
