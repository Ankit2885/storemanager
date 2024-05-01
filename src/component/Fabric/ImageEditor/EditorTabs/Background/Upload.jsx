import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { PiUpload } from 'react-icons/pi'
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import HoverVideoPlayer from "react-hover-video-player";
import { GiCheckMark } from 'react-icons/gi';
import { themeColor } from '../../../../Global/Global';
import SweetAlert from '../../../../CommonComponent/SweetAlert';
// import { fetchData, onUploadMedia } from '../../../../../Redux/Actions/commonActions';
// import { onDeleteUserMedia } from '../../../../../Redux/Actions/VideoActions';
// import SweetAlert from '../../../../CommonComponents/SweetAlert';
// import { themeColor } from '../../../../../Global/Global';

const Upload = ({ handleBackground, checkMedia, setCheckMedia, from }) => {
    const dispatch = useDispatch()
    let allowedExt = ['image/png', 'image/jpg', 'image/jpeg']
    const [percent, setPercent] = useState(0)
    const [loader, setLoader] = useState({
        fetch: false,
        upload: false
    })
    const [images, setImages] = useState([])
    const [videos, setVideos] = useState([])


    const [sweet, setSweet] = useState({
        enable: false,
        id: false,
        confirmButtonName: "Delete",
        type: ""
    })

    const handleDelete = (e, id, type) => {
        e.stopPropagation()
        setSweet({
            ...sweet,
            id: id,
            enable: true,
            type: type
        })
    }

    const onCancelDelete = () => {
        setSweet({
            ...sweet,
            enable: false,
            id: false,
            confirmButtonName: "Delete",
            type: ""
        })
    }

    const performDelete = () => {
        const formData = new FormData()
        formData.append("id", sweet.id)

        setSweet({
            ...sweet,
            confirmButtonName: "Deleting..."
        })

        if (sweet.type === "images") {
            // dispatch(onDeleteUserMedia(formData, fetchImgMedia, setSweet))
        }
        else {
            // dispatch(onDeleteUserMedia(formData, fetchVidMedia, setSweet))
        }
    }

    const onInputChange = (e) => {
        const formData = new FormData()
        if (e.target.files.length > 0) {
            if (allowedExt.includes(e.target.files[0].type)) {
                if (e.target.files[0].size < 5000000) {
                    formData.append('upload_type', "images")
                    formData.append('file', e.target.files[0])
                    // dispatch(onUploadMedia(formData, fetchImgMedia, loader, setLoader, setPercent))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Max allowed size for images is 5MB!',
                        confirmButtonColor: themeColor
                    })
                }
            } else if (['video/mp4'].includes(e.target.files[0].type) && (from !== "imgEditor")) {
                if (e.target.files[0].size < 20000000) {
                    formData.append('upload_type', "video")
                    formData.append('file', e.target.files[0])
                    // dispatch(onUploadMedia(formData, fetchVidMedia, loader, setLoader, setPercent))
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Max allowed size for video is 20MB!',
                        confirmButtonColor: themeColor
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have Selected Invalid File Type!',
                    confirmButtonColor: themeColor
                })
            }
        }
    }

    const handleSelectImage = (data) => {
        handleBackground(data.url, "ui")
        setCheckMedia(data.url)
    }
    const handleSelectVideo = (data) => {
        handleBackground(data, "video")
        setCheckMedia(data.url)
    }


    const fetchImgMedia = () => {
        const data = {
            type: "images"
        }
        setLoader({
            ...loader,
            fetch: true
        })
        // dispatch(fetchData("fetch-user-uploaded-file", data, setImages, loader, setLoader))
    }

    const fetchVidMedia = () => {
        const data = {
            type: "video"
        }
        setLoader({
            ...loader,
            fetch: true
        })
        // dispatch(fetchData("fetch-user-uploaded-file", data, setVideos, loader, setLoader))
    }

    useEffect(() => {
        fetchImgMedia()
        if (from !== "imgEditor") {
            fetchVidMedia()
        }
    }, [])

    return (
        <>
            <div className='upload-box'>
                {loader.upload ?
                    <div className='percent-loader-box'>
                        <span className='loader-percent'>{percent}%</span>
                    </div>
                    :
                    <>
                        <PiUpload />
                        <p>Upload {from === "imgEditor" ? "JPEG and PNG" : "Media"}</p>
                        <input
                            type="file"
                            onChange={onInputChange}
                        />
                    </>}
            </div>
            <div className='list-images upload-scroll-remove' >
                {
                    images.length > 0 ?
                        <>
                            <label>Images</label>
                            <div className=' upload_scrolls' >
                                <ul className='mb-2'>
                                    {
                                        images.map((curElem, index) => {
                                            return (
                                                <li key={index} >
                                                    <div className='list-images-single' style={{ cursor: "pointer" }} onClick={() => handleSelectImage(curElem, index)}>
                                                        <img alt="" src={curElem.url} />
                                                        <span className='list-delete' onClick={(e) => handleDelete(e, curElem.id, "images")}><AiOutlineDelete color={themeColor} /></span>
                                                        {checkMedia === curElem.url ?
                                                            <div className='select-tile-style'>
                                                                <GiCheckMark />
                                                            </div> : ""}
                                                    </div>
                                                </li>
                                            )
                                        })

                                    }
                                </ul>
                            </div>
                        </>
                        : ""}

                {
                    videos.length > 0 && from !== "imgEditor" ?
                        <>
                            <label>Videos</label>
                            <ul>
                                {
                                    videos.map((curElem, index) => {
                                        return (
                                            <li key={index}>
                                                <div className='list-images-single' style={{ cursor: "pointer" }}>
                                                    <span onClick={() => handleSelectVideo(curElem, index)} style={{ height: "100%" }}>
                                                        <HoverVideoPlayer
                                                            className="hover-video-player"
                                                            style={{ border: '1px solid gray', height: '110px', overflow: 'hidden' }}
                                                            videoSrc={curElem.url}
                                                            pausedOverlay={
                                                                <img
                                                                    src={curElem.poster}
                                                                    alt={curElem.name}
                                                                    style={{ width: "100%", height: "100%" }} />
                                                            }
                                                            loadingOverlay={
                                                                <div><i className="fa fa-spinner fa-spin hover-loader-center" /></div>
                                                            }
                                                        />
                                                        {checkMedia === curElem.url ?
                                                            <div className='select-tile-style'>
                                                                <GiCheckMark />
                                                            </div> : ""}
                                                    </span>
                                                    <span className='list-delete' style={{ zIndex: 1 }} onClick={(e) => handleDelete(e, curElem.id, "video")}><AiOutlineDelete color={themeColor} /></span>
                                                </div>

                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </>
                        :
                        loader.fetch ?
                            <div className='fetch-loader-block'>
                                {from !== "imgEditor" ?
                                    <i className="fa fa-spinner fa-spin fetch-loader" /> : ""}
                            </div> : ""
                }
                <SweetAlert
                    show={sweet.enable}
                    message={"Are you sure? <br> <br> Do you want to delete this media?"}
                    confirmButtonColor={""}
                    cancelButtonColor={""}
                    confirmButtonName={sweet.confirmButtonName}
                    cancelButtonName={"Cancel"}
                    handleClose={onCancelDelete}
                    performDelete={performDelete}
                />
            </div >
        </>
    )
}

export default Upload