import React, { ReactElement, useEffect, useState } from "react";
import { Button, Card, Col, Row, Table, Pagination, Form, InputGroup, FormControl } from 'react-bootstrap';
import { getCourseWiseStudentById, gets, update, UpdateCourseStatus } from "./Course.service";
import { useHistory, useParams } from "react-router-dom";
import { getLoggedUserId, getLoggedUserRoles } from "../../../common/http";


interface Props {

}

export default function EnrolStudentPage({ }: Props): ReactElement {
    let { id }: any = useParams();
    let [response, setResponse]: any = useState([]);

    const [filterQueries, setFilterQueries] = useState({
        page: 0,
        limit: '',
        id: '',
        //     userId: '',
        userId: getLoggedUserId(),
        vehicle_status: ''
    });

    // add new
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreateModalClose = () => setShowCreateModal(false);

    useEffect(() => {

        (async () => {
            loadData()
        })()
    }, [])


    const loadData = async () => {
        console.log("something", id)
        let res = await getCourseWiseStudentById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            // data.map((item:any ) =>(
                
            // ))
            console.log('course', data);
            // if (isMounted) setResponse(data)
            setResponse(data)
        } else {
            //let error = await res.json()
        }
    }

    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Enrol Student</Col>
                    </Row>
                </Card.Header>

            </Card>

            <Row>
                {response?.map((item: any, index: number) => (
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

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* <div className="d-flex justify-content-between mt-3">
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
            </div> */}

        </div>
    )
};
