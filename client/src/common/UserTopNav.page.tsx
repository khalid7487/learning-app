import React, { ReactElement, useState } from "react";
import { Button, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { MdClear, MdMenu } from "react-icons/all";
import moment from "moment";

import home from "../icons/home.png";
import driver from '../icons/navbar-image/hiredriver.png';
import driverpost from '../icons/navbar-image/driver-post.png';
import trip from '../icons/navbar-image/post-trip.png';
import orderHistory from '../icons/navbar-image/order-history.png';
import support from '../icons/navbar-image/support.png';

export default function UserTopNav({ onLogout }: any): ReactElement {

    return (
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                {/* <Nav.Link className="text-light d-flex align-items-baseline" href="/"><img className="pr-1" src={driverpost} alt="back" /> Driver Post</Nav.Link> */}
                <Nav.Link className="text-light" href="/me/teacher-need"><img className="pr-1" src={driver} alt="back" />Teacher Need</Nav.Link>
                <Nav.Link className="text-light d-flex align-items-center" href="/teachers"> <img className="pr-1" src={driver} alt="back" /> Hire Teacher</Nav.Link>
                <Nav.Link className="text-light d-flex align-items-center" href="/me/shedule"> <img className="pr-1" src={driver} alt="back" />My Shedules</Nav.Link>
                <Nav.Link className="text-light d-flex align-items-center" href="/me/course"> <img className="pr-1" src={driver} alt="back" />My Courses</Nav.Link>
                <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={trip} alt="back" />Teacher need</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/add-user-post">Post for Teacher</NavDropdown.Item>
                    <NavDropdown.Item href="/me/user-posts">View Your Posts</NavDropdown.Item>
                </NavDropdown>

                {/* <Nav.Link className="text-light" href="/me/orders">Orders History</Nav.Link> */}
                {/* <NavDropdown title={
                    <span className="text-light my-auto"><img className="pr-1" src={orderHistory} alt="back" />Orders History</span>
                } id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/me/orders">My Orders </NavDropdown.Item>
                    <NavDropdown.Item href="/me/driver-orders">Driver Orders </NavDropdown.Item>
                </NavDropdown> */}

                {/* <Nav.Link href="/about">About</Nav.Link> */}
                <Nav.Link className="text-light" href="/contacts"><img className="pr-1" src={support} alt="back" />Support</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    )
};