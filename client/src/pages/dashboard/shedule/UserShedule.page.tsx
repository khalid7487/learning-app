import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateScheduleStatus, userWiseVehicleTrip } from "./Shedule.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import { getLoggedUserId } from "../../../common/http";


interface Props {

}

export default function UserTripPage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let [tripStatus, setTripStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);
    let [tripTypes, setTripTypes]: any = useState(["One Way", "Two Way", "Round Way", "Full Body"]);

    let [filterQueries, setFilterQueries]: any = useState({
        page: 0,
        limit: '',
        from_location: '',
        to_location: '',
        vehicleId: '',
        trip_type: ''
        // vehicletrip_status:"",

    });


    // edit modal
    let [selectedEditItem, setEditSelectedItem]: any = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalClick = (selectedItem: any) => {
        console.log('handleShow', selectedItem)
        setShowEditModal(true);
        setEditSelectedItem(selectedItem);
    }


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

        await loadData();
    }


    const handleChange = (selectedChoice: any) => {
        console.log('handleChange', selectedChoice);
    }


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
    }

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            let { data } = await res.json()
            await loadData();
            ToastSuccessMsg("Deleted Successfully");
        } else {
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/trips/${item.id}`)
    }


    const approveStatus = async (item: any) => {

        let data = {
            vehicletrip_status: "1"
        }

        let res = await UpdateScheduleStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData();
            ToastSuccessMsg("Trip Approved Successfully");
            // if (isMounted) setResponse(data)
            // setResponse(data)
        } else {
            //let error = await res.json()
            ToastFailedMsg("Trip Approved faield ");
        }
    }


    const rejectedStatus = async (item: any) => {

        let data = {
            vehicletrip_status: "5"
        }

        let res = await UpdateScheduleStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData();
            ToastSuccessMsg("Trip Rejected Successfully");
            // if (isMounted) setResponse(data)
            // setResponse(data)
        } else {
            //let error = await res.json()
            ToastFailedMsg("Trip Rejected faield ");
        }
    }


    useEffect(() => {
        (async () => {
            await loadData();
        })()

    }, [])

    const loadData = async () => {

        // console.log("something 1", queries)
        let res = await userWiseVehicleTrip(getLoggedUserId())

        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log(data.map((item: any) =>
                item.vehicleTrips
            ))
            setResponse(data)
            // if(data.)

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
        await loadData();
    }


    return (

        <div className="mt-4 container-fluid">

            <Card>
                {/* <Card.Header>
                    <Row>
                        <Col>Trip Panel</Col>
                    </Row>
                </Card.Header> */}

                {/* <Card.Body>
                    <Form >
                        <Row>
                            <Col lg={6}>

                                <Form.Group >
                                    <Form.Label > From </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="from_location" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.from_location ? filterQueries.from_location : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>

                                </Form.Group>

                                <Form.Group>
                                    <Form.Label > To </Form.Label>

                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="text" name="to_location" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.to_location ? filterQueries.to_location : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>

                                </Form.Group>

                            </Col>
                            <Col lg={6}>

                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="trip_type" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Trip Type</option>
                                        {tripTypes.map((trip_type: any, index: number) =>
                                            <option value={trip_type} key={index}>{trip_type}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>



                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="vehicletrip_status" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Status Type</option>
                                        {tripStatus.map((item: any, index: number) =>
                                            <option value={item.value} key={index}>{item.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                <Button type="button" className="float-right m-1"
                                    onClick={e => loadData()}
                                    size="sm"> Search </Button>
                            </Col>


                        </Row>
                    </Form> 

                </Card.Body> */}
            </Card>

            <Row>
                {response.map((item: any) => (
                    item.vehicleTrips?.map((item: any, index: number) => (
                        <Col key={index} className="mt-3 " sm="12">
                            <Card className="shadow-lg bg-white  rounded" role="button">
                                <Card.Body>
                                    <Row>
                                        <Col>

                                            <Row className="mt-1">
                                                <Col lg={4} sm={12} ><strong className=" text-primary "> BDT {item?.price}</strong></Col>
                                                <Col lg={4} sm={12} className="font-weight-bold text-uppercase ">{item?.from_location} to {item?.to_location}</Col>
                                                <Col lg={4} sm={12} className="font-weight-bold  "> Distance: {item.distance}</Col>
                                            </Row>

                                            <Button className="shadow-none mt-1 mb-1" size="sm" variant="primary"
                                                onClick={(event => approveStatus(item))}> Active  </Button> {' '}

                                            <Row className="text-capitalize mt-1">
                                                <Col lg={4} sm={12} className=" font-weight-bold">Vehicle Trip Status:
                                                    {item.vehicletrip_status === 0 && (<span style={{ color: 'blue' }} > Pending</span>)}
                                                    {item.vehicletrip_status === 1 && (<span style={{ color: 'green' }}> Approved</span>)}
                                                    {item.vehicletrip_status === 5 && (<span style={{ color: 'red' }}> Rejected</span>)}
                                                </Col>
                                                <Col lg={4} sm={12} className=" text-capitalize"><strong>AC Status:</strong> {item.ac_status == 1 && (<span style={{ color: 'blue' }} >AC</span>)}{item.ac_status == 2 && (<span style={{ color: 'green' }} >Non AC</span>)}</Col>
                                                <Col lg={4} sm={12} className=" text-capitalize"><strong>Trip Type:</strong> {item.trip_type}</Col>
                                            </Row>

                                            <Row className="mt-1">
                                                <Col lg={4} sm={12} className=" text-capitalize "><strong>From Date: </strong> {item.from_date}</Col>
                                                <Col lg={4} sm={12} className=" text-capitalize "><strong>To Date: </strong> {item.to_date}</Col>
                                            </Row>
                                            <Row>
                                                <Col className="d-flex justify-content-between mt-2">
                                                    <Button className="shadow-none" size="sm" variant="outline-danger"
                                                        onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="outline-danger"
                                                        onClick={(event => rejectedStatus(item))}> InActive </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary"
                                                        onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))))
                }
            </Row >
            {/* 
            <div className="d-flex justify-content-between">
                <div>Items: {response?.limit}</div>
                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick={e => loadData()} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData()} />
                    </Pagination>
                </div>

                <div>Total: {response?.count}</div>
            </div> */}


            <EditModal selectedItem={selectedEditItem} onFormSubmit={onEditFormSubmit} show={showEditModal}
                handleClose={handleEditModalClose} />
            <CreateModal onFormSubmit={onFormSubmit} show={showCreateModal} handleClose={handleCreateModalClose} />
        </div >
    )
};
