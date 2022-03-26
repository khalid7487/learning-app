import React, { ReactElement } from "react";
import { Dropdown, DropdownButton, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { getLoggedUserRoles } from "./http";

import AllTopNav from "./AllTopNav.page";
import TeacherTopNav from "./TeacherTopNav.page";
import UserTopNav from "./UserTopNav.page";

export default function TopNavBarWrapper(): ReactElement {


    const toggleNavbar = () => {
        if (getLoggedUserRoles()?.includes("ADMIN")) {
            return <AllTopNav />;
        } else if (getLoggedUserRoles()?.includes("TEACHER")) {
            return <TeacherTopNav />;
        } else if (getLoggedUserRoles()?.includes("STUDENT")) {
            return <UserTopNav />;
        } else if (getLoggedUserRoles()?.includes("INSTITUTE_OWNER")) {
            return <UserTopNav />;
        } else if (getLoggedUserRoles()?.includes("GURDIAN")) {
            return <UserTopNav />;
        } else {
            return <AllTopNav />
        }
    }

    return (
        <>

            {
                toggleNavbar()
            }
        </>
    )
}