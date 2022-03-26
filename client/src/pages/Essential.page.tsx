import React, { ReactElement, useEffect, useState } from "react";
import english from "../icons/education.jpg";
import education2 from "../icons/education2.jpg";
import promise from "../icons/promise.jpg";
import back from "../icons/back.png";

import { Card, Col, Row } from "react-bootstrap";

interface Props {
  // imagePath: any,
  // defaultImage: any
}

export default function Essential({}: Props): ReactElement {
    const essential=[
        {
            code:"100/0",
            details:"IELTS - General",
            image:english
        },
        {
            code:"100/0",
            details:"IELTS - Acedemic",
            image:education2
        },
        {
            code:"100/0",
            details:"English - Club",
            image:promise
        },
    
    ];
  
  return (
    <div>
         <div >
            <img src={back} alt="back" className="ml-2"/>
            <span className="font-weight-bold">IETLS Essential</span>
        </div>
        {essential.map((item,index)=>(
        <Card className="m-3 shadow">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <span className="text-success ">{item.code}</span>
                    
                    <span >{item.details}</span>
                </div>
                <Row>
                    <Col>
                    <img src={item.image} alt="" style={{width:"100%", height:"auto"}}/>
                    </Col>
                    </Row>
                
            </Card.Body>
        </Card>
        ))}
     
    </div>
  );
}
