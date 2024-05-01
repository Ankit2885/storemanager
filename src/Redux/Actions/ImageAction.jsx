import { CommonAxios } from '../Actions/CommonAxios'
import { setAlert } from "./HeaderAlertAction"

export const onCreate = (url, data, type, navigate, setLoader) => (dispatch, getState) => {
    CommonAxios(url, data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                if (type === "Auto Post") {
                    navigate(`/post/auto-post`)
                } else {
                    navigate(`/post`)
                }
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            setLoader(false)
            console.log(err)
            dispatch(setAlert(err.msg, "danger"))
        })
}



export const onFetchDesign = (data, setLoader) => async (dispatch, getState) => {
    let date = new Date()
    let h = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()
    let m = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    let s = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()
    let time = `${h}:${m}:${s}`


    let obj = {
        imageData: [
            {
                data: "",
                url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D",
                thumbnail: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVucyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D"
            }
        ],

    }
    const img = new Image();
    img.onload = function () {
        let w, h

        if (obj.dimension === "1920x1080") {
            w = 640
            h = 360
        } else {
            w = 360
            h = 640
        }
        let scaleFactor = Math.min(w / this.width, h / this.height);
        let initial = {
            "version": "5.3.0",
            "objects": [],
            "background": "white",
            "backgroundImage": {
                "type": "image",
                "version": "5.3.0",
                "originX": "left",
                "originY": "top",
                "left": (w - this.width * scaleFactor) / 2,
                "top": (h - this.height * scaleFactor) / 2,
                "width": this.width,
                "height": this.height,
                "fill": "rgb(0,0,0)",
                "stroke": null,
                "strokeWidth": 0,
                "strokeDashArray": null,
                "strokeLineCap": "butt",
                "strokeDashOffset": 0,
                "strokeLineJoin": "miter",
                "strokeUniform": false,
                "strokeMiterLimit": 4,
                "scaleX": scaleFactor,
                "scaleY": scaleFactor,
                "angle": 0,
                "flipX": false,
                "flipY": false,
                "opacity": 1,
                "shadow": null,
                "visible": true,
                "backgroundColor": "",
                "fillRule": "nonzero",
                "paintFirst": "fill",
                "globalCompositeOperation": "source-over",
                "skewX": 0,
                "skewY": 0,
                "cropX": 0,
                "cropY": 0,
                "src": obj.imageData[0].thumbnail,
                "crossOrigin": "anonymous",
                "filters": []
            }
        }

        obj.imageData[0].data = initial
        obj.imageData.forEach((curElem) => {
            curElem.data = JSON.stringify(curElem.data)
            curElem.data = curElem.data.replaceAll(`"crossOrigin":null`, `"crossOrigin" :"*"`)
            curElem.data = JSON.parse(curElem.data)
            if (curElem.data.backgroundImage) {
                if (!curElem.data.backgroundImage.src.includes("not-from-cache-please")) {
                    curElem.data.backgroundImage.src = curElem.data.backgroundImage.src + `?${time}not-from-cache-please`
                } else {
                    let placeIndex = curElem.data.backgroundImage.src.indexOf("not-from-cache-please")
                    curElem.data.backgroundImage.src = curElem.data.backgroundImage.src.slice(0, placeIndex - 8) + time + curElem.data.backgroundImage.src.slice(placeIndex, 1)
                }
                curElem.data.objects.forEach((layer) => {
                    if (layer.type === "image") {
                        if (!layer.src.includes("not-from-cache-please")) {
                            layer.src = layer.src + `?${time}not-from-cache-please`
                        } else {
                            let placeIndexL = layer.src.indexOf("not-from-cache-please")
                            layer.src = layer.src.slice(0, placeIndexL - 8) + time + layer.src.slice(placeIndexL, 1)
                        }
                    }
                })
            }
        })
        dispatch({ type: "ADD_IMAGE_DATA", payload: obj })
        setLoader(false)
    }
    img.src = obj.imageData[0].thumbnail

    // dispatch({ type: "ADD_IMAGE_DATA", payload: obj })
    // setLoader(false)
}


