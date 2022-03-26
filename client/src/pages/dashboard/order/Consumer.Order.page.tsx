import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateOrderStatus } from "./order.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";


interface Props {

}

export default function OrderPage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);

    let [orderStatus, setOrderStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);

    // let orderStatus = ["Pending", "Approved", "Rejected"]

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        trip_id: '',
        user_id: '',
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

        (async () => {
            await loadData({});
        })()

    }, [])

    const loadData = async (queries: any) => {

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

    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}

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


                                <Form.Group >
                                    <Form.Label >Order By User Id </Form.Label>

                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="user_id" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.user_id ? filterQueries.user_id : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                {/* <Button type="button" size="sm" onClick={loadData}> Update </Button> */}
                                <Button type="button" className="float-right m-1"
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


                    <Table responsive borderless size="sm">
                        <thead>
                            <tr style={{ background: "#bebebe" }}>
                                <th>#SL</th>
                                <th style={{ minWidth: '100px' }}>User-Id</th>
                                <th style={{ minWidth: '100px' }}>Trip-Id</th>
                                <th style={{ minWidth: '100px' }}>Vehicle-ID</th>
                                <th style={{ minWidth: '100px' }}>Approve By</th>
                                <th style={{ minWidth: '100px' }}>Referral By</th>
                                <th style={{ minWidth: '120px' }}>Promo Code</th>
                                <th style={{ minWidth: '120px' }}>Referral Bonus</th>
                                <th style={{ minWidth: '150px' }}>Comments</th>
                                <th style={{ minWidth: '120px' }}>Order Status</th>
                                <th style={{ minWidth: '120px' }}>Trip Rating</th>
                                <th style={{ minWidth: '100px' }}>Ac Status</th>
                                <th style={{ minWidth: '100px' }}>Price</th>
                                <th style={{ minWidth: '100px' }}>Distance</th>
                                <th style={{ minWidth: '350px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {response.data?.map((item: any, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.user_id}</td>
                                    <td>{item.trip_id}</td>
                                    <td>{item.vehicle_id}</td>
                                    <td>{item.approve_by}</td>
                                    <td>{item.referral_by}</td>
                                    <td>{item.promo_code}</td>
                                    <td>{item.referral_bonus}</td>
                                    <td>{item.comments}</td>
                                    <td>{item.order_status == 0 && (<p style={{ color: 'blue' }} >Pending</p>)}{item.order_status == 1 && (<p style={{ color: 'green' }} >Approved</p>)}</td>
                                    <td>{item.trip_rating}</td>
                                    <td>{item.ac_status}</td>
                                    <td>{item.price}</td>
                                    <td>{item.distance}</td>
                                    {/*<td>{item.description}</td>*/}
                                    <td>
                                        <Button className="shadow-none" size="sm" variant="danger"
                                            onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary"
                                            onClick={(event => approveStatus(item))}> Approve Order </Button> {' '}
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between">
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
                </Card.Body>
            </Card>

            <EditModal selectedItem={selectedEditItem} onFormSubmit={onEditFormSubmit} show={showEditModal}
                handleClose={handleEditModalClose} />
            <CreateModal onFormSubmit={onFormSubmit} show={showCreateModal} handleClose={handleCreateModalClose} />
        </div>
    )
};
