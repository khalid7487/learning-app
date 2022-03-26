import {ReactElement, useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {Button, Card, Table} from 'react-bootstrap';
import { store } from 'react-notifications-component';

import {getAllRoles} from "./auth.service";
import RolesEditModal from "./RolesEdit.modal";
import React from "react";

interface Props {

}

export default function RolesPage({}: Props): ReactElement {

    let {router}: any = useParams();
    let history = useHistory();

    let [roles, setRoles] : any = useState([]);
    let [selectedUser, setSelectedUser] : any = useState({});

    // modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (selectedUser: any) => {
        console.log('handleShow', selectedUser)
        setShow(true);
        setSelectedUser(selectedUser);
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/role/${item.id}`)
    }

    const handleChange = (selectedChoice: any) => {
        console.log('handleChange', selectedChoice);
    }

    const handleDeleteChange = () => {

        store.addNotification({
            title: "Wonderful!",
            message: "teodosii@react-notifications-component",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }

    useEffect( () => {

        let isMounted = true;

        (async () => {

            let res = await getAllRoles()
            if (res.status === 200 || res.status === 201) {
                let data = await res.json()

                console.log('msg', data);
                if (isMounted) setRoles(data)

            } else {
                //let error = await res.json()
            }
        })()

        return () => { isMounted = false };
    }, [])

    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header> Roles Panel </Card.Header>
                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}
                    <Table responsive borderless size="sm">
                        <thead>
                        <tr style={{background: "#bebebe"}}>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {roles?.map((role: any, index: number) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{role.name}</td>
                                <td>{role.description}</td>
                                <td>
                                    <Button size="sm" variant="danger" onClick={handleDeleteChange}> Delete </Button> {' '}
                                    <Button size="sm" variant="primary" onClick={event => onOpenClick(role)} > Details </Button> {' '}
                                </td>
                                <td>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <RolesEditModal role={selectedUser} show={show} handleClose={handleClose}/>
        </div>
    )
};