export const onAutoPostFetchDesign = (data, dimension, setLoader) => (dispatch, getState) => {
    let date = new Date()
    let h = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()
    let m = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
    let s = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()
    let time = `${h}:${m}:${s}`
    CommonAxios("fetch-byId-auto-post", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                let obj = res.data[0]
                obj.dimension = dimension
                if (!obj.data) {
                    const img = new Image();
                    img.onload = function () {
                        let w, h
                        if (obj.dimension === "1920x1080") {
                            w = 640
                            h = 360
                        } else {
                            w = 360
                            h = 640
                        }
                        let scaleFactor = Math.min(w / this.width, h / this.height);
                        let initial = {
                            "version": "5.3.0",
                            "objects": [
                                {
                                    "type": "i-text",
                                    "version": "5.3.0",
                                    "originX": "left",
                                    "originY": "top",
                                    "left": dimension === "1920x1080" ? 166 : 37,
                                    "top": dimension === "1920x1080" ? 38 : 42,
                                    "width": dimension === "1920x1080" ? 280.02 : "",
                                    "height": dimension === "1920x1080" ? 45.2 : "",
                                    "fill": "#ffffff",
                                    "stroke": null,
                                    "strokeWidth": 1,
                                    "strokeDashArray": null,
                                    "strokeLineCap": "butt",
                                    "strokeDashOffset": 0,
                                    "strokeLineJoin": "miter",
                                    "strokeUniform": false,
                                    "strokeMiterLimit": 4,
                                    "scaleX": 1,
                                    "scaleY": 1,
                                    "angle": 0,
                                    "flipX": false,
                                    "flipY": false,
                                    "opacity": 1,
                                    "shadow": null,
                                    "visible": true,
                                    "backgroundColor": "",
                                    "fillRule": "nonzero",
                                    "paintFirst": "fill",
                                    "globalCompositeOperation": "source-over",
                                    "skewX": 0,
                                    "skewY": 0,
                                    "fontFamily": "arial",
                                    "fontWeight": "bold",
                                    "fontSize": 40,
                                    "text": "Add a Heading",
                                    "underline": false,
                                    "overline": false,
                                    "linethrough": false,
                                    "textAlign": "left",
                                    "fontStyle": "normal",
                                    "lineHeight": 1.16,
                                    "textBackgroundColor": "",
                                    "charSpacing": 0,
                                    "styles": [],
                                    "direction": "ltr",
                                    "path": null,
                                    "pathStartOffset": 0,
                                    "pathSide": "left",
                                    "pathAlign": "baseline"
                                }
                            ],
                            "background": "white",
                            "backgroundImage": {
                                "type": "image",
                                "version": "5.3.0",
                                "originX": "left",
                                "originY": "top",
                                "left": (w - this.width * scaleFactor) / 2,
                                "top": (h - this.height * scaleFactor) / 2,
                                "width": this.width,
                                "height": this.height,
                                "fill": "rgb(0,0,0)",
                                "stroke": null,
                                "strokeWidth": 0,
                                "strokeDashArray": null,
                                "strokeLineCap": "butt",
                                "strokeDashOffset": 0,
                                "strokeLineJoin": "miter",
                                "strokeUniform": false,
                                "strokeMiterLimit": 4,
                                "scaleX": scaleFactor,
                                "scaleY": scaleFactor,
                                "angle": 0,
                                "flipX": false,
                                "flipY": false,
                                "opacity": 1,
                                "shadow": null,
                                "visible": true,
                                "backgroundColor": "",
                                "fillRule": "nonzero",
                                "paintFirst": "fill",
                                "globalCompositeOperation": "source-over",
                                "skewX": 0,
                                "skewY": 0,
                                "cropX": 0,
                                "cropY": 0,
                                "src": obj.thumbnail,
                                "crossOrigin": "*",
                                "filters": []
                            }
                        }

                        obj.data = initial
                        obj.data = JSON.stringify(obj.data)
                        obj.data = obj.data.replaceAll(`"crossOrigin":null`, `"crossOrigin" :"*"`)
                        obj.data = JSON.parse(obj.data)
                        if (obj.data.backgroundImage) {
                            if (!obj.data.backgroundImage.src.includes("not-from-cache-please")) {
                                obj.data.backgroundImage.src = obj.data.backgroundImage.src + `?${time}not-from-cache-please`
                            } else {
                                let placeIndex = obj.data.backgroundImage.src.indexOf("not-from-cache-please")
                                obj.data.backgroundImage.src = obj.data.backgroundImage.src.slice(0, placeIndex - 8) + time + obj.data.backgroundImage.src.slice(placeIndex, 1)
                            }
                            obj.data.objects.forEach((layer) => {
                                if (layer.type === "image") {
                                    if (!layer.src.includes("not-from-cache-please")) {
                                        layer.src = layer.src + `?${time}not-from-cache-please`
                                    } else {
                                        let placeIndexL = layer.src.indexOf("not-from-cache-please")
                                        layer.src = layer.src.slice(0, placeIndexL - 8) + time + layer.src.slice(placeIndexL, 1)
                                    }
                                }
                            })
                        }

                        dispatch({ type: "ADD_IMAGE_DATA", payload: obj })
                        setLoader(false)
                    }
                    img.src = obj.thumbnail
                } else {
                    obj.data = JSON.stringify(obj.data)
                    obj.data = obj.data.replaceAll(`"crossOrigin":null`, `"crossOrigin" :"*"`)
                    obj.data = JSON.parse(obj.data)
                    if (obj.data.backgroundImage) {
                        if (!obj.data.backgroundImage.src.includes("not-from-cache-please")) {
                            obj.data.backgroundImage.src = obj.data.backgroundImage.src + `?${time}not-from-cache-please`
                        } else {
                            let placeIndex = obj.data.backgroundImage.src.indexOf("not-from-cache-please")
                            obj.data.backgroundImage.src = obj.data.backgroundImage.src.slice(0, placeIndex - 8) + time + obj.data.backgroundImage.src.slice(placeIndex, 1)
                        }
                        obj.data.objects.forEach((layer) => {
                            if (layer.type === "image") {
                                if (!layer.src.includes("not-from-cache-please")) {
                                    layer.src = layer.src + `?${time}not-from-cache-please`
                                } else {
                                    let placeIndexL = layer.src.indexOf("not-from-cache-please")
                                    layer.src = layer.src.slice(0, placeIndexL - 8) + time + layer.src.slice(placeIndexL, 1)
                                }
                            }
                        })
                    }

                    dispatch({ type: "ADD_IMAGE_DATA", payload: obj })
                    setLoader(false)

                }


            }
        }).catch((err) => {
            setLoader(false)
            console.log(err)
        })
}

