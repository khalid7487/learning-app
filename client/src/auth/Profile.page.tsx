import React, { ReactElement, RefAttributes, useEffect, useState } from "react";
import { Button, Card, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import { getUser, getUserById, updateImageUser, updateUser } from "./auth.service";
import { decodeToken } from "../common/http";
import ImagePreview from "../common/Image.preview";
import { ToastSuccessMsg } from "../common/toast";

import pp from "../icons/profile-img.png";
import EditImagePreview from "../common/EditImage.preview";

export default function ProfilePage({ }: any): ReactElement {

    let [id, setId]: any = useState({});
    let [user, setUser]: any = useState({});
    const [toggleVarification, setToggleVarification] = useState("");
    let varificatonType = ['NID', 'Passport']

    useEffect(() => {
        (async () => {
            await loadUserId();
            await loadUserDetails(id);
        })();

    }, [id])


    const loadUserId = async () => {

        let res = await getUser()
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setId(data?.id)
            console.log('getUserById', data.id)
        }
    }

    const loadUserDetails = async (id: any) => {

        let res = await getUserById(id)
        if (res.status === 200 || res.status === 201) {
            let data = await res.json()
            setUser(data)
            console.log(data)
        } else {
            //let error = await res.json()
        }
    }



    const [formData, setFormData]: any = useState(user)

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onInputFileChange = (e: any) => {

        console.log('Name', `${e.target.name}`);
        console.log('File', `${e.target.files[0]}`);

        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        })


        console.log('formData', formData);

    }

    const onUploadAction = async (e: any) => {

        let data = new FormData();

        data.append('firstname', user.firstname)
        data.append('lastname', user.lastname)
        data.append('dateOfbirth', user.dateOfbirth)
        data.append('address', user.address)
        data.append('user_type', user.user_type)
        data.append('latitude', user.latitude)
        data.append('longitude', user.longitude)
        data.append('nid_no', user.nid_no)
        data.append('passport_no', user.passport_no)
        data.append('short_bio', user.short_bio)
        data.append('bio', user.bio)
        data.append('nid_front', formData.nid_front ? formData.nid_front : user?.identity?.nid_front);
        data.append('nid_back', formData.nid_back ? formData.nid_back : user?.identity?.nid_back);
        data.append('passport_front', formData.passport_front ? formData.passport_front : user?.identity?.passport_front);
        data.append('passport_back', formData.passport_back ? formData.passport_back : user?.identity?.passport_back);
        // data.append('vehicle_licence_back', formData.vehicle_licence_back ? formData.vehicle_licence_back : vehicle.vehicle_licence_back);

        console.log("data", data)

        const res = await updateUser(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Successfully");
        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }

    }


    const updateImage = async (e: any) => {
        let data = new FormData();
        data.append('profile_image', formData.profile_image ? formData.profile_image : user.profile_image)

        // console.log("data", data)

        const res = await updateImageUser(id, data)
        if (res.ok) {
            const result = await res.json()
            console.log('msg', data);
            ToastSuccessMsg("Update Successfully");
        } else if (res.status === 401) {
            alert("failed")
        } else {
            alert("Error submitting form!");
        }
    }

    const previewImage = (file: RefAttributes<HTMLImageElement>) => {
        if (file) return URL.createObjectURL(file)
        return pp;
    }

    let [userType, setUserType]: any = useState([
        { name: 'Physical', value: 0 },
        { name: 'Virtual', value: 1 }
    ]);

    return (

        <div className="mt-4 d-flex justify-content-center container-fluid">

            {user &&
                <Card style={{ width: '40rem' }}>
                    <Card.Header>
                        <Row>
                            <Col>Update Your Profile</Col>
                            {/* <Col> User Name: {user.firstname} - UserId: {user.id}</Col> */}
                            <Col>
                                {/*<Button className="float-right" size="sm"> Add New</Button>*/}
                            </Col>
                        </Row>
                    </Card.Header>

                    <Card.Body>

                        <Form>

                            <Col lg={4} sm={12}>
                                <EditImagePreview imagePath={user.profile_image} inputName="profile_image" onInputFileChange={onInputFileChange} updateImage={updateImage} />
                                {/* <ImagePreview imagePath={user.profile_image} inputName="profile_image" onInputFileChange={onInputFileChange} /> */}
                                {/* <Form.Group className="">
                                    <label htmlFor="upload">
                                        <Image style={{ height: '150px', width: '150px' }} src={previewImage(user.profile_image ? user.profile_image : formData.profile_image)} roundedCircle /><br />
                                        <input id="upload" style={{ display: 'none' }} className="mt-1" type="file" name="profile_image" accept="image/*" onChange={onInputFileChange} />
                                        <div style={{ marginTop: '-40px', color: '#ffffff' }} className="text-center">Upload Profile</div>
                                    </label>
                                </Form.Group> */}
                                <Button className="mt-3 mb-3 shadow-none" type="button" size="sm" onClick={updateImage}> Update Profile Image </Button>
                            </Col>

                            <Row>
                                <Col lg={6}>

                                    <Form.Group >
                                        <Form.Label > First Name</Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="firstname" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={user.firstname}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label > Date of Birth </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="date" name="dateOfbirth" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={user.dateOfbirth}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Label > Tutor Type </Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="select" className="shadow-none" type="text" name="user_type" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={onInputChange}>
                                            <option>
                                                {user.user_type == 0 && 'Physical'}
                                                {user.user_type == 1 && 'Virtual'}
                                            </option>
                                            {userType.map((user_type: any, index: number) =>
                                                <option value={user_type.value} key={index}>{user_type.name}</option>
                                            )}
                                        </FormControl>
                                    </InputGroup>


                                    <Form.Label >Please Select Verification*</Form.Label>
                                    <InputGroup size="sm" className="mb-3">
                                        <FormControl as="select" className="shadow-none" type="text" name="ac_type" aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={(e) => {
                                                const selectedData = e.target.value;
                                                setToggleVarification(selectedData);
                                            }}>
                                            <option>Select Verification Type</option>
                                            {varificatonType.map((verification_type: any, index: number) =>
                                                <option value={verification_type} key={index}>{verification_type}</option>
                                            )}
                                        </FormControl>
                                    </InputGroup>



                                </Col>

                                <Col lg={6}>

                                    <Form.Group >
                                        <Form.Label > Last Name </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="lastname" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={user.lastname}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Label > Address </Form.Label>
                                        <InputGroup size="sm" className="mb-3">
                                            <FormControl className="shadow-none" type="text" name="address" aria-label="Small"
                                                aria-describedby="inputGroup-sizing-sm"
                                                defaultValue={user.address}
                                                onChange={onInputChange} />
                                        </InputGroup>
                                    </Form.Group>


                                </Col>

                            </Row>

                            {
                                toggleVarification === "NID" ?
                                    <Card style={{ backgroundColor: '#F1EDED' }}>
                                        <Card.Body>
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Form.Label > NID Number* </Form.Label>
                                                        <InputGroup size="sm" className="mb-3">
                                                            <FormControl className="shadow-none" type="number" name="nid_no" aria-label="Small"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                defaultValue={user?.identity?.nid_no}
                                                                onChange={onInputChange} />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Label >Please Upload NID Photo Front And Back( If you have any)</Form.Label>
                                            <Form.Group as={Row}>
                                                <Col lg={6} sm={12} className="mb-3">
                                                    <ImagePreview imagePath={user?.identity?.nid_front} inputName="nid_front" onInputFileChange={onInputFileChange} />
                                                </Col>
                                                <Col lg={6} sm={12} >
                                                    <ImagePreview imagePath={user?.identity?.nid_back} inputName="nid_back" onInputFileChange={onInputFileChange} />
                                                </Col>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                    : ' '

                            }

                            {
                                toggleVarification === "Passport" ?
                                    <Card style={{ backgroundColor: '#F1EDED' }}>
                                        <Card.Body>
                                            <Row>
                                                <Col lg={6}>
                                                    <Form.Group >
                                                        <Form.Label > Passport No* </Form.Label>
                                                        <InputGroup size="sm" className="mb-3">
                                                            <FormControl className="shadow-none" type="number" name="passport_no" aria-label="Small"
                                                                aria-describedby="inputGroup-sizing-sm"
                                                                defaultValue={user?.identity?.passport_no}
                                                                onChange={onInputChange} />
                                                        </InputGroup>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Label >Please Upload Passport Photo  ( If you have any)</Form.Label>
                                            <Form.Group as={Row}>
                                                <Col lg={4} sm={12} className="mb-3">
                                                    <ImagePreview imagePath={user?.identity?.passport_front} inputName="passport_front" onInputFileChange={onInputFileChange} />
                                                </Col>
                                                {/* <Col lg={4} sm={12} >
                                              <ImagePreview imagePath={user?.identity?.passport_back} inputName="passport_back" onInputFileChange={onInputFileChange} />
                                                </Col> */}
                                            </Form.Group>
                                        </Card.Body>
                                    </Card> : ' '

                            }

                            <div className="float-right">
                                <Button type="button" size="sm" className="mt-2 shadow-none" onClick={onUploadAction}> Update </Button>
                            </div>

                        </Form>

                    </Card.Body>

                </Card>
            }
        </div>


    )
};