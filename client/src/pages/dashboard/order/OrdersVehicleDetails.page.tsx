import React, { ReactElement, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { getScriptById, getUserById } from "./order.service";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../vehicle/vehicle.service";
import DefaultImagePreview from "../../../common/DefaultImage.preview";
import car from "../../../icons/car.png";

export default function OrdersVehicleDetailsPage({ }: any): ReactElement {

    let { id }: any = useParams();
    let [vehicle, setVehile]: any = useState();


    useEffect(() => {
        (async () => {
            await loadScriptDetails(id);
        })();

    }, [id])


    const loadScriptDetails = async (id: any) => {
        let res = await getVehicleById(id);
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            console.log(data)
            setVehile(data)
        } else {
            //let error = await res.json()
        }
    }


    return (

        <div className="mt-4 container-fluid">

            {vehicle &&
                <Card>
                    <Card.Body>
                        <Row>
                            <Col>
                                <DefaultImagePreview imagePath={vehicle?.vehicle_photo1} defaultImage={car} />
                                {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle?.vehicle_photo1} alt="img" /> */}
                            </Col>
                            <Col>
                                <DefaultImagePreview imagePath={vehicle?.vehicle_photo2} defaultImage={car} />
                                {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle?.vehicle_photo1} alt="img" /> */}
                            </Col>
                            <Col>
                                <DefaultImagePreview imagePath={vehicle?.vehicle_photo3} defaultImage={car} />
                                {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle?.vehicle_photo1} alt="img" /> */}
                            </Col>
                            <Col>
                                <DefaultImagePreview imagePath={vehicle?.vehicle_photo4} defaultImage={car} />
                                {/* <img style={{ width: "100%" }} src={process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + item.vehicle?.vehicle_photo1} alt="img" /> */}
                            </Col>
                        </Row>
{/*     "vehicle_plate_no": "6😄😄😃🤣",
    "vehicle_model": "Bmw",
    "vehicle_color": "red", */}

                        <Row>
                            <Col><strong>Vehicle Plate No : </strong> {vehicle.vehicle_plate_no}</Col>
                        </Row>
                        <Row>
                            <Col><strong>Vehicle Model : </strong> {vehicle.vehicle_model}</Col>
                        </Row>
                        <Row>
                            <Col><strong>Vehicle Color : </strong> {vehicle.vehicle_color}</Col>
                        </Row>
                    </Card.Body>

                </Card>
            }
        </div>


    )
};