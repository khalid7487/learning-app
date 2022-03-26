import React, { useEffect, useState } from 'react';

import Login from './auth/Login.page'

import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Main from './Main.page';

import './App.scss';
import Registration from "./auth/Registration.page";
import MainDashboardPage from "./pages/dashboard/MainDashboard.page";
import ReactNotification from 'react-notifications-component'
import { isLoggedIn } from "./common/http";
import Details from "./pages/Details.page";
import Order from "./pages/Order.page";
import HireDriver from './pages/HireTeacher.page';
import TeacherPage from './pages/Teacher.page';
import AboutPage from './pages/About.page';
import ContactPage from './pages/Contact.page';


function App() {

    const [loginStatus, setLoginStatus]: any = useState({ loginStatus: isLoggedIn() });
    // const [loginStatus, setLoginStatus]:any = useState();

    /* let menus = [
         { path: "/", name: "main", component: Main },
         { path: "/home", name: "Home", component: Home },
         { path: "/registration", name: "Home", component: Registration }
     ];*/


    useEffect(() => {


        // let status = isLoggedIn();
        // console.log('isLoggedIn', loginStatus);
        // setLoginStatus(status)
    }, [])

    return (
        <div className="App">

            <ReactNotification />
            {/*<Application />*/}

            {/*<Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>*/}
            <Router>
                {/*<Router>*/}
                <Switch>

                    {loginStatus ?
                        <>

                            <Route exact path="/" component={Main} />
                            <Route path="/registration" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route path="/me" component={MainDashboardPage} />

                            <Route path="/teachers" component={TeacherPage} />

                            <Route path="/about" component={AboutPage} />
                            <Route path="/contacts" component={ContactPage} />

                            <Route exact path="/details/:id" component={Details} />
                            <Route exact path="/order/:id" component={Order} />
                            <Route exact path={`/hire-teachers/:id`} component={HireDriver} />
                            
                        </>
                        : <Login />

                    }


                </Switch>
            </Router>

        </div>
    );
}

export default App;
