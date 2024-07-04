import React, { useState } from 'react'

// Custom Imports
import CropEasy from '../../components/CropImage/CropImage'
import Image1 from '../../assets/images/1.jpg'
import Image from '../../assets/images/about.jpg'
import { useDispatch, useSelector } from 'react-redux'
import apiService from '../../services/apiService'
import { addCreatePostData } from '../../store/reducers/postSlice'

const CreateMoment = () => {
  const { data } = JSON.parse(localStorage.getItem("user"))
  const [photoURL, setPhotoURL] = useState(null)
  const [openCrop, setOpenCrop] = useState(false)
  const [filedata, setFile] = useState(null)
  const [zoom, setZoom] = useState(1)
  const dispatch = useDispatch()
  const { post_media } = useSelector((state) => ({ ...state.post }))

  const handleChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setFile(reader.result);
    };
    if (file) {
      const data = {
        file: e.target.files[0],
        thumb: e.target.files[0],
        type: "image"
      }
      // dispatch(addCreatePostData(data))
      const ul = URL.createObjectURL(file)
      setPhotoURL(ul)
      setOpenCrop(true)
    }
  }

  const createPost = () => {

    const post_data = {
      file: filedata
    }
    const data = {
      type: 'simple',
      contents: [post_data]
    }
    console.log(data)
    apiService.CreatePost(data).then((res) => {
      if (res.success === 1) {
        window.location.reload()
        // setIsLoaded(1)
      } else {
        // setIsLoaded(1)
      }
    })
  }

  const handleEditclick = () => {
    let input = document.createElement('input')
    input.type = 'file'
    input.accept = "image/*"
    // input.id = "profilePhoto"
    // input.onchange = _ => {
    //   let files = Array.from(input.files)
    //   handleChange(files)
    // };
    input.onchange = _ => {
      let files = input.files
      handleChange(files)
    };
    // input.onchange={handleChange(e)}
    input.click()
  }
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData();
    formData.append('file', filedata);
    const post_data = {
      file: filedata  
    }
    const data = {
      type: 'simple',
      contents: [post_data]
    }
    console.log(data);
    apiService.CreatePost(data).then((res) => {
      if (res.success === 1) {
        window.location.reload()
      } else {
      }
    })
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // };
    // axios.post(url, formData, config).then((response) => {
    //   console.log(response.data);
    // });
  }
  return (
    <>
      <h2 className="modal-title text-center mb-4">Create Moments</h2>
      <div className="modal-body">
        <div className="post-top">
          <div className="post_profile"><img src={data?.user.profile_image} alt="" /></div>
          <div className="post_name">
            <h3>{data?.user.u_name}</h3>
            {/* <div className="custome_select">
              <div className="input_select">Public</div>
              <ul className="custome_ul">
                <li>Public</li>
                <li>Me</li>
                <li>My friends</li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className="image-crop">
          {photoURL && <div className="imageBox">
            <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile, filedata }} />
          </div>}
          <div className="tools">
            {/* <span id="rotateLeft"><i className="fa fa-undo"></i></span>
            <span id="rotateRight"><i className="fa fa-repeat"></i></span>
            <span id="zoomOut"><i className="fa fa-search-plus"></i></span>
            <span id="zoomIn"><i className="fa fa-search-minus"></i></span> */}
            <div className="upload-wapper">
              <i className="fa fa-upload" onClick={handleEditclick}></i>
              <div className="App">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <input type="file" onChange={handleChange} />
                  <button type="submit">Upload</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ul className="modal-option">
          <li><a href="#" data-toggle="modal" data-target="#exampleModalfriend"><i
            className="fa fa-tag"></i> Add People <span><i className="fa fa-angle-right"></i></span></a></li>
          <li><a href="#" data-toggle="modal" data-target="#exampleModalLocation"><i
            className="fa fas fa-map-marker-alt"></i> Add Location <span><i className="fa fa-angle-right"></i></span></a></li>
          <li><a href="#"><i className="fa fa-commenting"></i> Turn off Commenting</a>
            <span className="ios-toggle"><input type="checkbox" name="include-forks" id="include-forks" /><label
              htmlFor="include-forks"></label></span>
          </li>
        </ul>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary button-effect btn-sm" data-dismiss="modal" onClick={createPost}>Post</button>
      </div>
    </>
  )
}

export default CreateMoment