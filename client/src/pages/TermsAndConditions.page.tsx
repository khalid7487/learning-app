import React, { ReactElement, useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import BottomNav from "../common/BottomNav.page";
import { ToastSuccessMsg } from "../common/toast";
import TopNav from "../common/TopNav.page";
import { getUserById, updateUser } from "../auth/auth.service";


import Footer from "../common/Footer.page";

import DefaultImagePreview from "../common/DefaultImage.preview";
import defaultImage from "../icons/d-background.jpg";

export default function TermsAndConditions({ }: any): ReactElement {

    let { id }: any = useParams();
    let [user, setUser]: any = useState({});

    useEffect(() => {
        console.log('msg', id);

        (async () => {
            await loadUserDetails(id);
        })();
    }, [id])

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




    return (
        <>
            <TopNav />
            <div>

            </div>
            <Footer />
            <BottomNav />
        </>

    )
};