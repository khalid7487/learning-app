import React, { ReactElement, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import defaultImage from '../icons/profile-img.png';
import camera from '../icons/camera.png'

interface Props {
    inputName: any,
    imagePath: any,
    onInputFileChange: any,
    updateImage: any
}

export default function EditImagePreview({ inputName, imagePath, onInputFileChange, updateImage }: Props): ReactElement {
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
        <label style={{cursor: 'pointer' }} htmlFor="upload">
            <Image   style={{ height: '150px', width: '150px' }} src={imgSrc} roundedCircle /><br />
            <input id="upload" style={{ display: 'none' }} className="mt-1" type="file" name={inputName} accept="image/*" onChange={onInputFileChangeLocal} />
            <div style={{ marginTop: '-40px', marginLeft: '79%', color: '#ffffff'}}><img src={camera}/></div>

            {/* <Button className="mt-3 mb-3 shadow-none" type="button" size="sm" onClick={updateImage}> Update Profile Image </Button> */}
        </label>
    )
};