import React, { ReactElement, useEffect, useState } from 'react'
import SideNavbar from "../../menus/SideNavbar";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { decodeToken, getLoggedUserRoles, isLoggedIn, unsetToken } from "../../common/http";
import { GetRoleWiseMenus } from "../../menus/menus.eng";
import NavBarComponent from "../../menus/Navbar";
import DashboardContainerPage from "./DashboardContainer.page";
import UsersPage from "../../auth/Users.page";
import UserUpdatePage from "../../auth/Update.page";
import ProfilePage from "../../auth/Profile.page";
import RolesPage from "../../auth/Roles.page";
import RoleUpdatePage from "../../auth/Roles.update";
import CourseCreatePage from "./course/CourseCreatePage";
import CourseDetailsPage from "./course/CourseDetailsPage";
import VehicleCreatePage from "./vehicle/VehicleCreatePage";
import VehiclePage from "./vehicle/Vehicle.page";
import VehicleDetailsPage from "./vehicle/VehicleDetailsPage";
import AddShedule from "./shedule/ScheduleCreatePage";
import OrderCreatePage from "./order/OrderCreatePage";
import OrderPage from "./order/Order.page";
import ShedulePage from "./shedule/Shedule.page";
import SheduleDetailsPage from "./shedule/SheduleDetailsPage";
import NewsCreatePage from "./news/NewsCreatePage";
import NewsPage from "./news/news.page";
import NewsDetailsPage from "./news/NewsDetailsPage";

import './dashboard.page.scss';
import UserTripPage from './trip/UserTrip.page';
import OrderDetailsPage from './order/OrderDetailsPage';
import OrdersVehicleDetailsPage from './order/OrdersVehicleDetails.page';
import CoursePage from './course/Course.page';
import EnrolStudentPage from './course/EnrolStudent.page';
import TopNav from '../../common/TopNav.page';
import AdminNavBarComponent from '../../menus/NavbarAdmin';
import TeacherPostsCreatePage from '../teacher-posts/TeacherPostsCreatePage';
import TeacherPostsPage from '../teacher-posts/TeacherPosts.page';
import UserPostsCreatePage from '../users-posts/UsersPostsCreatePage';
import UserPostsPage from '../users-posts/UsersPosts.page';
import TeacherPostsDetailsPage from '../teacher-posts/TeacherPostsDetails.page';
import UserPostsDetailsPage from '../users-posts/UserPostsDetails.page';
import StudentNeedPage from '../users-posts/StudentNeed.page';
import TeacherNeedPage from '../teacher-posts/TeacherNeed.page';
import TeacherNeedDetailsPage from '../teacher-posts/TeacherNeedDetails.page';
import StudentNeedDetailsPage from '../users-posts/StudentNeedDetails.page';

interface Props {

}


