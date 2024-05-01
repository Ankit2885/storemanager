import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import parse from "html-react-parser";
import { fabric } from 'fabric';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Upload from './Background/Upload';
import emoji from "../../../../component/Global/emoji.json"
import icons from "../../../../component/Global/icon.json"
import rgbHex from 'rgb-hex';
import ColorPicker from '../../../CommonComponent/ColorPicker';

const Elements = ({ canvas, canvasJson, setCanvasJson, saveJson }) => {
    const [checkMedia, setCheckMedia] = useState("")

    const [colors, setColors] = useState({
        iconColor: "#000000",
        shapeColor: "#000000"
    })
    const [q, setQ] = useState({
        icon: "",
        emoji: ""
    })


    const searchEmoji = (emojis) => {
        return emojis.filter(
            emoji => emoji.tag.toLowerCase().indexOf(q.emoji.toLowerCase()) > -1
        );
    }

    const searchIcon = (icons) => {
        return icons.filter(
            icon => icon.toLowerCase().indexOf('fa-' + q.icon.toLowerCase()) > -1
        );
    }

    const addEmoji = (code) => {
        let text = new fabric.IText(code, {
            fontSize: 40,
            editable: false,
        });

        text.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
        });

        canvas.add(text);
        text.center();
        saveJson()

    }

    function getIconUnicode(elem) {
        let content = window.getComputedStyle(
            document.querySelector('.' + elem), ':before'
        ).getPropertyValue('content');
        return content.replace(/["']/g, '');
    }

    const addIcon = (code) => {
        let iconUnicode = getIconUnicode(code);
        let icon = new fabric.IText(iconUnicode, {
            fill: '#000000',
            fontSize: 50,
            fontFamily: 'FontAwesome',
            editable: false,
        });

        icon.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
        });

        canvas.add(icon);
        canvas.renderAll();
        icon.center();
        saveJson()

    }

    const addShapes = (canvi, type) => {
        let shape;
        if (type === 'rect') {
            shape = new fabric.Rect({
                height: 100,
                width: 150,
                fill: '#000000',
                id: 'filled'
            });
        } else if (type === 'square') {
            shape = new fabric.Rect({
                height: 100,
                width: 100,
                fill: '#000000',
                id: 'filled'
            });
        } else if (type === 'round') {
            shape = new fabric.Rect({
                height: 100,
                width: 100,
                rx: 6,
                ry: 6,
                fill: '#000000',
                id: 'filled'
            });
        } else if (type === 'circle') {
            shape = new fabric.Circle({
                radius: 55,
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                fill: '#000000',
                id: 'filled'
            });
        }
        else if (type === 'triangle') {
            shape = new fabric.Triangle({
                width: 100,
                height: 100,
                rx: 30,
                ry: 30,
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                fill: '#000000',
                id: 'filled'
            });
        } else if (type === 'circle-border') {
            shape = new fabric.Circle({
                radius: 55,
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                fill: 'rgba(0, 0, 0, 0)',
                id: 'nofilled'
            });
        } else if (type === 'triangle-border') {
            shape = new fabric.Triangle({
                width: 100,
                height: 100,
                rx: 30,
                ry: 30,
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                fill: 'rgba(0, 0, 0, 0)',
                id: 'nofilled'
            });
        }
        else if (type === 'rect-border') {
            shape = new fabric.Rect({
                height: 100,
                width: 150,
                fill: 'rgba(0, 0, 0, 0)',
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                id: 'nofill'
            });
        } else if (type === 'square-border') {
            shape = new fabric.Rect({
                height: 100,
                width: 100,
                fill: 'rgba(0, 0, 0, 0)',
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                id: 'nofill'
            });
        } else if (type === 'round-border') {
            shape = new fabric.Rect({
                height: 100,
                width: 100,
                rx: 6,
                ry: 6,
                fill: 'rgba(0, 0, 0, 0)',
                stroke: 'rgb(0,0,0)',
                strokeWidth: 2,
                id: 'nofill'
            });
        }

        canvi.add(shape);
        canvi.renderAll();
        setCanvasJson({ ...canvasJson, data: canvi.toJSON() });
        saveJson();
    }

    const handleColor = (e, type) => {
        let rgba = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a.toFixed(2)})`
        let hex = `#${rgbHex(rgba)}`
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "filled" || selectedObject.id === "nofill" || selectedObject.fontFamily === "FontAwesome") {
                if (selectedObject.fontFamily === "FontAwesome") {
                    if (type === "icon") {
                        canvas.getActiveObject().set("fill", hex);
                        setColors({ ...colors, iconColor: hex });
                    }
                } else if (selectedObject.id === "filled") {
                    if (type === "shape") {
                        canvas.getActiveObject().set("fill", hex);
                        canvas.getActiveObject().set("stroke", hex);
                        setColors({ ...colors, shapeColor: hex });
                    }
                } else {
                    if (type === "shape") {
                        canvas.getActiveObject().set("stroke", hex);
                        setColors({ ...colors, shapeColor: hex });
                    }
                }
            }
        }
        canvas.renderAll();
    }

    const handleUpload = (val, type) => {
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
                    canvas.renderAll()
                })
            }
            else {
                new fabric.Image.fromURL(data + `?${time}not-from-cache-please`, img => {
                    img.scale(type !== '' ? 0.4 : 0.2);
                    canvas.add(img);
                    canvas.centerObject(img);
                    canvas.renderAll();
                }, { crossOrigin: 'Anonymous' });
                setCanvasJson({ ...canvasJson, data: canvas.toJSON() });
                saveJson();
            }
        } else {
            new fabric.Image.fromURL(data + `?${time}not-from-cache-please`, img => {
                img.scale(type !== '' ? 0.4 : 0.2);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
            }, { crossOrigin: 'Anonymous' });
            setCanvasJson({ ...canvasJson, data: canvas.toJSON() });
            saveJson();
        }
    }

    const onObjectSelected = (e) => {
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "filled" || selectedObject.id === "nofill" || selectedObject.fontFamily === "FontAwesome") {
                setColors({
                    ...colors,
                    shapeColor: selectedObject.id === "nofill" ? selectedObject.stroke : selectedObject.fill,
                    iconColor: selectedObject.fill
                })
            }
        } else {
            setColors({
                ...colors,
                shapeColor: "#000000",
                iconColor: "#000000"
            })
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:updated', onObjectSelected);
        }
    }, [canvas])


    return (
        <>

            <div className='upload-cont'>
                <div className='inner-tab'>
                    <Tab.Container defaultActiveKey="first" justify>
                        <Nav variant="n" className="">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Icons</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Emojis</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Shapes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="forth">Upload</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className='list-images text-picker'>
                                    <div className='cont-search with-icon'>
                                        <span><FiSearch /></span>
                                        <input
                                            className='cont-inp'
                                            type="text"
                                            placeholder='Search'
                                            onChange={(e) => setQ({
                                                ...q,
                                                icon: e.target.value
                                            })}
                                        />
                                    </div>
                                    <ColorPicker
                                        name="color"
                                        from="icon"
                                        color={colors.iconColor}
                                        callBack={handleColor}
                                    />
                                    <div className='emoji_custom_wrapper mt-2'>
                                        <div className="icon-items">
                                            {
                                                icons.length > 0 ?
                                                    searchIcon(icons).map((item, index) => {
                                                        return (
                                                            <a onClick={(e) => addIcon(item)} key={index} className="emoji-custom text-dark">
                                                                <i className={`fa ${item}`} aria-hidden="true"></i>
                                                            </a>
                                                        )
                                                    })
                                                    : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <div className='cont-search with-icon'>
                                    <span><FiSearch /></span>
                                    <input
                                        className='cont-inp'
                                        type="text"
                                        placeholder='Search'
                                        onChange={(e) => setQ({
                                            ...q,
                                            emoji: e.target.value
                                        })}
                                    />
                                </div>
                                <div className='emoji_custom_wrapper mt-2'>

                                    <div className="icon-items">
                                        {
                                            emoji.length > 0 ?
                                                searchEmoji(emoji).map((item, index) => {
                                                    return (
                                                        <a onClick={(e) => addEmoji(parse(`&#x${item.code};`))} key={index} className="emoji-custom">
                                                            <span title={item.tag}>{parse(`&#x${item.code};`)}</span>
                                                        </a>
                                                    )
                                                })
                                                : ''
                                        }
                                    </div>
                                </div>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                                <div className='text-picker'>
                                    <ColorPicker
                                        name="color"
                                        from="shape"
                                        color={colors.shapeColor}
                                        callBack={handleColor}
                                    />
                                </div>
                                <div className="shape-box d-flex justify-content-evenly  mt-2">
                                    <div className="shape-item ">
                                        <a onClick={(e) => addShapes(canvas, 'square')} />
                                    </div>
                                    <div className="shape-item2">
                                        <a onClick={(e) => addShapes(canvas, 'round')} />
                                    </div>
                                    <div className="shape-item3">
                                        <a onClick={(e) => addShapes(canvas, 'rect')} />
                                    </div>
                                </div>

                                <div className="shape-box d-flex justify-content-evenly  mt-2">
                                    <div className="shape-item">
                                        <a onClick={(e) => addShapes(canvas, 'circle')} className="circle"></a>
                                        <a onClick={(e) => addShapes(canvas, 'triangle')} className="triangle"></a>
                                    </div>
                                </div>


                                <div className="shape-box d-flex justify-content-evenly  mt-2">
                                    <div className="shape-item-border">
                                        <a onClick={(e) => addShapes(canvas, 'square-border')} />
                                    </div>
                                    <div className="shape-item2-border">
                                        <a onClick={(e) => addShapes(canvas, 'round-border')} />
                                    </div>
                                    <div className="shape-item3-border">
                                        <a onClick={(e) => addShapes(canvas, 'rect-border')} />
                                    </div>
                                </div>

                                <div className="shape-box d-flex justify-content-evenly   mt-2">
                                    <div className="shape-item">
                                        <a onClick={(e) => addShapes(canvas, 'circle-border')} className="cliped-circle " />
                                        <a onClick={(e) => addShapes(canvas, 'triangle-border')} className="cliped-triangle " />
                                    </div>
                                </div>

                            </Tab.Pane>

                            <Tab.Pane eventKey="forth">
                                <Upload
                                    handleBackground={handleUpload}
                                    from="imgEditor"
                                    setCheckMedia={setCheckMedia}
                                    checkMedia={checkMedia}
                                />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}

export default Elements