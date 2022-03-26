import React, { ReactElement, useState } from "react";
import { Button, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { MdClear, MdMenu } from "react-icons/all";
import moment from "moment";

import home from "../icons/home.png";

import driver from '../icons/navbar-image/hiredriver.png';
import car from '../icons/navbar-image/car.png';
import driverpost from '../icons/navbar-image/driver-post.png';
import passengerpost from '../icons/navbar-image/passenger-post.png';
import trip from '../icons/navbar-image/post-trip.png';
import orderHistory from '../icons/navbar-image/order-history.png';
import support from '../icons/navbar-image/support.png';

export default function DriverTopNav({ onLogout }: any): ReactElement {

    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {/* <Nav.Link className="text-light  d-flex align-items-baseline" href="/"><img className="pr-1" src={driverpost} alt="back" /> Driver Post</Nav.Link> */}
                {/* <Nav.Link className="text-light d-flex align-items-center" href="/user-trip"><img className="pr-1" src={passengerpost} alt="back" />Passenger Post</Nav.Link> */}
                <Nav.Link className="text-light" href="/me/stdent-need"><img className="pr-1" src={car} alt="back" />Student Need</Nav.Link>
                <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={car} alt="back" />Course</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/add-course">Add Course</NavDropdown.Item>
                    <NavDropdown.Item href="/me/course">View Courses</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={car} alt="back" />Teacher Posts</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/add-teacher-post">Post for student</NavDropdown.Item>
                    <NavDropdown.Item href="/me/teacher-posts">View Posts</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={car} alt="back" />Shedule</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/add-shedule">Add Shedule</NavDropdown.Item>
                    <NavDropdown.Item href="/me/shedule">View Shedules</NavDropdown.Item>
                </NavDropdown>

                <Nav.Link className="text-light" href="/me/forum">Forum</Nav.Link>
                {/* <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={orderHistory} alt="back" />Orders History</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/orders">Passenger Orders </NavDropdown.Item>
                    <NavDropdown.Item href="/me/driver-orders">My Orders </NavDropdown.Item>
                </NavDropdown> */}



                {/* <Nav.Link href="/about">About</Nav.Link> */}
                <Nav.Link className="text-light" href="/contacts"><img className="pr-1" src={support} alt="back" />Support</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    )
};