export const onSavePostCanvas = (newData, navigate, setCanvasLoader, setSave, type, name, noi) => (dispatch, getState) => {
    setSave(false)
    let url = "save-design"
    if (type === "auto-post") {
        url = "update-auto-post"
    }
    CommonAxios(url, newData, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                if (type === "auto-post") {
                    navigate(`/post/auto-inner-post?id=${newData.imageId}`, {
                        state: {
                            name: name,
                            dimension: newData.dimension,
                            noi: noi
                        }
                    }
                    )
                } else {
                    navigate('/post')
                }
                dispatch(setAlert(res.msg, "success"))
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setCanvasLoader(false)
        }).catch((err) => {
            console.log(err)
            setCanvasLoader(false)
        })
}

export const onGenerateText = (data, setText, setLoader) => (dispatch, getState) => {
    CommonAxios("generate-content", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                setText(res.data)
                dispatch(setAlert(res.msg, "success"))
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
}

export const onTemplateChange = (data, fetchDesign) => (dispatch, getState) => {
    CommonAxios("change-template-image", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                fetchDesign()
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const onCreateText = (data, setLoader, navigate) => (dispatch, getState) => {
    CommonAxios("create-text", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                navigate(`/my-content/text-set?id=${res.data}`)
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            dispatch(setAlert(err.msg, "danger"))
            setLoader(false)
            console.log(err)
        })
}

export const onFetchText = (data, setText, setLoader) => (dispatch, getState) => {
    CommonAxios("fetch-text", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                let obj = { ...res.data[0] }
                obj.text = obj.text ? obj.text : obj.script.replaceAll("?", "")
                setText(obj)
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            dispatch(setAlert(err.msg, "danger"))
            setLoader(false)
            console.log(err)
        })
}

export const onSaveText = (data, setLoader) => (dispatch, getState) => {
    CommonAxios("save-text", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                dispatch(setAlert(res.msg, "success"))
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            dispatch(setAlert(err.msg, "danger"))
            setLoader(false)
            console.log(err)
        })
}

export const onCreateBaseImage = (obj, setImgUrl) => (dispatch, getState) => {
    CommonAxios("save-base", obj, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                let url = res.data
                setImgUrl(url)
                // if (setIsDownload) {
                //     dispatch(onSaveCanvasJson(selectedIndex, data, setIsDownload, url, index))
                // } else {
                //     dispatch(onChangeTemplate(selectedIndex, index, data, url, text))
                // }

            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
        }).catch((err) => {
            console.log(err)
        })
}

export const onRegenerateMeta = (data, index, setLoader) => (dispatch, getState) => {
    CommonAxios("regenerate-meta", data, dispatch, getState().auth.token)
        .then((res) => {
            if (res.status) {
                let obj = {
                    text: res.data,
                    index
                }
                dispatch({ type: "REGENERATE_META", payload: obj })
            } else {
                dispatch(setAlert(res.msg, "danger"))
            }
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
            dispatch(setAlert(err.msg, "danger"))
        })
}

//No Axios

export const onUnmountDesign = () => (dispatch) => {
    dispatch({ type: "ON_LEAVE_IMAGE_EDITOR" })
}

export const onChangeTemplate = (activeIndex, index, obj, url, text) => (dispatch) => {
    let data = { activeIndex, index, obj, url, text }
    dispatch({ type: "CHANGE_TEMPLATE", payload: data })
}

export const onSaveCanvasJson = (index, data, setSave, url, text) => (dispatch) => {
    dispatch({ type: "SAVE_CANVAS", payload: { index, data, url, text } })
    setSave(true)
}

export const onUpadteMetaData = (index, data) => (dispatch) => {
    dispatch({ type: "UPADTE_METADATA", payload: { index, data } })
}