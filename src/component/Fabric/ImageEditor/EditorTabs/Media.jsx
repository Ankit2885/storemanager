import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Upload from './Background/Upload';
import { fabric } from 'fabric';
// import Library from '../../../CommonComponents/Library';
// import AiImageGenerate from '../../../CommonComponents/AiImageGenerate';

const Media = ({ canvas, canvasJson, setCanvasJson, saveJson }) => {
    const t = new Date()

    const [checkMedia, setCheckMedia] = useState("")

    const handleLayerImage = (val) => {
        let data = val.url ? val.url : val
        let date = new Date()
        let h = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()
        let m = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
        let s = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()
        let time = `${h}:${m}:${s}`

        let activeObject = canvas.getActiveObject()
        if (activeObject) {
            if (activeObject.type === "image") {
                activeObject.setSrc(data + `?${time}not-from-cache-please`, () => {
                    let h, w
                    const img = new Image();
                    img.src = data;

                    img.onload = function () {
                        h = this.height
                        w = this.width
                        if (activeObject.clipPath) {
                            if (activeObject.clipPath.type === "circle") {
                                activeObject.clipPath.height = h
                                activeObject.clipPath.width = w
                                activeObject.clipPath.radius = w < h ? w / 2 : h / 2
                            } else if (activeObject.clipPath.type === "ellipse") {
                                activeObject.clipPath.height = h
                                activeObject.clipPath.width = w
                                activeObject.clipPath.rx = w / 2
                                activeObject.clipPath.ry = h / 2
                            }
                        }

                        canvas.renderAll();
                    }
                }, { crossOrigin: "Anonymous" })
            }

            else {
                new fabric.Image.fromURL(data + `?${time}not-from-cache-please`, img => {
                    img.scale(0.6);
                    canvas.add(img);
                    canvas.centerObject(img);
                    canvas.renderAll();
                }, { crossOrigin: 'Anonymous' });
                setCanvasJson({ ...canvasJson, data: canvas.toJSON() });

            }
        } else {
            new fabric.Image.fromURL(data + `?${time}not-from-cache-please`, img => {
                img.scale(0.5);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
            }, { crossOrigin: 'Anonymous' });
            setCanvasJson({ ...canvasJson, data: canvas.toJSON() });

        }
        saveJson();
    }

    return (
        <>

            <div className='upload-cont'>
                <div className='inner-tab'>
                    <Tab.Container defaultActiveKey="first" justify>
                        <Nav variant="n" className="">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Library</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Upload</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">AI Image</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/* <Library
                                    handleBackground={handleLayerImage}
                                    type="layer"
                                    sType={"images"}
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Upload
                                    handleBackground={handleLayerImage}
                                    from="imgEditor"
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                {/* <AiImageGenerate
                                    handleBackground={handleLayerImage}
                                    type="layer"
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                /> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </>
    )

}

export default Media;