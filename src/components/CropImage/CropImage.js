import React, { useState } from 'react'
import { Cancel } from '@mui/icons-material'
import CropIcon from '@mui/icons-material/Crop'
import {
  Box,
  Button,
  DialogContent
} from '@mui/material'
import Cropper from 'react-easy-crop'

//Custom Imports
import getCroppedImg from '../../utils/CropImageUtil'
import Image from '../../assets/images/landing_logo.png'

const CropEasy = ({ photoURL, setOpenCrop, setPhotoURL, setFile }) => {
  const [crop, setCrop] = useState({ x: 100, y: 100 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  };
  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      )
      setPhotoURL(url)
      setFile(file)
      setOpenCrop(false)
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <>
      <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: { sm: 400 },
        }}
      >
        <Cropper
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={0.75}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
          cropShape='rect'
          sx={{
            borderRadius: "50%",
            width: 50,
            height: 50,
            background: "red",
            display: "block"
          }}
        />
      </DialogContent>
      {/* <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
        <Box sx={{ width: '50%', mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation + '°'}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </Box>
        </Box>
          */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {/* <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={() => {
            setOpenCrop(false)
            setPhotoURL(Image)
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<CropIcon />}
          onClick={cropImage}
        >
          Save
        </Button> */}
      </Box>
      {/* </DialogActions>  */}
    </>
  )
}

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`
};
