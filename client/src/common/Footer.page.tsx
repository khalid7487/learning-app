import React, {ReactElement} from 'react'
import {useHistory} from 'react-router-dom'
import fb from '../icons/facebook.png';
import messenger from '../icons/messenger.png';
import insta from '../icons/Instagram.png';
import linkedin from '../icons/linkedin.png';
import youtube from '../icons/youTube.png';
import tweet from '../icons/tweet.png';
import phone from '../icons/phone.png';
import message from '../icons/message.png';
import {Col, Row} from 'react-bootstrap';


interface Props {

}

export default function Footer({}: Props): ReactElement {
    const history = useHistory()


    return (
        <div className="mt-5 mb-5 container-fluid border-top">

            <Row className="mt-5">
                <Col className="mb-4" xs={12} md={3}>
                    <strong className="mb-4">Company</strong>
                    <div>About Us</div>
                </Col>
                <Col className="mb-4" xs={12} md={3}>
                    <strong className="mb-4">Help</strong>
                    <div>FQA</div>
                    <div>Privacy Policy</div>
                    <div>Payment</div>
                </Col>
                <Col className="mb-4" xs={12} md={3}>
                    <strong className="mb-4">Terms and Conditions</strong>
                    <div>General</div>
                    <div>For Driver</div>
                    <div>For User</div>
                </Col>
                <Col className="mb-4" xs={12} md={3}>
                    <strong className="mb-4">Contact Us</strong>
                    <div>
                        <img style={{height: '20px'}} src={message} alt="email"/> Email: askrental@gmail.com
                    </div>
                    <div><img style={{height: '20px'}} src={phone} alt="phone"/> Phone: 01948-344664</div>
                    <div className="mt-3">Connect with us</div>
                    <div className="d-flex justify-content-around">
                        <img src={fb} alt="facebook"/>
                        <img src={messenger} alt="messenger"/>
                        <img src={insta} alt="insta"/>
                        <img src={linkedin} alt="linkedin"/>
                        <img src={youtube} alt="youtube"/>
                        <img src={tweet} alt="tweet"/>
                    </div>
                </Col>

            </Row>
            <Row className="mb-5 text-center">
                <span className="mb-4">Copyright &copy; Rental App. All rights reserved</span>
            </Row>
        </div>
    )
}
