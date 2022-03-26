import React, { ReactElement, useState } from "react";
import { Dropdown, DropdownButton, Nav, Navbar, NavItem } from "react-bootstrap";
import { MdClear, MdMenu } from "react-icons/all";
import moment from "moment";

import home from "../icons/home.png";

export default function NavBarComponent({ sidebarToggler, isCollapsed }: any): ReactElement {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)


    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <Navbar className="justify-content-between  mb-5" collapseOnSelect expand="lg" bg="dark" variant="dark">


            <div style={{ color: '#FFFFFF' }} onClick={() => sidebarToggler()}>
                <span>{isCollapsed ? <MdMenu size={30} /> : <MdClear size={30} />}</span>
                <Navbar.Brand> Teache Tool</Navbar.Brand>
            </div>


            <Nav className="" navbar>
                <Navbar.Brand href="/"> <img src={home} alt="alt" /></Navbar.Brand>
                {/* <NavItem className="mt-1 text-white d-none d-lg-block d-md-block">
                    {moment(new Date()).format('YYYY-MM-DD hh:mm a')}
                </NavItem>

                <NavItem className="text-white d-block d-sm-none ">
                    {moment(new Date()).format('hh:mm a')}
                </NavItem>
                {' '}
                <NavItem>
                    <DropdownButton variant="dark" className="shadow-none" id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </DropdownButton>
                </NavItem>*/}
            </Nav>


        </Navbar>
    )
};