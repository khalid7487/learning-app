import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Pagination, Row, Table } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update } from "./news.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import DataTableGrid from "../../../rnd/DataTable.grid";


interface Props {

}

export default function NewsPage({ }: Props): ReactElement {
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

        }

        await loadData({});
    }


    const handleChange = (selectedChoice: any) => {
        console.log('handleChange', selectedChoice);
    }

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            // let { data } = await res.json()
            await loadData({});
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/news/${item.id}`)
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

            // //console.log('msg', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
            // const date = new Date(data.promo_expire_date);

            let date: any;
            data.data.map((item: any, index: any) => (
                console.log('date1->', item.promo_expire_date),
                date = new Date(item.promo_expire_date),
                console.log('date->', date.toString())
            ))

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

    const onSelectedItemAction = (selectedItem: any) => {
        console.log('msg', selectedItem);
        selectedItem.checked = !selectedItem.checked
    }
    const GridCustomHeader = () => {
        return <>
            <th style={{ minWidth: '100px' }}>Title</th>
            <th style={{ minWidth: '120px' }}>Description</th>
            <th style={{ minWidth: '120px' }}>Video Url</th>
            <th style={{ minWidth: '150px' }}>Promo Code</th>
            <th style={{ minWidth: '200px' }}>Promo Expire Date</th>
            <th style={{ minWidth: '150px' }}>Promo Discount</th>
        </>
    }

    const GridCustomContent = (item: any) => {

        return <>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.video_url}</td>
            <td>{item.promo_code}</td>

            <td>{new Date(parseInt(item.promo_expire_date)).toLocaleString()}</td>
            <td>{item.promo_discount_percentage}</td>
            <td>{GridCustomActions(item)}</td>
        </>
    }

    const GridCustomActions = (item: any) => {
        return <>

            <Button className="shadow-none mt-1 mb-1" size="sm" variant="danger"
                onClick={(event => onDeleteClick(item))}> Delete </Button> <br />
            <Button className="shadow-none" size="sm" variant="primary"
                onClick={(event => onOpenClick(item))}> Details </Button> {' '}


        </>
    }

    return (

        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>News Panel</Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}
                    {/* <DataTableGrid result={response?.data}
                        GridCustomHeader={GridCustomHeader}
                        GridCustomContent={GridCustomContent}
                        onSelectedItemAction={onSelectedItemAction}
                    />
 */}

                    {/* <Table responsive borderless size="sm">
                        <thead>
                            <tr style={{ background: "#bebebe" }}>
                                <th>#SL</th>
                                <th style={{ minWidth: '100px' }}>Title</th>
                                <th style={{ minWidth: '120px' }}>Description</th>
                                <th style={{ minWidth: '120px' }}>Video Url</th>
                                <th style={{ minWidth: '150px' }}>Promo Code</th>
                                <th style={{ minWidth: '200px' }}>Promo Expire Date</th>
                                <th style={{ minWidth: '150px' }}>Promo Discount</th>
                                <th style={{ minWidth: '300px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {response.data?.map((item: any, index: number) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.video_url}</td>
                                    <td>{item.promo_code}</td>
                               
                                    <td>{new Date(parseInt(item.promo_expire_date)).toLocaleString()}</td>
                                    <td>{item.promo_discount_percentage}</td>
                                   
                                    <td>
                                        <Button className="shadow-none" size="sm" variant="danger"
                                            onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                        <Button className="shadow-none" size="sm" variant="primary"
                                            onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                    </td>
                                    <td>

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
                                    <Col >
                                        <Row>
                                            <Col lg={4} sm={12}><strong>Promo Code:</strong> {item.promo_code}</Col>
                                            <Col lg={4} sm={12}><strong>Promo Discount:</strong> {item.promo_discount_amount}</Col>
                                            <Col lg={4} sm={12}><strong>Promo Expire Date:</strong> {new Date(parseInt(item.promo_expire_date)).toLocaleString()}</Col>
                                        </Row>
                                        <Row>
                                            <Col lg={4} sm={12}><strong>Title:</strong> {item.promo_code}</Col>
                                            <Col lg={4} sm={12}><strong>Description:</strong> {item.description}</Col>
                                            <Col lg={4} sm={12}><strong>Video Url:</strong> {item.video_url}</Col>
                                        </Row>
                                        <Row>
                                            <Col className="d-flex justify-content-between">
                                                <Button className="shadow-none" size="sm" variant="danger"
                                                    onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                <Button className="shadow-none" size="sm" variant="primary"
                                                    onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                            </Col>
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
