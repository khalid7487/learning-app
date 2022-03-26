import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination, Form, InputGroup, FormControl } from 'react-bootstrap';
import { create, deleteItemById, download, gets, update, UpdateCourseStatus } from "./Course.service";
import { ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg } from "../../../common/toast";
import { useHistory } from "react-router-dom";
import { getLoggedUserId, getLoggedUserRoles } from "../../../common/http";


interface Props {

}

export default function CoursePage({ }: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);
    let [vehicleStatus, setTripStatus]: any = useState([
        { name: 'Pending', value: 0 }, { name: 'Approved', value: 1 }, { name: 'Rejected', value: 5 }
    ]);


    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
    //     userId: '',
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
        history.push(`/me/course/${item.id}`)
    }

    const onOpenClickEnrolStudent = async (item: any) => {
        history.push(`/me/enrol-student/${item.id}`)
    }


    const onAddSheduleClick = async (item: any) => {
        history.push(`/me/add-shedule-course/${item.id}`)
    }


    const approveStatus = async (item: any) => {

        let data = {
            status: "1"
        }

        let res = await UpdateCourseStatus(item.id, data)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            await loadData({});
            ToastSuccessMsg("Course Approved Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Course Approved faield ");
        }
    }

    useEffect(() => {

        (async () => {

            if (getLoggedUserRoles()?.includes('ADMIN')) {
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

            console.log('course', data.data);
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

    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Course Panel</Col>
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
                                            <Col lg={4} sm={12} ><strong>Course Name:</strong> {item.name}</Col>
                                            <Col lg={4} sm={12} ><strong>Status:</strong>
                                                {item.status === 0 && (<span style={{ color: 'blue' }} > Pending</span>)}
                                                {item.status === 1 && (<span style={{ color: 'green' }}> Approved</span>)}
                                            </Col>
                                            <Col lg={4} sm={12} ><strong>Price:</strong> {item.price}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}><strong>Start Date :</strong> {item.start_date}</Col>
                                            <Col lg={4} sm={12}><strong>End Date :</strong> {item.end_date}</Col>
                                            <Col lg={4} sm={12}><strong>Total Duration:</strong> {item.total_duration}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}><strong>Minimum Participant :</strong> {item.minimum_participant}</Col>
                                            <Col lg={4} sm={12}><strong>Maximum Participant :</strong> {item.maximum_participant}</Col>
                                            <Col lg={4} sm={12}><strong>Total Enrolled:</strong> {item.total_enrolled}</Col>
                                        </Row>
                                        <Row className="text-capitalize mt-1">
                                            <Col lg={4} sm={12}>
                                                <img style={{ width: "20%", marginRight: "10px" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.course_photo1} alt="img" />
                                                <img style={{ width: "20%", marginRight: "10px" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.course_photo2} alt="img" />
                                            </Col>
                                        </Row>
                                        <Row className="text-capitalize mt-3">
                                            {getLoggedUserRoles()?.includes('ADMIN') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary"
                                                        onClick={(event => approveStatus(item))}> Approve Course </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                    
                                                    {/* <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddSheduleClick(item))}> Add Shedule </Button> */}
                                                </Col> : ''
                                            }
                                            {getLoggedUserRoles()?.includes('TEACHER') ?
                                                <Col className="d-flex justify-content-between">
                                                    <Button className="shadow-none" size="sm" variant="danger" onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClickEnrolStudent(item))}> View Enrol student </Button> {' '}
                                                    <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onOpenClick(item))}> Details </Button> {' '}
                                                    {/* <Button className="shadow-none" size="sm" variant="primary" onClick={(event => onAddSheduleClick(item))}> Add Shedule </Button> */}
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

        </div>
    )
};
