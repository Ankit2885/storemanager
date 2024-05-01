import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
// import { onTemplateChange } from '../../../../Redux/Actions/ImageAction'
import { GiCheckMark } from 'react-icons/gi'
import { fetchData } from '../../../../Redux/Actions/CommonActions'

const Template = ({ onSetInitialCanvas, fetchDesign, setCvLoader }) => {
    const dispatch = useDispatch()
    const image = useSelector(state => state.image)
    const [template, setTemplate] = useState([])
    const [q, setQ] = useState("")
    const [selectedImage, setSelectedImage] = useState({
        id: -1,
        tempId: 1
    })
    const [loader, setLoader] = useState({
        fetch: false
    })


    const fetchTemplate = () => {
        let data = {}
        dispatch(fetchData("fetch-image-templates", data, setTemplate, loader, setLoader))
    }

    const handleChangeTemp = (data) => {
        let obj = {
            id: image.id,
            newTemplateId: data.id,
            oldTemplateId: image.template,
            imageId: selectedImage.id,
            variable: data.variable
        }
        onSetInitialCanvas()
        setCvLoader(true)
        // dispatch(onTemplateChange(obj, fetchDesign))
    }

    useEffect(() => {
        if (image) {
            let data = image.imageData.find(({ isSelected }) => +isSelected === 1)
            setSelectedImage({
                ...selectedImage,
                id: data.id,
                tempId: data.templateId

            })
        }
    }, [image])

    useEffect(() => {
        fetchTemplate()
    }, [])
    return (
        <>
            <div className='list-images'>
                <div className='cont-search with-icon'>
                    <span><FiSearch /></span>
                    <input
                        className='cont-inp'
                        type="text"
                        placeholder='Search'
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>
                <ul style={{ height: 500, overflow: "auto" }}>
                    {template.length > 0 ?
                        template.filter((curElem) => {
                            return image ? curElem.type === image.dimension.replace('x', 'X') : curElem
                        }).filter((temp) => {
                            return temp.name.toLowerCase().includes(q.toLowerCase())
                        }).map((curElem, index) => {
                            return (
                                <li key={index}>
                                    <div className='list-images-single' style={{ cursor: "pointer", position: 'relative' }} onClick={() => handleChangeTemp(curElem)}>
                                        <img alt="" src={curElem.preview} />
                                        {+curElem.id === +selectedImage.tempId ?
                                            <div className='select-tile-style'>
                                                <GiCheckMark />
                                            </div> : ""}
                                    </div>
                                    <p style={{ textAlign: 'center', textTransform: "capitalize", fontSize: 14 }}>{curElem.name}</p>
                                </li>
                            )
                        })

                        :
                        loader.fetch ?
                            <div className='fetch-loader-block'>
                                <i className="fa fa-spinner fa-spin fetch-loader" />
                            </div>
                            : ""
                    }
                </ul>
            </div>
        </>
    )
}

export default Template