export default function MainDashboardPage({ }: Props): ReactElement {

    const history = useHistory()
    let { path, url } = useRouteMatch();


    const [collapsedSidebar, setCollapsedSidebar] = useState(true);
    let [lang, setLang]: any = useState('eng')
    const [sidebarMenusData, setSidebarMenus] = useState([]);

    useEffect(() => {

        // if runtime token missing then immediately redirect to login page
        let loginStatus = isLoggedIn();
        if (!loginStatus) {
            history.push('/login');
        }

        // console.log('roles', role)

        // if (role) {
        //     if (role === UserTypes.ADMIN) {
        //
        //         setSidebarMenus(AdminMenus)
        //
        //     } else {
        //         setSidebarMenus(CollectorMenus)
        //     }
        // }


        (async () => {

            // @ts-ignore
            if (decodeToken()?.roles) {
                // @ts-ignore
                let result = decodeToken()?.roles

                console.log('msg', result);
                // let {GetRoleWiseMenus} = await import(`./{lang}/MenuData`);
                setSidebarMenus(await GetRoleWiseMenus(result)); // get menus

            } else {
                return;
            }


        })();


        // console.log('msg', sidebarMenusData);
    }, [lang])


    const onLogout = ((e: any) => {
        unsetToken();
        history.push('/login')
    });

    const toggleSidebar = () => {
        setCollapsedSidebar(!collapsedSidebar);
    }


    return (
        <div className="vh-100 d-flex justify-content-start align-items-stretch">


            <SideNavbar
                collapsedSidebar={collapsedSidebar}
                toggleSidebar={toggleSidebar}
                sidebarMenusData={sidebarMenusData}
                onLogout={onLogout}
            />




            <div className="overflow-auto flex-grow-1">

                <span className="d-sm-block d-lg-none">
                    <NavBarComponent sidebarToggler={toggleSidebar} isCollapsed={collapsedSidebar} />
                </span>

                {
                    getLoggedUserRoles()?.includes("ADMIN") ?
                        <span className="d-none d-lg-block "  >
                            {/* <NavBarWrapper onLogout={onLogout} /> */}
                            <AdminNavBarComponent onLogout={onLogout} />
                        </span>
                        :
                        <span className="d-none d-lg-block "  >
                            <TopNav />
                        </span>
                }

                <Switch >

                    <Route exact path={path}>
                        {/*<h1>Welcome to Home Page</h1>*/}
                        <DashboardContainerPage />
                    </Route>

                    <Route path={`${path}/users`} component={UsersPage} />
                    <Route exact path={`${path}/user/:id`} component={UserUpdatePage} />
                    <Route exact path={`${path}/user-profile`} component={ProfilePage} />

                    <Route path={`${path}/roles`} component={RolesPage} />
                    <Route path={`${path}/role/:id`} component={RoleUpdatePage} />


                    <Route exact path={`${path}/add-course`} component={CourseCreatePage} />
                    <Route exact path={`${path}/course`} component={CoursePage} />
                    <Route exact path={`${path}/course/:id`} component={CourseDetailsPage} />
                    <Route exact path={`${path}/enrol-student/:id`} component={EnrolStudentPage} />


                    <Route path={`${path}/add-teacher-post`} component={TeacherPostsCreatePage} />
                    <Route exact path={`${path}/teacher-post/:id`} component={TeacherPostsDetailsPage} />
                    <Route path={`${path}/teacher-need`} component={TeacherNeedPage} />
                    <Route path={`${path}/teacher-need-details/:id`} component={TeacherNeedDetailsPage} />
                    <Route path={`${path}/teacher-posts`} component={TeacherPostsPage} />

                    <Route path={`${path}/add-user-post`} component={UserPostsCreatePage} />
                    <Route path={`${path}/stdent-need`} component={StudentNeedPage} />
                    <Route path={`${path}/stdent-need-details/:id`} component={StudentNeedDetailsPage} />
                    <Route exact path={`${path}/user-post/:id`} component={UserPostsDetailsPage} />
                    <Route path={`${path}/user-posts`} component={UserPostsPage} />

                    {/*<Route exact path={`${path}/script`} component={ScriptDetailsPage}/>*/}
                    {/*<Route exact path={`${path}/script/:id`} component={ScriptDetailsPage}/>*/}
                    {/*<Route exact path={`${path}/script-pagination`} component={ScriptPaginationPage}/>*/}


                    <Route exact path={`${path}/add-orders`} component={OrderCreatePage} />
                    <Route exact path={`${path}/orders`} component={OrderPage} />
                    <Route exact path={`${path}/order-user-details/:id`} component={OrderDetailsPage} />
                    <Route exact path={`${path}/order-vehicle-details/:id`} component={OrdersVehicleDetailsPage} />

                    <Route exact path={`${path}/shedule`} component={ShedulePage} />
                    <Route exact path={`${path}/shedule/:id`} component={SheduleDetailsPage} />
                    <Route exact path={`${path}/user-trips`} component={UserTripPage} />
                    <Route exact path={`${path}/add-shedule`} component={AddShedule} />

                    <Route exact path={`${path}/add-news`} component={NewsCreatePage} />
                    <Route exact path={`${path}/news`} component={NewsPage} />
                    <Route exact path={`${path}/news/:id`} component={NewsDetailsPage} />

                    {/*<Route path={`${path}/:collectionId`} component={CollectionStoragePage}/>*/}
                </Switch>

            </div>
        </div>
    )
}
