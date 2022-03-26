import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination, Form, InputGroup, FormControl } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateVehicleStatus } from "./vehicle.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import DataTableGrid from "../../../rnd/DataTable.grid";
import { getLoggedUserId, getLoggedUserRoles } from "../../../common/http";


interface Props {

}

export default function VehiclePage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let [vehicleStatus, setTripStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);

    // let vehicleStatus = [
    //     "Pending",
    //     "Approved",
    //     "Rejected"
    // ]

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        userId: getLoggedUserId(),
        vehicle_status: ''
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


    const handleChange = (selectedChoice: any) => {
        console.log('handleChange', selectedChoice);
    }

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/vehicles/${item.id}`)
    }

    const onAddtripClick = async (item: any) => {
        history.push(`/me/add-trips-vehicle/${item.id}`)
    }


    const approveStatus = async (item: any) => {

        let data = {
            vehicle_status: "1"
        }

        let res = await UpdateVehicleStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Trip Approved Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Trip Approved faield ");
        }
    }



    useEffect(() => {

        (async () => {
            
            if (getLoggedUserRoles()?.includes('ADMIN') && getLoggedUserRoles()?.includes('TO_RENT')) {
                filterQueries['userId'] = ''
                await loadData(filterQueries);
            } else {
                await loadData(filterQueries);
            }

        })()
    }, [])


    const loadData = async (queries: any) => {
        console.log("something", queries)
        let res = await gets(queries)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()

            console.log('msg', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
        } else {
            //let error = await res.json()
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterQueries({
            ...filterQueries,
            [e.target.name]: e.target.value
        })
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

    const onSelectedItemAction = (selectedItem: any) => {
        console.log('msg', selectedItem);
        selectedItem.checked = !selectedItem.checked
    }

    const GridCustomActions = (item: any) => {


        let isAdmin = getLoggedUserRoles()?.includes('ADMIN')
        let isRent = getLoggedUserRoles()?.includes('TO_RENT')
        let isOwner = getLoggedUserRoles()?.includes('BE_OWNER')


        return <>

            {isAdmin ?
                <>
                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                    <Button className="shadow-none" size="sm" variant="primary"
                        onClick={(event => approveStatus(item))}> Approve Vehicle </Button> {' '}
                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Open </Button> {' '}
                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}> Add Trip </Button>
                </> : ''
            }
            {isOwner ?
                <>
                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Open </Button> {' '}
                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}> Add Trip </Button>
                </> : ''
            }

        </>
    }

    const GridCustomHeader = () => {
        return <>
            <th>Sits</th>
            <th>Status</th>
            <th>Model</th>
            <th>Color</th>
            <th>Plate No</th>
            <th>Licence No</th>
            <th></th>
        </>
    }

    const GridCustomContent = (item: any) => {

        return <>
            <td>{item.vehicle_sits}</td>
            <td>
                {item.vehicle_status === 0 && (<p style={{ color: 'blue' }} >Pending</p>)}
                {item.vehicle_status === 1 && (<p style={{ color: 'green' }}>Approved</p>)}
            </td>
            <td>{item.vehicle_model}</td>
            <td>{item.vehicle_color}</td>
            <td>{item.vehicle_plate_no}</td>
            <td>{item.vehicle_licence_no}</td>
            <td>
                <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo1} alt="img" />
                <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo2} alt="img" />
                <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo3} alt="img" />
                <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo4} alt="img" />
            </td>
            <td>{GridCustomActions(item)}</td>
        </>
    }

    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Vehicles Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>
  
                    <Form >
                        <Row>
                            <Col lg={6}>

                                <Form.Group >
                                    <Form.Label  > Vehicle by Id </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl className="shadow-none" type="number" name="id" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            value={filterQueries.id ? filterQueries.id : ''}
                                            onChange={onInputChange}
                                        />
                                    </InputGroup>
                                </Form.Group>

                                {
                                    getLoggedUserRoles()?.includes('ADMIN') ?
                                        <Form.Group >
                                            <Form.Label > Vehicle by UserId </Form.Label>
                                            <InputGroup size="sm" className="mb-3">
                                                <FormControl className="shadow-none" type="number" name="userId" aria-label="Small"
                                                    aria-describedby="inputGroup-sizing-sm"
                                                    value={filterQueries.userId ? filterQueries.userId : ''}
                                                    onChange={onInputChange}
                                                />
                                            </InputGroup>
                                        </Form.Group> : " "
                                }

                            </Col>
                            <Col lg={6}>
                                <Form.Label  > Vehicle Status </Form.Label>
                                <InputGroup size="sm" className="mb-3">
                                    <FormControl as="select" className="shadow-none" type="text" name="vehicle_status" aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onInputChange}>
                                        <option>Select Status Type</option>
                                        {vehicleStatus.map((vehicle_status: any, index: number) =>
                                            <option value={vehicle_status.value} key={index}>{vehicle_status.name}</option>
                                        )}
                                    </FormControl>
                                </InputGroup>

                                {/* <Button type="button" size="sm" onClick={loadData}> Update </Button> */}
                                <Button type="button" className="float-right m-1 shadow-none"
                                    onClick={e => loadData({
                                        id: filterQueries?.id,
                                        userId: filterQueries?.userId,
                                        vehicle_status: filterQueries?.vehicle_status
                                    })}

                                    size="sm"> Search </Button>
                            </Col>

                        </Row>
                    </Form>

                    {/* 
                    <DataTableGrid result={response?.data}
                        GridCustomHeader={GridCustomHeader}
                        GridCustomContent={GridCustomContent}
                        onSelectedItemAction={onSelectedItemAction}
                    /> */}


                    {/* 
                    <Table responsive borderless size="sm">
                        <thead>
                            <tr style={{ background: "#bebebe" }}>
                                <th>SL#</th>
                                <th>Sits</th>
                                <th>Status</th>
                                <th>Model</th>
                                <th>Color</th>
                                <th>Plate No</th>
                                <th>Licence No</th>
                                <th></th>
                                <th style={{ minWidth: '350px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {response.data?.map((item: any, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.vehicle_sits}</td>
                                    <td>
                                        {item.vehicle_status === 0 && (<p style={{ color: 'blue' }} >Pending</p>)}
                                        {item.vehicle_status === 1 && (<p style={{ color: 'green' }}>Approved</p>)}
                                    </td>
                                    <td>{item.vehicle_model}</td>
                                    <td>{item.vehicle_color}</td>
                                    <td>{item.vehicle_plate_no}</td>
                                    <td>{item.vehicle_licence_no}</td>
                                    <td>
                                        <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo1} alt="img" />
                                        <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo2} alt="img" />
                                        <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo3} alt="img" />
                                        <img style={{ width: "20%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo4} alt="img" />
                                    </td>

                                    <td>
                                        <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary"
                                            onClick={(event => approveStatus(item))}> Approve Vehicle </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Open </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}> Add Trip </Button> {' '}
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
       */}

                </Card.Body>
            </Card>

            <Row>
                {response.data?.map((item: any, index: number) => (
                    <Col key={index} className="mt-3" sm="12">
                        <Card className="shadow-lg bg-white  rounded" role="button">
                            <Card.Body>

                                <Row>
                                    <Col>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12} ><strong>Sits:</strong> {item.vehicle_sits}</Col>
                                            <Col lg={4} sm={12} ><strong>Status:</strong>
                                                {item.vehicle_status === 0 && (<span style={{ color: 'blue' }} > Pending</span>)}
                                                {item.vehicle_status === 1 && (<span style={{ color: 'green' }}> Approved</span>)}
                                            </Col>
                                            <Col lg={4} sm={12} ><strong>Model:</strong> {item.vehicle_model}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}><strong>Color:</strong> {item.vehicle_color}</Col>
                                            <Col lg={4} sm={12}><strong>Plate No:</strong> {item.vehicle_plate_no}</Col>
                                            <Col lg={4} sm={12}><strong>Licence No:</strong> {item.vehicle_licence_no}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}>
                                                <img style={{ width: "20%", marginRight:"10px" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo1} alt="img" />
                                                <img style={{ width: "20%", marginRight:"10px"}} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo2} alt="img" />
                                                <img style={{ width: "20%", marginRight:"10px"}} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo3} alt="img" />
                                                <img style={{ width: "20%", marginRight:"10px"}} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle_photo4} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row className="text-capitalize mt-3">
                                            {getLoggedUserRoles()?.includes('ADMIN') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary"
                                                        onClick={(event => approveStatus(item))}> Approve Vehicle </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}> Add Trip </Button>
                                                </Col> : ''
                                            }
                                            {getLoggedUserRoles()?.includes('BE_OWNER') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddtripClick(item))}> Add Trip </Button>
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
                            userId: filterQueries?.userId,
                            vehicle_status: filterQueries?.vehicle_status
                        })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({
                            page: response.page + 1,
                            id: filterQueries?.id,
                            userId: filterQueries?.userId,
                            vehicle_status: filterQueries?.vehicle_status
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
