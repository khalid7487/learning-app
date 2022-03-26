import React, { ReactElement, useState } from "react";
import { Button, Container, Dropdown, DropdownButton, Form, FormControl, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { MdClear, MdMenu } from "react-icons/all";
import moment from "moment";

import home from "../icons/home.png";

export default function AdminNavBarComponent({ onLogout }: any): ReactElement {

    return (
        <Navbar className="justify-content-between  mb-5" collapseOnSelect expand="lg" bg="light" variant="light">
            
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" >
                <Nav >
                    <Navbar.Brand href="/"> <img src={home} alt="alt" /></Navbar.Brand>

                    <NavDropdown title="Course" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/me/add-course">Add Course</NavDropdown.Item>
                        <NavDropdown.Item href="/me/course">Courses</NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title="Profile" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/me/users">Users</NavDropdown.Item>
                        <NavDropdown.Item href="/me/user-profile">User Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/me/roles">Roles</NavDropdown.Item>
                    </NavDropdown>

                    {/* <Nav.Link href="/me/orders">Orders</Nav.Link> */}

                    <NavDropdown title="Shedule" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="/me/shedule">Shedules</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            <Button type="button" variant="danger" className="m-1 shadow-none" onClick={onLogout}
                size="sm"> Logout </Button>
        </Navbar>

    )
};