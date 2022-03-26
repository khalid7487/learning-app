import React, { ReactElement, useEffect, useState } from "react";
import BottomNav from "../common/BottomNav.page";
import Footer from "../common/Footer.page";
import TopNav from "../common/TopNav.page";
import english from "../icons/education.jpg";
import profile from "../icons/profile.jpg";
import location from "../icons/location1.png";
import book from "../icons/book.png";
import chat from "../icons/chat.png";
import free from "../icons/free1.png";
import chat4 from "../icons/chat4.png";
import arrow from "../icons/arrow.png";
// @ts-ignore  
import video from "../icons/video/video1.mp4";
import { Card, Col, Row, Image } from "react-bootstrap";

interface Props {
  // imagePath: any,
  // defaultImage: any
}

export default function ContactPage({}: Props): ReactElement {
  return (
    <div>
      <TopNav />
      <div>
        <Card className="mx-2 mb-3">
          <Card.Img src={english} style={{ width: "100%" }} />

          <Card.Body>
            <Row>
              <Col
                style={{ marginTop: "-70px" }}
                className="d-flex justify-content-center "
              >
                <Image
                  src={profile}
                  roundedCircle
                  style={{ width: "200px", height: "200px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center ">Rakib</Col>
            </Row>
            <Row className="d-flex justify-content-center mt-2 ">
              <span className="bg-primary p-2 text-white rounded mr-2">
                7 days free trial
              </span>
              <span className="bg-primary p-2 text-white rounded ">Chat</span>
            </Row>
            <Row className="d-flex justify-content-center mt-2 ">
              <span className="bg-light p-2 rounded-pill ">Bangladesh</span>
            </Row>
            <Row className="mt-3">
              <span className="mx-2">
                <Image
                  src={location}
                  style={{ width: "20px", height: "20px" }}
                />
              </span>
              <span>From Dhaka</span>
            </Row>
            <Row className="mt-1">
              <span className="mx-2">
                <Image src={chat} style={{ width: "20px", height: "20px" }} />
              </span>
              <span>
                Speaks Bangali{" "}
                <span className="text-primary font-weight-bold">Native</span>{" "}
                Dhaka <span className="text-success font-weight-bold">C2 </span>
                English{" "}
                <span className="text-warning font-weight-bold">B1</span>
              </span>
            </Row>
            <Row className="mt-1">
              <span className="mx-2">
                <Image src={book} style={{ width: "20px", height: "20px" }} />
              </span>
              <span>2 Lessons</span>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mx-2 my-3">
          <Card.Body>
            <Row>
              <Col>VIDEO</Col>
            </Row>
            <Row>
              <Col className="mt-3">
                <video
                  controls
                  src={video}
                  style={{ width: "100%", height: "250px" }}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mx-2 my-3">
          <Card.Body>
            <Row>
              <Col className="font-weight-bold">25 MINUTES</Col>
            </Row>
            <Row className="d-flex justify-content-between p-3">
              <span>Language</span>
              <span>English</span>
            </Row>
            <Row className="d-flex bg-primary justify-content-center p-3 m-2 rounded ">
              <span>
                <Image src={free} style={{ width: "25px", height: "25px" }} />
              </span>
              <span className="text-white font-weight-bold">
                7 days free trial
              </span>
            </Row>
            <Row className="d-flex bg-primary justify-content-center p-3 m-2 rounded ">
              <span>
                <Image src={chat4} style={{ width: "25px", height: "25px" }} />
              </span>
              <span className="text-white font-weight-bold ml-1">Chat</span>
            </Row>

            <Row className="mt-4">
              <Col>New Customers are eligible for 7 days free trial</Col>
            </Row>

            <Row className="d-flex justify-content-between p-3 mb-4">
              <span>1 Lesson</span>
              <span>$14/mo</span>
            </Row>
            <Row className="d-flex justify-content-between p-3 mb-4">
              <span>4 Lessons</span>
              <span>$49/mo</span>
            </Row>
            <Row className="d-flex justify-content-between p-3 mb-4">
              <span>8 Lessons</span>
              <span>$89/mo</span>
            </Row>
            <Row className="d-flex justify-content-between p-3 ">
              <span>16 Lessons</span>
              <span>$159/mo</span>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mx-2 my-3">
        <Card.Body>
          <Row className="d-flex justify-content-between p-3">
            <span>ABOUT ME</span>
            <span>
                <Image src={arrow} style={{ width: "25px", height: "25px" }} />
              </span>

          </Row>
          {/* <details className="outline-none">
            <summary  >About Me </summary>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nesciunt enim voluptate debitis. Corporis blanditiis possimus architecto, quo quis vel pariatur excepturi similique officia non eius ipsam eveniet odit rem!</p>
          </details> */}
        </Card.Body>


        </Card>






        <Card className="mx-2 my-3">
          <Card.Body>
            <Card.Title>How do I cancel a lesson?</Card.Title>
            <Card.Text>
              You can cancel a lesson up to 12 hours ahead of booked time
            </Card.Text>
          </Card.Body>
        </Card>

        {/* <Card className="mx-2 my-3">
          <Card.Body>
            <Card.Title>How do I cancel a lesson?</Card.Title>
            <Card.Text>
              You can cancel a lesson up to 12 hours ahead of booked time
            </Card.Text>
          </Card.Body>
        </Card> */}
        <Card className="mx-2 my-3">
          <Card.Body>
            <Card.Title>What payment methods can I use?</Card.Title>
            <Card.Text>
              You can Visa, MasterCard, and American Express.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="mx-2 my-3">
          <Card.Body>
            <Card.Title>Is the lesson online?</Card.Title>
            <Card.Text>
              We use ZOOM for classes. You can enter the class 5 minutes ahead of booked time. Go to "Dashboard".Click on 
              "View" and click on "Join". You will enter the classroom on ZOOM.*
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
}
