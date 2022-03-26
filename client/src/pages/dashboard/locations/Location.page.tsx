import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update } from "./Location.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";


interface Props {

}

export default function LocationPage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        from_location: '',
        to_location: ''
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
        history.push(`/me/locations/${item.id}`)
    }


    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData({});
        })()

        // return () => {
        //     isMounted = false
        // };
    }, [])


    const loadData = async (queries: any) => {

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


    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Location Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}

                    {/* <Table responsive borderless size="sm">
                        <thead>
                            <tr style={{ background: "#bebebe" }}>
                                <th>SL#</th>
                                <th>location</th>
                                <th>latitude</th>
                                <th>longitude</th>
                                <th style={{ minWidth: '250px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {response.data?.map((item: any, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.location}</td>
                                    <td>{item.latitude}</td>
                                    <td>{item.longitude}</td>
                                    <td>
                                        <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table> */}
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
                                            <Col>

                                                <Row className="text-capitalize mt-1">
                                                    <Col lg={4} sm={12} > <strong>Location:</strong> {item.location}</Col>
                                                    <Col lg={4} sm={12} ><strong>Longitude:</strong> {item.longitude}</Col>
                                                    <Col lg={4} sm={12} ><strong>Latitude:</strong> {item.latitude}</Col>
                                                </Row>
                                                <Row>
                                                    <Col className="d-flex justify-content-between">
                                                        <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                        <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-between">
                <div>Items: {response?.limit}</div>

                <div>
                    <Pagination size="sm">
                        <Pagination.Prev onClick={e => loadData({ from_location: filterQueries?.to_location, page: response.page - 1 })} />
                        <Pagination.Item> Pages: {response?.page}/{response?.totalPage} </Pagination.Item>
                        <Pagination.Next onClick={e => loadData({ from_location: filterQueries?.to_location, page: response.page + 1 })} />
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
