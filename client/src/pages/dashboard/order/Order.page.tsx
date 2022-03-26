import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateOrderStatus, getUserById } from "./order.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import { getLoggedUserId, getLoggedUserRoles } from "../../../common/http";


interface Props {

}

export default function OrderPage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);

    let [orderStatus, setOrderStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);

    // let orderStatus = ["Pending", "Approved", "Rejected"]

    const [filterQueries, setFilterQueries]: any = useState({
        page: 0,
        limit: '',
        id: '',
        trip_id: '',
        user_id: getLoggedUserId(),
        driver_id: getLoggedUserId(),
        order_status: ''
    });

    // edit modal
    let [selectedEditItem, setEditSelectedItem]: any = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModalClose = () => setShowEditModal(false);



    // add new
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateClick = () => {
        setShowCreateModal(true);
    }

    const onFormSubmit = async (formData: any) => {
        console.log('msg', formData);

        let res = await create(formData)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);

        } else {
            //let error = await res.json()
            //console.log("error", error)
        }

        await loadData({});
    }

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            let { data } = await res.json()
            await loadData({});
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/script/${item.id}`)
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

        // let isMounted = true;
        // let isAdmin = getLoggedUserRoles()?.some( (role:any) => role.code === 'ADMIN');
        // let isOwner:any = getLoggedUserRoles()?.map( (role:any) => role.code === 'BE_OWNER');
        // let isRent:any = getLoggedUserRoles()?.map( (role:any) => role.code === 'TO_RENT');

        // console.log("admin", getLoggedUserRoles());
        // console.log("kjlh", getLoggedUserRoles()?.includes('TO_RENT'));

        // console.log("admin", isAdmin);
        // console.log("admin", isOwner);
        // console.log("admin", isRent);
        // console.log( "admin", isRent);

        (async () => {

            if (getLoggedUserRoles()?.includes('ADMIN') && getLoggedUserRoles()?.includes('TO_RENT')) {
                filterQueries['driver_id'] = ''
                filterQueries['user_id'] = ''
                await loadData(filterQueries);
            }
            else if (getLoggedUserRoles()?.includes('TO_RENT')) {
                filterQueries['driver_id'] = ''
                await loadData(filterQueries);
            }
            else if (getLoggedUserRoles()?.includes('BE_OWNER')) {
                filterQueries['user_id'] = ''
                await loadData(filterQueries);
            }
            else {
                filterQueries['driver_id'] = ''
                filterQueries['user_id'] = ''
                await loadData(filterQueries);
            }
        })()

    }, [])

    const loadData = async (queries: any) => {
        // queries['roles'] = getLoggedUserRoles()
        console.log(queries)

        let res = await gets(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // if (isMounted) setResponse(data)
            setResponse(data)
        } else {
            //let error = await res.json()
        }
    }


    //on edit from
    const onEditFormSubmit = async (formData: any) => {
        let res = await update(formData)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            ToastWarningMsg("Updated Successfully")
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Save")
        }

        await loadData({});
    }


    const approveStatus = async (item: any) => {

        let data = {
            order_status: "1"
        }

        // console.log(data, item.id)
        let res = await UpdateOrderStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            // if (isMounted) setResponse(data)
            await loadData({});
            ToastSuccessMsg("Order Approved Successfully")
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Approved")
        }
    }

    const rejectedStatus = async (item: any) => {

        let data = {
            order_status: "5"
        }

        // console.log(data, item.id)
        let res = await UpdateOrderStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log('msg', data);
            // if (isMounted) setResponse(data)
            await loadData({});
            ToastSuccessMsg("Order Approved Successfully")
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Approved")
        }
    }

    // const onOpenClick = async (item: any) => {
    //     history.push(`/me/trips/${item.id}`)
    // }

    const userDetails = async (item: any) => {

        // console.log(data, item.id)
        if (getLoggedUserRoles()?.includes('BE_OWNER')) {
            history.push(`/me/order-user-details/${item.user_id}`)
        }
        else if (getLoggedUserRoles()?.includes('TO_RENT')) {
            history.push(`/me/order-user-details/${item.driver_id}`)
        }
    }

    const VehicleDetails = async (item: any) => {
        history.push(`/me/order-vehicle-details/${item.vehicle_id}`)
    }


    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Body>

                    <Form >
                        <Row>
                            <Col lg={6}>

                                <Form.Group >
                                    <Form.Label > Order by Id </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="id" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.id ? filterQueries.id : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                    <Form.Label > Order by TripId </Form.Label>

                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="trip_id" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.trip_id ? filterQueries.trip_id : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>

                                </Form.Group>

                            </Col>
                            <Col lg={6}>
                                <Form.Label > Selcet Status </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="order_status" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Status Type</option>
                                        {orderStatus.map((order_status: any, index: number) =>
                                            <option value={order_status.value} key={index}>{order_status.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>


                                {
                                    getLoggedUserRoles()?.includes('ADMIN') ?
                                        <Form.Group >
                                            <Form.Label >Order By User Id </Form.Label>

                                            <InputGroup size="sm" className="mb-3">
                                                <FormControl className="shadow-none" type="text" name="user_id" aria-label="Small"
                                                    aria-describedby="inputGroup-sizing-sm"
                                                    value={filterQueries.user_id ? filterQueries.user_id : ''}
                                                    onChange={onInputChange}
                                                />
                                            </InputGroup>
                                        </Form.Group> : " "
                                }
                                {/* <Button type="button" size="sm" onClick={loadData}> Update </Button> */}
                                <Button type="button" className="float-right m-1 shadow-none"
                                    onClick={e => loadData({
                                        id: filterQueries?.id,
                                        trip_id: filterQueries?.trip_id,
                                        user_id: filterQueries?.user_id,
                                        order_status: filterQueries?.order_status,
                                    })}
                                    size="sm"> Search </Button>
                            </Col>


                        </Row>
                    </Form>

                </Card.Body>
            </Card>

            <Row>
                {response.data?.map((item: any, index: number) => (
                    <Col key={index} className="mt-3 " sm="12">
                        <Card className="shadow-lg bg-white  rounded" role="button">
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col lg={4} sm={12} className="h5 text-primary ">BDT <span className="h3 ">{item?.price}</span></Col>
                                            <Col lg={4} sm={12} className="font-weight-bold text-uppercase ">{item?.from_location} to {item?.to_location}</Col>
                                            <Col lg={4} sm={12} className="font-weight-bold text-danger "> &#9733; 4.5 Rating</Col>
                                        </Row>

                                        <Row className="text-capitalize mt-2">
                                            <Col lg={4} sm={12} className=" font-weight-bold">Order Status:
                                                {item.order_status == 0 && (<span style={{ color: 'blue' }} > Pending</span>)}
                                                {item.order_status == 1 && (<span style={{ color: 'green' }} > Approved</span>)}
                                                {item.order_status == 5 && (<span style={{ color: 'danger' }} > Order Rejected</span>)}
                                            </Col>
                                            <Col lg={4} sm={12} className=" font-weight-bold">AC Status: {item.ac_status == 1 && (<span style={{ color: 'blue' }} >AC</span>)}{item.ac_status == 2 && (<span style={{ color: 'green' }} >Non AC</span>)}</Col>
                                            <Col lg={4} sm={12} ><strong>Vehicle Id:</strong> {item.vehicle_id}</Col>
                                        </Row>

                                        <Row className="text-capitalize mt-2">
                                            <Col lg={4} sm={12}><strong>From:</strong> {item?.from_date}</Col>
                                            <Col lg={4} sm={12}><strong>To:</strong> {item?.to_date}</Col>
                                            <Col lg={4} sm={12}><strong>Distance:</strong> {item.distance}</Col>
                                        </Row>
                                        <Row className=" text-capitalize mt-2">
                                            <Col lg={4} sm={12}><strong>Trip Id:</strong> {item.trip_id}</Col>
                                            <Col lg={4} sm={12}><strong>Vehicle Id:</strong> {item.vehicle_id}</Col>
                                            <Col lg={4} sm={12}><strong>User Id:</strong> {item.user_id}</Col>
                                        </Row>
                                        {getLoggedUserRoles()?.includes('BE_OWNER') || getLoggedUserRoles()?.includes('ADMIN') ?
                                            <Row className="d-flex justify-content-between  text-capitalize mt-2">
                                                <Col lg={4} sm={12}><strong>Approve By:</strong> {item.approve_by}</Col>
                                                <Col lg={4} sm={12}><strong>Referral By:</strong> {item.referral_by}</Col>
                                                <Col lg={4} sm={12}><strong>Referral Bonus:</strong> {item.referral_bonus}</Col>
                                            </Row> : ''
                                        }
                                        <Row className="d-flex flex-column justify-content-between  text-capitalize mt-2">
                                            <Col lg={4} sm={12}><strong>Comment:</strong> {item.comments}</Col>
                                            <Col className="mt-2" lg={4} sm={12}><strong >Promo Code: {item.promo_code}</strong></Col>
                                        </Row>

                                        <Row className=" mt-3" >
                                            {getLoggedUserRoles()?.includes('ADMIN') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none mt-1 mb-1" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> <br />
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => approveStatus(item))}> Approve  </Button> {' '}
                                                    <Button className="shadow-none " size="sm" variant="danger" onClick={(event => rejectedStatus(item))}> Rejected  </Button> {' '}
                                                </Col> : ''
                                            }
                                            {getLoggedUserRoles()?.includes('BE_OWNER') ?
                                                <Col className="d-flex justify-content-between">
                                                    {/* <Button className="shadow-none " size="sm" variant="primary" onClick={(event => approveStatus(item))}> Approve Order </Button> {' '} */}
                                                    <Button className="shadow-none " size="sm" variant="danger" onClick={(event => rejectedStatus(item))}> Rejected </Button> {' '}
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => approveStatus(item))}> Approve </Button> {' '}
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => userDetails(item))}> User Details </Button> {' '}
                                                </Col> : ''
                                            }
                                            {getLoggedUserRoles()?.includes('TO_RENT') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => userDetails(item))}> Driver Details </Button> {' '}
                                                    <Button className="shadow-none " size="sm" variant="primary" onClick={(event => VehicleDetails(item))}> Vehicle Details </Button> {' '}
                                                </Col> : ''
                                            }
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-between mt-3">
                <div>Items: {response?.limit}</div>

                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick={e => loadData({
                            page: response.page - 1,
                            id: filterQueries?.id,
                            trip_id: filterQueries?.trip_id,
                            user_id: filterQueries?.user_id,
                            order_status: filterQueries?.order_status,

                        })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            page: response.page + 1,
                            id: filterQueries?.id,
                            trip_id: filterQueries?.trip_id,
                            user_id: filterQueries?.user_id,
                            order_status: filterQueries?.order_status
                        })} />
                    </Pagination>
                </div>

                <div>Total: {response?.count}</div>
            </div>


            <EditModal selectedItem={selectedEditItem} onFormSubmit={onEditFormSubmit} show={showEditModal}
                handleClose={handleEditModalClose} />
            <CreateModal onFormSubmit={onFormSubmit} show={showCreateModal} handleClose={handleCreateModalClose} />
        </div>
    )
};
