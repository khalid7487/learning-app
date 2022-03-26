import { MdWork } from "react-icons/all";
import React from "react";


export const GetRoleWiseMenus = async (roles: any) => {

    if (roles?.includes("ADMIN")) {
        return AdminMenus;
    } else if (roles?.includes("TEACHER")) {
        return TEACHER;
    } else if (roles?.includes("USER")) {
        return USER;
    } else {
        return []
    }

}


export const AdminMenus: any = [

    {
        title: "Home Page",
        hasSubMenu: false,
        "icon": <MdWork className="text-success" />,
        "link": "/",
    },
    {
        title: "User Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Users",
                "link": "/me/users"
            },
            {
                "title": "User Profile",
                "link": "/me/user-profile"
            },
            {
                "title": "Roles Management",
                hasSubMenu: true,
                submenus: [
                    {
                        "title": "Roles",
                        "link": "/me/roles",
                    },
                ]
            },
            {
                "title": "Registration",
                "link": "/registration"
            },
        ]
    },
    {
        title: "Course",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Add Course",
                "link": "/me/add-course"
            },
            {
                "title": "Course",
                "link": "/me/course"
            },
        ]
    },
    {
        title: "Shedule",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Shedule",
                "link": "/me/shedule"
            },
        ]
    }
]


// teacher
export const TEACHER: any = [
    {
        title: "Home Page",
        hasSubMenu: false,
        "icon": <MdWork className="text-success" />,
        "link": "/",
    },
    {
        title: "User Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "User Profile",
                "link": "/me/user-profile"
            },
            {
                "title": "Registration",
                "link": "/registration"
            },
        ]
    },
    {
        title: "Course",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Add Course",
                "link": "/me/add-course"
            },
            {
                "title": "Course",
                "link": "/me/course"
            },
        ]
    },
    {
        title: "Shedule",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Add Shedule",
                "link": "/me/add-shedule"
            },
            {
                "title": "Shedule",
                "link": "/me/shedule"
            },
        ]
    }
]


// user/client
export const USER: any = [
    {
        title: "Home Page",
        hasSubMenu: false,
        "icon": <MdWork className="text-success" />,
        "link": "/",
    },
    {
        title: "User Management",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "User Profile",
                "link": "/me/user-profile"
            },
            {
                "title": "Registration",
                "link": "/registration"
            },
        ]
    },
    {
        title: "Course",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Course",
                "link": "/me/course"
            },
        ]
    },
    {
        title: "Shedule",
        hasSubMenu: true,
        "icon": <MdWork className="text-success" />,
        submenus: [
            {
                "title": "Shedule",
                "link": "/me/shedule"
            },
        ]
    }
]