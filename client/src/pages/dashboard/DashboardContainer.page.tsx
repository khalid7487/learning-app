import { ReactElement, useEffect, useState } from "react";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BiRightArrowCircle } from "react-icons/all";
import userPops from "../../icons/car.png";
import userPng from "../../icons/dashboard/user.png";
import { getLoggedUserRoles } from "../../common/http";
import { getCountDriver, getCountOrder, getCountTrip, getCountUser, getCountVehicles, getMemoryManagement, getPreviousDayTotalOrders, getPreviousDayTotalVehicle, getPreviousDayTotalVehicleTrip, getPreviousMonthTotalOrders, getPreviousMonthTotalVehicle, getPreviousMonthTotalVehicleTrip, getPreviousWeekTotalOrders, getPreviousWeekTotalVehicle, getPreviousWeekTotalVehicleTrip, getServerTime, getTodayTotalOrders, getTodayTotalVehicle, getTodayTotalVehicleTrip } from "../DefaultHome.service";

interface Props {

}

export default function DashboardContainerPage({ }: Props): ReactElement {

    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    let [userCount, setUserCount]: any = useState();
    let [driver, setDriver]: any = useState();
    let [vehicle, setVehicle]: any = useState();
    let [todayTotalVehicle, setTodayTotalVehicle]: any = useState();
    let [previousdayTotalVehicle, setPreviousdayTotalVehicle]: any = useState();
    let [previousWeekTotalVehicle, setPreviousWeekTotalVehicle]: any = useState();
    let [previousMonthTotalVehicle, setPreviousMonthTotalVehicle]: any = useState();
    let [trip, setTrip]: any = useState();
    let [todayTotalVehicleTrip, setTodayTotalVehicleTrip]: any = useState();
    let [previousdayTotalVehicleTrip, setPreviousdayTotalVehicleTrip]: any = useState();
    let [previousWeekTotalVehicleTrip, setPreviousWeekTotalVehicleTrip]: any = useState();
    let [previousMonthTotalVehicleTrip, setPreviousMonthTotalVehicleTrip]: any = useState();
    let [order, setOrder]: any = useState();
    let [todayTotalOrders, setTodayTotalOrders]: any = useState();
    let [previousdayTotalOrders, setPreviousdayTotalOrders]: any = useState();
    let [previousWeekTotalOrders, setPreviousWeekTotalOrders]: any = useState();
    let [previousMonthTotalOrders, setPreviousMonthTotalOrders]: any = useState();
    let [serverTime, setServerTime]: any = useState();
    let [memory, setMemory]: any = useState({});

    useEffect(() => {

        (async () => {

            if (getLoggedUserRoles()?.includes('ADMIN')) {
                await loadCountAllUser();
                await loadCountAllDriver();
                await loadCountAllVehicles();

                await loadTodayAllVehicles();
                await loadPreviousdayAllVehicles();
                await loadPreviousweekAllVehicles();
                await loadPreviousMonthAllVehicles();

                await loadCountAllTrip();

                await loadTodayAllVehiclesTrip();
                await loadPreviousdayAllVehiclesTrip();
                await loadPreviousweekAllVehiclesTrip();
                await loadPreviousMonthAllVehiclesTrip();

                await loadCountAllOrder();

                await loadTodayAllOrder();
                await loadPreviousdayAllOrder();
                await loadPreviousweekAllOrder();
                await loadPreviousMonthAllOrder();

                await loadServerTime();
                await loadMemoryManagement();
            } else {
                // await loadData();
            }

        })()
    }, [])

    const loadCountAllUser = async () => {

        let res = await getCountUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            console.log('User', data);
            setUserCount(data)

        } else {
            //let error = await res.json()
        }
    }

    const loadCountAllDriver = async () => {

        let res = await getCountDriver()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Driver', data);
            setDriver(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadCountAllVehicles = async () => {

        let res = await getCountVehicles()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setVehicle(data)
        } else {
            //let error = await res.json()
        }
    }
    //today all vehicles
    const loadTodayAllVehicles = async () => {

        let res = await getTodayTotalVehicle()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Today Vehicles', data);
            setTodayTotalVehicle(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousday all vehicles
    const loadPreviousdayAllVehicles = async () => {

        let res = await getPreviousDayTotalVehicle()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('getPreviousDayTotalVehicle', data);
            setPreviousdayTotalVehicle(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousweek all vehicles
    const loadPreviousweekAllVehicles = async () => {

        let res = await getPreviousWeekTotalVehicle()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousWeekTotalVehicle(data)
        } else {
            //let error = await res.json()
        }
    }

    //PreviousMonth all vehicles
    const loadPreviousMonthAllVehicles = async () => {

        let res = await getPreviousMonthTotalVehicle()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousMonthTotalVehicle(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadCountAllTrip = async () => {

        let res = await getCountTrip()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Trip', data);
            setTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    //today all vehiclesTrip
    const loadTodayAllVehiclesTrip = async () => {

        let res = await getTodayTotalVehicleTrip()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('setTodayTotalVehicleTrip', data);
            setTodayTotalVehicleTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousday all vehiclesTrip
    const loadPreviousdayAllVehiclesTrip = async () => {

        let res = await getPreviousDayTotalVehicleTrip()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousdayTotalVehicleTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousweek all vehiclesTrip
    const loadPreviousweekAllVehiclesTrip = async () => {

        let res = await getPreviousWeekTotalVehicleTrip()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousWeekTotalVehicleTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    //PreviousMonth all vehiclesTrip
    const loadPreviousMonthAllVehiclesTrip = async () => {

        let res = await getPreviousMonthTotalVehicleTrip()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousMonthTotalVehicleTrip(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadCountAllOrder = async () => {

        let res = await getCountOrder()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Order', data);
            setOrder(data)
        } else {
            //let error = await res.json()
        }
    }

    //today all vehiclesTrip
    const loadTodayAllOrder = async () => {

        let res = await getTodayTotalOrders()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setTodayTotalOrders(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousday all vehiclesTrip
    const loadPreviousdayAllOrder = async () => {

        let res = await getPreviousDayTotalOrders()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousdayTotalOrders(data)
        } else {
            //let error = await res.json()
        }
    }

    //Previousweek all vehiclesTrip
    const loadPreviousweekAllOrder = async () => {

        let res = await getPreviousWeekTotalOrders()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousWeekTotalOrders(data)
        } else {
            //let error = await res.json()
        }
    }

    //PreviousMonth all vehiclesTrip
    const loadPreviousMonthAllOrder = async () => {

        let res = await getPreviousMonthTotalOrders()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Vehicles', data);
            setPreviousMonthTotalOrders(data)
        } else {
            //let error = await res.json()
        }
    }

    const loadServerTime = async () => {

        let res = await getServerTime()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Server time', data);
            let mydate = new Date(data);
            let time = mydate.toDateString()
            console.log(mydate.toDateString());
            setServerTime(time)
        } else {
            //let error = await res.json()
        }
    }
    const loadMemoryManagement = async () => {

        let res = await getMemoryManagement()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('Memory', data);
            setMemory(data);
        } else {
            //let error = await res.json()
        }
    }


    return (
        <>
            {getLoggedUserRoles()?.includes('ADMIN') ?

                < div >
                    <Row lg='4' md='2' sm='1' className="m-1">

                        <Col sm={12} className="mb-3">
                            <Card style={{ background: '#00C0EF' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>{userCount}</h3>
                                            <p>Total User</p>
                                        </div>
                                        <img src={userPng} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>
                        </Col>

                        {/* <Col className="mb-3">
                            <Card style={{ background: '#39CCCC' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>5</h3>
                                            <p>Prvious day  Orders</p>
                                        </div>
                                        <img src={userPops} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>
                        </Col> */}

                        <Col sm={12} className="mb-3">
                            <Card style={{ background: '#F39C12' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>{driver}</h3>
                                            <p>Total Driver</p>
                                        </div>
                                        <img src={userPng} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>

                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={12} className="mb-3">
                            <Card style={{ background: '#00A65A' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>{vehicle}</h3>
                                            <p>Total Vehicle</p>
                                        </div>
                                        <img src={userPops} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>

                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>
                        </Col>
                        <Col sm={12} className="mb-3">
                            <Card style={{ background: '#FF851B' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>{trip}</h3>
                                            <p>Total Trips</p>
                                        </div>
                                        <img src={userPops} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>
                        </Col>

                        <Col sm={12} className="mb-3">
                            <Card style={{ background: '#605CA8' }}>
                                <Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <div className="text-white">
                                            <h3>{order}</h3>
                                            <p>Total Orders</p>
                                        </div>
                                        <img src={userPops} style={{ width: '50px', height: '50px' }} alt="users-img" />
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                            </Card>

                        </Col>

                        {/* <Col sm={12} className="mb-3">
                    <Card style={{ background: '#3D9970' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div className="text-white">
                                    <h3>{memory.number_of_cpus}</h3>
                                    <p>Server CPU Ram Status</p>
                                </div>
                               
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                    </Card>
                </Col>
                <Col className="mb-3">
                    <Card style={{ background: '#3C8DBC' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div className="text-white">
                                    <h3>{memory.total_usages_memory}</h3>
                                    <p>Total Useage Memory </p>
                                </div>
                                
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                    </Card>
                </Col>
                <Col className="mb-3">
                    <Card style={{ background: '#39CCCC' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div className="text-white">
                                    <h3>{serverTime}</h3>
                                    <p>Server Time</p>
                                </div>
                                
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                    </Card>
                </Col>
                <Col className="mb-3">
                    <Card style={{ background: '#3C8DBC' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div className="text-white">
                                    <h3>{memory.free_memory}</h3>
                                    <p>Total Availabe Memory </p>
                                </div>
                               
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-white">More info <BiRightArrowCircle /></Card.Footer>
                    </Card>
                </Col> */}

                    </Row>

                    <Row lg="2" xs="1" sm="1" md="2" className='m-1'>
                        <Col className='mb-1'>
                            <Card body className="outline" color="success">
                                <Card.Title className="h5">Report</Card.Title>
                                {/* <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text>
                                <Button size="sm" className="shadow-none">Button</Button> */}
                                <Row>
                                    <Col><strong>Today All Vehicle :</strong> {todayTotalVehicle}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Day Total Vehicle:</strong> {previousdayTotalVehicle}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Week Total Vehicle :</strong> {previousWeekTotalVehicle}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Month Total Vehicle :</strong> {previousMonthTotalVehicle}</Col>
                                </Row>


                                <Row>
                                    <Col><strong>Today All Vehicle Trip:</strong> {todayTotalVehicleTrip}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Day Total Vehicle Trip:</strong> {previousdayTotalVehicleTrip}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Week Total Vehicle Trip:</strong> {previousWeekTotalVehicleTrip}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Month Total Vehicle Trip:</strong> {previousMonthTotalVehicleTrip}</Col>
                                </Row>

                                <Row>
                                    <Col><strong>Today All Order :</strong> {todayTotalOrders}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Day Total Order:</strong> {previousdayTotalOrders}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Week Total Order :</strong> {previousWeekTotalOrders}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Previous Month Total Month :</strong> {previousMonthTotalOrders}</Col>
                                </Row>

                            </Card>
                        </Col>
                        <Col className='mb-1'>
                            <Card body className="outline" color="success">
                                <Card.Title className="h5">System Information</Card.Title>
                                {/* <Card.Text>With supporting text below as a natural lead-in to additional content.</Card.Text> */}
                                <Row>
                                    <Col><strong>Server Time :</strong> {serverTime}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Server CPU Ram Status :</strong> {memory.number_of_cpus}</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Total Useage Memory :</strong> {memory.total_usages_memory} Mb</Col>
                                </Row>
                                <Row>
                                    <Col><strong>Total Availabe Memory :</strong> {memory.free_memory} Mb</Col>
                                </Row>
                                <Button size="sm" className="shadow-none">Button</Button>
                            </Card>
                        </Col>
                    </Row>

                </div > : ''
            }
        </>
    )
};