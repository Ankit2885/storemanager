import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { SketchPicker } from 'react-color';
// import Upload from './Upload';
// import Library from '../../../../CommonComponents/Library';
// import AiImageGenerate from '../../../../CommonComponents/AiImageGenerate';

const Background = ({ canvas, saveJson }) => {
    const t = new Date()
    const [bgColor, setBgColor] = useState("#ffffff")
    const [checkMedia, setCheckMedia] = useState("")
    const handleBackground = (val, type) => {
        if (type === "color") {
            canvas.setBackgroundImage(null)
            canvas.setBackgroundColor(val);
            setBgColor(val)
            canvas.renderAll();

        } else {
            let date = new Date()
            let h = date.getHours() <= 9 ? `0${date.getHours()}` : date.getHours()
            let m = date.getMinutes() <= 9 ? `0${date.getMinutes()}` : date.getMinutes()
            let s = date.getSeconds() <= 9 ? `0${date.getSeconds()}` : date.getSeconds()
            let time = `${h}:${m}:${s}`
            if (type === "ui") {

                const img = new Image();
                img.src = val
                img.onload = function () {
                    let scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
                    canvas.setBackgroundImage(val + `?${time}not-from-cache-please`, canvas.renderAll.bind(canvas), {
                        scaleX: scaleFactor,
                        scaleY: scaleFactor,
                        top: (canvas.height - img.height * scaleFactor) / 2,
                        left: (canvas.width - img.width * scaleFactor) / 2,
                        crossOrigin: "*"
                    })
                }
            } else {
                const img = new Image();
                img.src = val.url;
                img.onload = function () {
                    let scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
                    canvas.setBackgroundImage(val.url + `?${time}not-from-cache-please`, canvas.renderAll.bind(canvas), {
                        scaleX: scaleFactor,
                        scaleY: scaleFactor,
                        top: (canvas.height - img.height * scaleFactor) / 2,
                        left: (canvas.width - img.width * scaleFactor) / 2,
                        crossOrigin: "*"
                    });
                }
            }
        }
        saveJson()
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
                                <Nav.Link eventKey="third">Color</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="forth">AI Image</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {/* <Library
                                    handleBackground={handleBackground}
                                    sType={"images"}
                                    type="bg"
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                {/* <Upload
                                    handleBackground={handleBackground}
                                    from="imgEditor"
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                /> */}
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <div className='sketch-background-ui'>
                                    <SketchPicker
                                        color={bgColor} onChange={(e) => handleBackground(e.hex, "color")}
                                    />
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="forth">
                                {/* <AiImageGenerate
                                    handleBackground={handleBackground}
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                /> */}
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div >
        </>
    )

}

export default Background;