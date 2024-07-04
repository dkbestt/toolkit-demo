import React from 'react'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { Crop } from '@mui/icons-material'
import Image from '../../assets/images/landing_logo.png'
import DialogBox from '../DialogBox/DialogBox'
import CropEasy from '../CropImage'

const ProfileEdit = () => {
    const [file, setFile] = useState(null)
    const [photoURL, setPhotoURL] = useState(Image)
    const [openCrop, setOpenCrop] = useState(false)
    const setIsOpen = true;
    const handleChange = (e) => {
        const file = e[0];
        if (file) {
            setFile(file)
            const ul = URL.createObjectURL(file)
            setPhotoURL(ul)
            // setOpenCrop(true)
        }
    };
    const handleEditclick = () => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = "image/*"
        input.id = "profilePhoto"
        input.onchange = _ => {
            let files = Array.from(input.files)
            handleChange(files)
        };
        input.click()
    };
    return !openCrop ? (
        <>
            <div className=''>
                <div className="relative edit-photo">
                    <div className=" rounded-full bg-[#619CB0] profile-photo">
                        <img src={photoURL} className=" rounded-full bg-[#619CB0]" alt="" />
                    </div>
                    <span className="" onClick={handleEditclick}>
                        <div className='file-input'>
                            <i className="fa fa-pencil"></i>
                        </div>
                    </span>
                </div>
                {/* {file && (
                    <IconButton
                        aria-label="Crop"
                        color="primary"
                        onClick={() => setOpenCrop(true)}>
                        <Crop />
                    </IconButton>
                )} */}
            </div>
        </>
    ) : (
        <>
            <DialogBox openModal={true} >
                <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
            </DialogBox>
        </>
    )
}
export default ProfileEdit;