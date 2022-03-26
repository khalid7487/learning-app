import React, { ReactElement, useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import TopNav from './TopNav.page'

import back from '../icons/back.png';
import home from '../icons/home.png';
import driver from '../icons/driver.png';
import login from '../icons/login.png';
import reg from '../icons/registration.png';

interface Props {

}

export default function BottomNav({ }: Props): ReactElement {
    const history = useHistory()


    return (
        <div className="main-section">

            <div className="bg-white d-sm-block d-lg-none fixed-bottom p-1 pl-2 pr-2 border-top" >
                    <div className="d-flex  justify-content-around ">
                        <div className="  d-flex  flex-column align-items-center " onClick={ e => history.push("/drivers")}><img  src={driver} alt="back" /><div> Driver</div> </div>
                        <div className=" d-flex  flex-column align-items-center " onClick={ e => history.push("/")} ><img  src={home} alt="back" /> <div> Home</div> </div>
                        {/* <div className="  d-flex  flex-column align-items-center " onClick="/login" ><img  src={login} alt="back" /><div> Login </div> </div> */}
                        <div className="  d-flex  flex-column align-items-center " onClick={ e => history.push("/registration")} ><img  src={reg} alt="back" /><div> Join </div> </div>
                        <div className=" d-flex  flex-column align-items-center " onClick={ e => history.push("/me")} ><img  src={home} alt="back" /> <div> Profile</div> </div>
                    </div>
            </div>

        </div>
    )
}
