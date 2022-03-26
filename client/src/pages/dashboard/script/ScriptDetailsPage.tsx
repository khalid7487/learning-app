import React, {ReactElement, useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {getScriptById} from "./script.service";
import {useParams} from "react-router-dom";


// interface Props {
//     selectedItem: any,
//     show: boolean,
//     handleClose: any,
// }

export default function ScriptDetailsPage({}: any): ReactElement {

    let {id}: any = useParams();
    let [script, setScript]: any = useState([]);


    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadScriptDetails(id);
        })();

    }, [id])


    const loadScriptDetails = async (id: any) => {
        let res = await getScriptById(id)
        if (res.status === 200 || res.status === 201) {
            let {data} = await res.json()
            setScript(data)
        } else {
            //let error = await res.json()
        }
    }


    return (

        <div className="mt-4 container-fluid">

            {script &&
            <Card>
                <Card.Header>
                    <Row>
                        <Col> Script Name: {script.name} - ScriptId: {script.id}</Col>
                        <Col>
                            {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                            <div className="float-right">
                                Source: {script.sourceType} | Domain: {script.domain}
                            </div>
                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    {/*<Card.Title>Special title treatment</Card.Title>*/}
                    {/*{JSON.stringify(script)}*/}

                    <p>{script.description}</p>

                </Card.Body>
                <Card.Footer>
                    {script.sourceRef}
                </Card.Footer>
            </Card>
            }
        </div>


    )
};