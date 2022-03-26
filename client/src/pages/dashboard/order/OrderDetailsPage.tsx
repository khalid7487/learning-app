import React, {ReactElement, useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {getScriptById, getUserById} from "./order.service";
import {useParams} from "react-router-dom";


export default function OrderDetailsPage({}: any): ReactElement {

    let {id}: any = useParams();
    let [user, setUser]: any = useState();


    useEffect(() => {
        (async () => {
            await loadScriptDetails(id);
        })();

    }, [id])


    const loadScriptDetails = async (id: any) => {
        let res = await getUserById(id);
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log(data)
            setUser(data)
        } else {
            //let error = await res.json()
        }
    }


    return (

        <div className="mt-4 container-fluid">

            {user &&
            <Card>
                {/* <Card.Header>
                    <Row>
                        <Col> user Name: {user.firstname} - userId: {user.id}</Col>
                    </Row>
                </Card.Header> */}

                <Card.Body>
                     <Row>
                         <Col><strong>Full Name: </strong> {user.firstname} {user.lastname}</Col>
                     </Row>
                     <Row>
                         <Col><strong>Phone : </strong> {user.phone}</Col>
                     </Row>
                </Card.Body>

            </Card>
            }
        </div>


    )
};