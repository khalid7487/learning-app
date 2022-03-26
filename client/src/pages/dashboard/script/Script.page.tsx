import React, {ReactElement, useEffect, useState} from "react";
import {Button, Card, Col, Row, Table} from 'react-bootstrap';
import {create, deleteItemById, download, gets, update} from "./script.service";
import EditModal from "./Edit.modal";
import CreateModal from "./Create.modal";
import {ToastFailedMsg, ToastSuccessMsg, ToastWarningMsg} from "../../../common/toast";
import {useHistory} from "react-router-dom";


interface Props {

}

export default function ScriptPage({}: Props): ReactElement {
    let history = useHistory();

    let [response, setResponse]: any = useState([]);

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


    const choices = [
        {value: "item 1", label: "item1"},
        {value: "item 2", label: "item2"},
        {value: "item 3", label: "item3"}
    ];

    const handleChange = (selectedChoice: any) => {
        console.log('handleChange', selectedChoice);
    }

    const onDeleteClick = async (item: any) => {
        let res = await deleteItemById(item.id)
        if (res.status === 200 || res.status === 201) {
            let {data} = await res.json()
            await loadData();
            ToastSuccessMsg("Deleted Successfully");
        } else {
            //let error = await res.json()
            ToastFailedMsg("Failed to Delete");
        }
    }

    const onOpenClick = async (item: any) => {
        history.push(`/me/script/${item.id}`)
    }

    const onDownloadClick = async (item: any) => {
        // console.log('script', item.description);
        //todo:// need to create e pdf using this description

        let res = await download(
            {
                html: item.description,
                prefix: "short_list_document"
            }
        )
        if (res.status === 200 || res.status === 201) {
            let result = await res.blob()

            // console.log('msg', result.file_name);

            let file = new Blob([result], {type: 'application/pdf'});
            let fileURL = URL.createObjectURL(file);
            window.open(fileURL);


            // window.open("/me/script" + result.file_name);
            // let pdf = new jsPDF('p', 'pt');
            // pdf.addFileToVFS('Nikosh.ttf', base64Jspdf());
            // pdf.addFont("Nikosh.ttf", "Nikosh", "normal");
            // pdf.setFont("Nikosh");
            // pdf.setFontSize(28);
            // pdf.text(result, 20, 20);
            // pdf.save('demo.pdf')

            // let parser = new DOMParser();
            // let doc:any = parser.parseFromString(result, 'text/html');
            // console.log('msg', doc);
            // window.open("http://localhost:3000/me/script/" + result);
        } else {
            //let error = await res.json()
        }


    }

    useEffect(() => {

        // let isMounted = true;

        (async () => {
            await loadData();
        })()

        // return () => {
        //     isMounted = false
        // };
    }, [])

    const loadData = async () => {
        let res = await gets()
        if (res.status === 200 || res.status === 201) {
            let {data} = await res.json()

            // //console.log('msg', data);
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

        await loadData();
    }


    return (
        <div className="mt-4 container-fluid">

            <Card>
                <Card.Header>
                    <Row>
                        <Col>Script Panel</Col>
                        <Col>
                            <Button className="float-right" size="sm" onClick={() => handleCreateClick()}> Add
                                New</Button>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}
                    <Table responsive borderless size="sm">
                        <thead>
                        <tr style={{background: "#bebebe"}}>
                            <th>Sits</th>
                            <th>Status</th>
                            <th>Model</th>
                            <th>Plate No</th>
                            <th>Lincence No</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>

                        {response?.map((item: any, index: number) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.domain}</td>
                                {/*<td>{item.description}</td>*/}
                                <td>
                                    <Button className="shadow-none" size="sm" variant="danger"
                                            onClick={(event => onDeleteClick(item))}> Delete </Button> {' '}
                                    <Button className="shadow-none" size="sm" variant="secondary"
                                            onClick={() => handleEditModalClick(item)}> Edit </Button> {' '}
                                    <Button className="shadow-none" size="sm" variant="warning"
                                            onClick={(event => onDownloadClick(item))}> Download </Button> {' '}
                                    <Button className="shadow-none" size="sm" variant="primary"
                                            onClick={(event => onOpenClick(item))}> Open </Button> {' '}
                                </td>
                                <td>

                                </td>
                            </tr>
                        )}


                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <EditModal selectedItem={selectedEditItem} onFormSubmit={onEditFormSubmit} show={showEditModal}
                       handleClose={handleEditModalClose}/>
            <CreateModal onFormSubmit={onFormSubmit} show={showCreateModal} handleClose={handleCreateModalClose}/>
        </div>
    )
};
