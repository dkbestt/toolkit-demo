import React, { useState } from 'react'

const Contact = () => {
    const [photoURL, setPhotoURL] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)

    const handleEditclick = () => {
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = "image/*"
        input.onchange = _ => {
            let files = input.files
            handleChange(files)
        };
        input.click()
    }
    const handleChange = (e) => {
        const file = e.target.files[0];
        const ul = URL.createObjectURL(file)
        setPhotoURL(ul)
        setOpenCrop(true)
    }

    return (

        <form  >
            <label className='text-center'>YOUR PROBLEM</label>
            <div className='border'>
                <textarea name="conatc_detail" className='border' rows={10} cols={60} placeholder="Wirte here..."></textarea>
                <div>
                    <span>   Add Screenshot</span>  <div className="upload-wapper">

                        <i className="fa fa-upload" onClick={handleEditclick}></i>
                    </div>
                </div>

            </div>
            <div className='text-center absolute bottom-1 right-0 bg-[#629db1] text-white p-1 rounded hover:text-black' >
                <button
                    type="submit"
                    className='bg-[#]'
                >
                    Report
                </button>
            </div>
        </form>
    )
}

export default Contact