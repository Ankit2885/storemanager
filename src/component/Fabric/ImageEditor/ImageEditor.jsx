
import React, { useCallback, useEffect, useState } from 'react';
import { Edit } from 'react-iconly'

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { TbTextSize } from 'react-icons/tb';
import { FaBorderStyle, FaQrcode } from "react-icons/fa"
import { PiSelectionBackgroundFill } from 'react-icons/pi';
import { MdPermMedia, MdOutlineQrCode2 } from 'react-icons/md';
import { BsFillLayersFill, BsGlobe, BsPaintBucket } from 'react-icons/bs';
import { BiSolidComponent } from 'react-icons/bi'
import MyCanvas from './MyCanvas';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from 'fabric';
// import { onCreateBaseImage, onFetchDesign, onSaveCanvas, onUnmountDesign } from '../../../Redux/Actions/ImageAction';
// import TitleBar from '../../CommonComponents/TitleBar';
// import { onCreateQrImage, onFetchQr, onSaveCanvas, onUnmountQR } from '../../../Redux/Actions/WidgetActions';
import ImageText from './EditorTabs/Text/ImageText';
import Background from './EditorTabs/Background/Background';
import Media from './EditorTabs/Media';
import Elements from './EditorTabs/Elements';
import Border from './EditorTabs/Border';
import Layers from './EditorTabs/Layers';
import QrCreator from './EditorTabs/QrCreator';
import { onAutoPostFetchDesign, onCreateBaseImage, onFetchDesign, onSavePostCanvas, onUnmountDesign } from '../../../Redux/Actions/ImageAction';
import Meta from './EditorTabs/Meta';
import { themeColor } from '../../Global/Global';
import TitleBar from '../../CommonComponent/TitleBar';
// import { themeColor } from '../../../Global/Global';


