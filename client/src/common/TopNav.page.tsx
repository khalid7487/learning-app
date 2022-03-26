import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'


import back from '../icons/back.png';
import { getLoggedUserRoles, getUserProfileImage, isLoggedIn, unsetToken } from "./http";
import TopNavBarWrapper from './TopNavWrapper';


interface Props {

}

export default function TopNav({ }: Props): ReactElement {
    const history = useHistory()

    const onBackClick = async () => {
        history.push(`/`)
    }

    const onLoginClick = async () => {
        history.push(`/login`)
    }

    const onLogoutClick = async () => {
        unsetToken();
        history.push('/login')
    }

    // const onRegisterClick = async () => {
    //     history.push(`/registration`)
    // }


    return (
        <div className="">

            <Navbar className="d-none d-lg-block " expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Online Tutor</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    {/* <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">

                            <Nav.Link href="/teachers">Teachers</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contacts">Contacts</Nav.Link>

                        </Nav>
                    </Navbar.Collapse> */}

                    <TopNavBarWrapper />

                    <Navbar.Collapse className="justify-content-end">
                        <Nav>

                            {/*<Button variant="outline-primary" type="button" className="m-1"
                            onClick={onRegisterClick} size="sm"> Sign Up </Button>*/}



                            {!isLoggedIn() ?
                                <>
                                    <Nav.Link className="text-primary" href="/registration">Registration</Nav.Link>
                                    <Button type="button" variant="primary" className="m-1 shadow-none" onClick={onLoginClick}
                                        size="sm"> Login </Button>
                                </>
                                :
                                <>

                                    {
                                        getLoggedUserRoles()?.includes("ADMIN") ?
                                            <>
                                                <Nav.Link className="text-primary" href="/me">
                                                    {getUserProfileImage() ?
                                                        <img style={{ width: "27px", height: '27px', margin: '0 5px' }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + getUserProfileImage()} alt="img" />
                                                        :
                                                        "Dashboard"
                                                    }
                                                </Nav.Link>
                                                <Button type="button" variant="danger" className="m-1 shadow-none" onClick={onLogoutClick}
                                                    size="sm"> Logout </Button>
                                            </>
                                            :
                                            <>
                                                <NavDropdown title={
                                                    getLoggedUserRoles()?.includes("TEACHER")?
                                                    <span className="text-light my-auto">Teacher Profile</span>:
                                                    <span className="text-light my-auto">User Profile</span>

                                                } id="navbarScrollingDropdown">

                                                    {/* <Button type="button" variant="primary" className="text-light m-1 shadow-none" href="/me/user-profile">Edit  Profile</Button> */}
                                                    <NavDropdown.Item className="text-primary" href="/me/user-profile">Edit  Profile</NavDropdown.Item >

                                                    <Button type="button" variant="danger" className="mt-1 ml-4  shadow-none" onClick={onLogoutClick}
                                                        size="sm"> Logout </Button>
                                                </NavDropdown>
                                            </>
                                    }



                                </>
                            }

                            {/* <Nav.Link style={{ color: "tomato" }} eventKey="1" href="/login">
                                Login
                            </Nav.Link> */}

                            {/* <Nav.Link eventKey={2} href="/registration">
                                Sign Up
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <img className=" d-sm-block d-lg-none" src={back} alt="back" onClick={onBackClick} /> */}


        </div>
    )
}
