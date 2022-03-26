import React, {ReactElement, useEffect, useState} from "react";
import {Image} from "react-bootstrap";
import defaultImage from '../icons/nid.png';

interface Props {
    inputName: any,
    imagePath: any,
    onInputFileChange: any,
}

export default function ImagePreview({inputName, imagePath, onInputFileChange}: Props): ReactElement {
    //let {collectionId}: any = useParams();
    //const [formData, setFormData]: any = useState({})
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

    const onInputFileChangeLocal = (e: any) => {

        const file = e.target.files[0]
        if (file) {
            setImgSrc(URL.createObjectURL(file))
        }

        onInputFileChange(e) // pass the event
    }

    return (
        <>
            <Image style={{height: '100px', width: '150px'}} src={imgSrc} rounded /><br/>
            <input className="mt-1" type="file" name={inputName} accept="image/*" onChange={onInputFileChangeLocal}/>
        </>
    )
};