// Canva.propTypes = {canvas: PropTypes.bool};
const ImageEditor = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id, type } = queryString.parse(location.search)
    const { dimension, name, noi } = location.state ? location.state : { dimension: null, name: null, noi: null }

    const image = useSelector(state => state.image)

    const [pageLoader, setPageLoader] = useState(false)
    const [selectedImg, setSelectedImg] = useState(false)
    const [canvas, setCanvas] = useState(false);
    const [pastHistory, setPastHistory] = useState([canvas])

    const [futureHistory, setFutureHistory] = useState([])
    const [canvasState, setCanvasState] = useState(canvas);
    const [canvasLoader, setCanvasLoader] = useState(false);
    const [loader, setLoader] = useState(true);
    const [canvasJson, setCanvasJson] = useState({
        data: []
    });
    const [imgUrl, setImgUrl] = useState(false)
    const [qrUrl, setQrUrl] = useState({
        redirectUrl: "",
        text: ""
    })

    const [text, setText] = useState({
        destiantionURL: "",
        caption: ""
    })


    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            preserveObjectStacking: true,
            width: 640,
            height: 360
        })
    )

    const initCanvasStyle = () => {
        fabric.Object.prototype.set({
            borderColor: themeColor,
            cornerColor: themeColor,
            cornerSize: 10,
            cornerStyle: 'circle',
            transparentCorners: false,
            padding: 5,
            rotatingPointOffset: 20,
            borderDashArray: [5, 5],
            objectCaching: true,
            hoverCursor: 'pointer'
        });
    }

    const saveJson = () => {
        let newCanvasState = JSON.stringify(canvas);
        setCanvasState(newCanvasState);
        setPastHistory(history => [...history, newCanvasState])
        setFutureHistory([])
    }


    const onObjectModified = useCallback(
        e => {
            const newCanvasState = e.target.canvas.toJSON();
            setCanvasState(newCanvasState);
            setPastHistory(history => [...history, newCanvasState])
            setFutureHistory([])
        },
        [setCanvasState, setPastHistory]
    );


    const onUndo = () => {
        let undoData = pastHistory.pop()
        if (undoData) {
            setFutureHistory(future => [...future, undoData])
            canvas.loadFromJSON(undoData)
        }
    }

    const onRedo = () => {
        let redoData = futureHistory.pop()
        if (redoData) {
            setPastHistory(history => [...history, redoData])
            canvas.loadFromJSON(redoData)
        }
    }

    const downloadCanvas = () => {
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL({
            format: 'png',
            // multiplier: 3
        }
        );
        link.click();
    }

    const saveCanvas = () => {
        let img = canvas.toDataURL({
            format: 'png',
            multiplier: 3
        });
        setCanvasLoader(true)
        let baseObj = {
            type: "image",
            data: img
        }
        dispatch(onCreateBaseImage(baseObj, setImgUrl))
    }


    useEffect(() => {
        if (canvas) {
            canvas.loadFromJSON(canvas);
            canvas.on("object:modified", onObjectModified);
        }
    }, [canvas, onObjectModified]);

    useEffect(() => {
        if (selectedImg) {
            canvas.loadFromJSON(selectedImg, function () {
                if (!canvas.background) {
                    canvas.background = 'white';
                }
                // if (canvas.backgroundImage) {
                //     const bgImage = new Image();
                //     bgImage.src = canvas.backgroundImage.src;
                //     bgImage.onload = function () {
                //         let h1 = this.height
                //         let w1 = this.width
                //         canvas.backgroundImage.scaleY = canvas.height / h1
                //         canvas.backgroundImage.scaleX = canvas.width / w1
                //         canvas.backgroundImage.width = w1
                //         canvas.backgroundImage.height = h1
                //         canvas.renderAll();
                //     }
                // }
                canvas.renderAll();
                setLoader(false)
                // setFutureHistory([])
                // setPastHistory([])
            })
        }
    }, [selectedImg])

    const fetchDesign = () => {
        let data = { id }
        dispatch(onFetchDesign(data, setPageLoader))
    }


    useEffect(() => {
        if (canvas) {
            if (id === undefined) {
                canvas.dispose();
                setCanvas(initCanvas);
                initCanvasStyle();
            }
        }
    }, [location])

    useEffect(() => {
        if (image) {
            initCanvasStyle()
            setCanvas(initCanvas)
            setSelectedImg(image.imageData[0].data)
            // setText({
            //     ...text,
            //     caption: image.imageData[0].caption,
            //     destiantionURL: image.imageData[0].destiantionURL
            // })
        }
    }, [image])

    useEffect(() => {
        fetchDesign()
    }, [])

    useEffect(() => {
        // if (canvas) {
        //     initCanvasStyle()
        //     setCanvas(initCanvas)
        // }

        return () => {
            // dispatch(onUnmountDesign())
            // dispatch(onUnmountQR())
        }
    }, [])

    return (
        !pageLoader ?
            <>
                <TitleBar title="Image Editor" />

                <section className='site-wrap'>

                    <div className='site-container'>
                        <div className='title-block'>
                            <div className='containernn'>
                                <div className='title-block-in'>
                                    <h3 className='page-title text-capitalize'>Create {type}</h3>
                                    <div className='edit-title d-flex align-items-center'>
                                        <div className='me-3 d-flex'>
                                            <p>Editor</p>
                                            <span
                                                onClick={() => { console.log(JSON.stringify(canvas.toJSON())) }}
                                            ><Edit /></span>
                                        </div>

                                        <div className='render-bar mt-0'>
                                            <button className='theme-btn bdr me-2' onClick={downloadCanvas}><span>Download</span></button>
                                            <button className='theme-btn' onClick={saveCanvas}><span>{canvasLoader ? <>Saving <i className="fa fa-spinner fa-spin mx-1" /></> : "Save"}</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='containernn'>
                                <div className='editor-wrap alt'>
                                    <div className='editor-left'>
                                        <div className='editor-left-in'>
                                            <div className='editor-tab' style={{ height: "630px" }}>
                                                <Tab.Container id="left-tabs-example" defaultActiveKey={location.pathname === "/review/image-editor" ? "qr" : "text"}>
                                                    <Nav variant="tab-side-nav" className="flex-column editor-tab-left">
                                                        {location.pathname === "/review/image-editor" ?
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="qr"><span><MdOutlineQrCode2 /></span> QR Code</Nav.Link>
                                                            </Nav.Item> : null}

                                                        <Nav.Item>
                                                            <Nav.Link eventKey="text"><span><TbTextSize /></span> Text</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="background"><span><PiSelectionBackgroundFill /></span> Background</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="media"><span><MdPermMedia /></span> Media</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="elements"><span><BiSolidComponent /></span> Elements</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="border"><span><FaBorderStyle /></span> Borders</Nav.Link>
                                                        </Nav.Item>
                                                        <Nav.Item>
                                                            <Nav.Link eventKey="layer"><span><BsFillLayersFill /></span> Layers</Nav.Link>
                                                        </Nav.Item>
                                                        {type ? type.toLowerCase() === "post" || type === "auto-post" ?
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="article"><span><BsGlobe /></span> Article</Nav.Link>
                                                            </Nav.Item> : null : null}

                                                    </Nav>

                                                    <Tab.Content>
                                                        <Tab.Pane eventKey="text">
                                                            <ImageText
                                                                canvas={canvas}
                                                                saveJson={saveJson}
                                                            />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="background">
                                                            <Background
                                                                canvas={canvas}
                                                                saveJson={saveJson}
                                                            />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="media">
                                                            <Media
                                                                saveJson={saveJson}
                                                                canvas={canvas}
                                                                canvasJson={canvasJson}
                                                                setCanvasJson={setCanvasJson}
                                                            />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="elements">
                                                            <Elements
                                                                canvas={canvas}
                                                                saveJson={saveJson}
                                                                canvasJson={canvasJson}
                                                                setCanvasJson={setCanvasJson}
                                                            />
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="border">
                                                            <div className='text-picker'>
                                                                <Border
                                                                    canvas={canvas}
                                                                    saveJson={saveJson}
                                                                    canvasJson={canvasJson}
                                                                    setCanvasJson={setCanvasJson}
                                                                />
                                                            </div>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="layer">
                                                            <div className='text-picker'>
                                                                <Layers
                                                                    canvas={canvas}
                                                                    saveJson={saveJson}
                                                                    canvasJson={canvasJson}
                                                                    setCanvasJson={setCanvasJson}
                                                                />
                                                            </div>
                                                        </Tab.Pane>
                                                        {type ? type.toLowerCase() === "post" || type === "auto-post" ?
                                                            <Tab.Pane eventKey="article">
                                                                <Meta
                                                                    text={text}
                                                                    setText={setText}
                                                                />
                                                            </Tab.Pane>
                                                            : null : null}
                                                        <Tab.Pane eventKey="qr">
                                                            <QrCreator
                                                                canvas={canvas}
                                                                canvasJson={canvasJson}
                                                                setCanvasJson={setCanvasJson}
                                                                qrUrl={qrUrl}
                                                                setQrUrl={setQrUrl}
                                                            />
                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='editor-right'>
                                        <div className='editor-area'>
                                            <MyCanvas
                                                undo={onUndo}
                                                redo={onRedo}
                                                canvas={canvas}
                                                canvasState={canvasState}
                                                saveJson={saveJson}
                                                cvLoader={loader}
                                            />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

            </> :
            <div className="site-wrap">
                <div className="loader-sec">
                    <div className="loader" />
                </div>
            </div>
    )

}

export default ImageEditor;