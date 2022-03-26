import React, { ReactElement, useEffect, useState } from "react";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import TopNav from "../common/TopNav.page";
import back from "../icons/back.png";
import Essential from "./Essential.page";
import Learner from "./Learner.page";
import { Card, Col, Row } from "react-bootstrap";

interface Props {
  // imagePath: any,
  // defaultImage: any
}

export default function AboutPage({}: Props): ReactElement {
  const academic = [
    {
      heading: "Listening",
      Question: "Question: 40",
      sections: "Sections: 4",
      time: "Time: 30min",
      bgcolor: "#2266FF",
    },
    {
      heading: "Reading",
      Question: "Question:40",
      sections: "Sections:3",
      time: "Time: 60min",
      bgcolor: "#44CCFF",
    },
    {
      heading: "Writing",
      Question: "Question: 2",
      task1: "Task 1: 20min",
      task2: "Task 2: 40min",
      time: "Time: 20+40=60min",
      bgcolor: "#33AAFF",
    },
    {
      heading: "Speaking",
      part: "Part-3",
      time: "Time: 11-14min",
      bgcolor: "#99A0FF",
    },
  ];
  return (
    <div>
      <TopNav />
      <div>
        <div>
          <img src={back} alt="back" className="ml-2" />
          <span className="font-weight-bold">IELTS Academic</span>
        </div>

        {academic.map((item, index) => (
          <Card
            style={{ background: item.bgcolor }}
            className="m-3 text-white shadow"
          >
            <Card.Body>
              <Row>
                <Col>
                  <Row>
                    <Col className="display-4 ">{item.heading}</Col>
                  </Row>
                  <Row className="float-right  ">
                    <Col>
                      <Row>
                        <Col>{item.Question}</Col>
                      </Row>
                      <Row>
                        <Col>{item.sections}</Col>
                      </Row>
                      <Row>
                        <Col>{item.task1}</Col>
                      </Row>
                      <Row>
                        <Col>{item.task2}</Col>
                      </Row>
                      <Row>
                        <Col>{item.part}</Col>
                      </Row>
                      <Row>
                        <Col>{item.time}</Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Essential/>
      <Learner/>
      <Footer />
      <BottomNav />
    </div>
  );
}
