import React, {ReactElement, useEffect, useState} from "react";
import {Image} from "react-bootstrap";
// import defaultImage from '../icons/car.png';
import './slider.scss'

interface Props {
    imagePath: any,
    defaultImage: any
}

export default function CarouselImagePreview({ imagePath, defaultImage}: Props): ReactElement {

    let [imgSrc, setImgSrc]: any = useState();

    useEffect(() => {
        loadImage();
    }, [imagePath])

    const loadImage = () => {

        console.log('loadImage', imagePath);

        if (imagePath) {
            setImgSrc(`${process.env.REACT_APP_PUBLIC_CONTENT_URL + '/uploads/' + imagePath}`)
        } else {
            setImgSrc(defaultImage)
        }
    }

    return (
        <>
            <Image className=" d-block w-100 height" src={imgSrc} rounded/><br/>
        </>
    )
};