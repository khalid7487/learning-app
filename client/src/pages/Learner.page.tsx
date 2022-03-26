import { Card, Col, Row, InputGroup, FormControl } from "react-bootstrap";
import React, { ReactElement, useEffect, useState } from "react";
import notification from "../icons/notification3.png";
import english from "../icons/education.jpg";
import education2 from "../icons/flag.jpg";
import menu from "../icons/menu.png";
import user from "../icons/user1.png";

interface Props {
  // imagePath: any,
  // defaultImage: any
}

export default function Essential({}: Props): ReactElement {
  const essential = [
    {
      code: "100/0",
      details: "IELTS English",
      image: english,
    },
    {
      code: "100/0",
      details: "IELTS - Acedemic | General",
      image: education2,
    },
  ];

  return (
    <div>
      <Row className="m-2">
        <Col className="font-weight-bold ">
          <h3>Learner</h3>
        </Col>
        <Row className="mr-2">
          <span className="p-1">
            {" "}
            <img
              src={notification}
              alt=""
              style={{ width: "1.5rem", height: "1.5rem" }}
            />
          </span>
          <span className="rounded-circle">
            {" "}
            <img src={user} alt="" style={{ width: "2rem", height: "2rem" }} />
          </span>
        </Row>
      </Row>
      <Row className="m-3">
        <InputGroup size="sm" className="mb-3">
          <FormControl
            className="shadow-none bg-primary "
            type="text"
            name="title"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search"
            // value={formData.title ? formData.title : ''}
            // onChange={onInputChange}
          />
        </InputGroup>
      </Row>
      {essential.map((item, index) => (
        <Card className="m-3 shadow">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <span className="text-success ">{item.code}</span>

              <span>{item.details}</span>
            </div>
            <Row>
              <Col>
                <img
                  src={item.image}
                  alt=""
                  style={{ width: "100%", height: "auto" }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
      <Row className="m-2">
        <Col><img src={menu} alt="" style={{ width: "2.5rem", height: "2.5rem" }}/></Col>
        <Row className="mr-2">
        <Col className="p-2 bg-primary text-white rounded-circle">T</Col>
        <Col className=" p-2 ml-2 rounded  bg-primary text-white">Teachers</Col>
      </Row>
      </Row>
     
    </div>
  );
}
