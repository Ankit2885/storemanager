import React, { useState } from 'react';
import { BiBold, BiUnderline } from 'react-icons/bi'
import { AiOutlineItalic, AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai'
import { RiAlignJustify, RiStrikethrough2 } from 'react-icons/ri'
import { fabric } from 'fabric';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { useEffect } from 'react';
// import { onFetchFont } from '../../../../../Redux/Actions/CommonActions';
import { useDispatch } from 'react-redux';
import { RxLetterCaseCapitalize, RxLetterCaseLowercase, RxLetterCaseUppercase } from 'react-icons/rx';
import Generate from './Generate';
// import { onFetchFont } from '../../../../../Redux/Actions/commonActions';
import rgbHex from 'rgb-hex';
import ColorPicker from '../../../../CommonComponent/ColorPicker';

const ImageText = ({ canvas, saveJson }) => {

    const dispatch = useDispatch()
    const [fonts, setFonts] = useState([])
    const [textLayerData, setTextLayerData] = useState({
        fontSize: 20,
        fontColor: '#000000',
        backgroundColor: "",
        fontFamily: '',
        fontWeight: 'normal',
        fontStyle: '',
        underline: false,
        linethrough: false,
        align: "left",
        textTransform: "",
        lineHeight: 1
    })

    const addText = (itext, type) => {
        let text = new fabric.IText(itext, {
            fontFamily: 'arial',
            left: 100,
            top: 100,
            objecttype: 'text',
            fill: '#000000'
        });
        text.type = 'text';
        if (type === 'head') {
            text.fontWeight = 'bold';
            text.fontSize = 40;
        } else if (type === 'sub') {
            text.fontWeight = 400;
            text.fontSize = 30;
        } else if (type === 'body') {
            text.fontWeight = 'normal';
            text.fontSize = 20;
        }
        canvas.add(text);
        canvas.renderAll();
        saveJson()
    }

    const textSize = (e) => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.getActiveObject().set("fontSize", e.target.value);
            setTextLayerData({ ...textLayerData, fontSize: e.target.value });
            canvas.renderAll();
            saveJson()

        }
    }

    const textLineHeight = (e) => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.getActiveObject().set("lineHeight", +e.target.value);
            setTextLayerData({ ...textLayerData, lineHeight: +e.target.value });
            canvas.renderAll();
            saveJson()


        }
    }

    const textFontFamily = (e) => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.getActiveObject().set("fontFamily", e.target.value);
            setTextLayerData({ ...textLayerData, fontFamily: e.target.value });
            canvas.renderAll();
            saveJson()

        }
    }
    const textColor = (e, type) => {
        let rgba = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a.toFixed(2)})`
        let hex = `#${rgbHex(rgba)}`
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            if (type === "textBg") {
                canvas.getActiveObject().set("backgroundColor", hex);
                setTextLayerData({ ...textLayerData, backgroundColor: hex });
            }
            else {
                canvas.getActiveObject().set("fill", hex);
                setTextLayerData({ ...textLayerData, fontColor: hex });
            }
            canvas.renderAll();
            saveJson()

        }
    }

    const handleType = (type) => {
        let activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === "text") {
            if (type === "bold") {
                if (activeObject.fontWeight === 'normal') {
                    canvas.getActiveObject().set({ fontWeight: 'bold' });
                    setTextLayerData({
                        ...textLayerData,
                        fontWeight: "bold"
                    })
                } else {
                    canvas.getActiveObject().set({ fontWeight: 'normal' });
                    setTextLayerData({
                        ...textLayerData,
                        fontWeight: "normal"
                    })
                }
            } else if (type === 'italic') {
                if (activeObject.fontStyle === 'normal') {
                    canvas.getActiveObject().set({ fontStyle: 'italic' });
                    setTextLayerData({
                        ...textLayerData,
                        fontStyle: "italic"
                    })

                } else {
                    canvas.getActiveObject().set({ fontStyle: 'normal' });
                    setTextLayerData({
                        ...textLayerData,
                        fontStyle: "normal"
                    })
                }
            }
            else if (type === 'uLine') {
                if (activeObject.underline === false) {
                    canvas.getActiveObject().set({ underline: true });
                    setTextLayerData({
                        ...textLayerData,
                        underline: true
                    })
                } else {
                    canvas.getActiveObject().set({ underline: false });
                    setTextLayerData({
                        ...textLayerData,
                        underline: false
                    })
                }
            }

            else if (type === 'linethrough') {
                if (activeObject.linethrough === false) {
                    canvas.getActiveObject().set({ linethrough: true });
                    setTextLayerData({
                        ...textLayerData,
                        linethrough: true
                    })
                } else {
                    canvas.getActiveObject().set({ linethrough: false });
                    setTextLayerData({
                        ...textLayerData,
                        linethrough: false
                    })
                }
            }
            else if (type === 'uppercase') {
                let text = activeObject.text;
                activeObject.text = text.toUpperCase();
                setTextLayerData({
                    ...textLayerData,
                    textTransform: "uppercase"
                })
            }
            else if (type === 'lowercase') {
                let text = activeObject.text;
                activeObject.text = text.toLowerCase();
                setTextLayerData({
                    ...textLayerData,
                    textTransform: "lowercase"
                })
            }
            else if (type === 'capitalize') {

                let text = activeObject.text;
                text = text.toLowerCase();
                activeObject.text = text.replace(/\b\w/g, (char) => char.toUpperCase())
                setTextLayerData({
                    ...textLayerData,
                    textTransform: "capitalize"
                })
            }
            else if (type === 'left') {
                canvas.getActiveObject().set({ textAlign: "left" })
                setTextLayerData({
                    ...textLayerData,
                    align: "left"
                })
            }
            else if (type === 'center') {
                canvas.getActiveObject().set({ textAlign: "center" });
                setTextLayerData({
                    ...textLayerData,
                    align: "center"
                })
            }
            else if (type === 'right') {
                canvas.getActiveObject().set({ textAlign: "right" });
                setTextLayerData({
                    ...textLayerData,
                    align: "right"
                })
            }
            else if (type === 'justify') {
                canvas.getActiveObject().set({ textAlign: "justify" });
                setTextLayerData({
                    ...textLayerData,
                    align: "justify"
                })
            }
            canvas.renderAll();
            saveJson()

        }
    }


    const onObjectSelected = (e) => {
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.type === "textbox" || selectedObject.type === "text") {
                setTextLayerData({
                    ...textLayerData,
                    fontColor: selectedObject.fill,
                    backgroundColor: selectedObject.backgroundColor ? selectedObject.backgroundColor : "#ffffff",
                    fontSize: selectedObject.fontSize,
                    fontFamily: selectedObject.fontFamily,
                    fontWeight: selectedObject.fontWeight,
                    fontStyle: selectedObject.fontStyle,
                    underline: selectedObject.underline,
                    linethrough: selectedObject.linethrough,
                    align: selectedObject.textAlign,
                    textTransform: selectedObject.textTransform,
                    lineHeight: selectedObject.lineHeight
                })
            } else {
                setTextLayerData({
                    ...textLayerData,
                    fontColor: "#000000",
                })
            }
        } else {
            setTextLayerData({
                ...textLayerData,
                fontColor: "#000000",
            })
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:updated', onObjectSelected);
        }
    }, [canvas])

    const fetchFonts = () => {
        // dispatch(onFetchFont(setFonts, false))
    }
    useEffect(() => {
        fetchFonts()
    }, [])

    return (
        <>

            <div className='upload-txt'>
                <div className='inner-tab'>
                    <Tab.Container defaultActiveKey="first" justify>
                        <Nav variant="n" className="">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Fonts</Nav.Link>
                            </Nav.Item>
                            {/* <Nav.Item>
                                <Nav.Link eventKey="second">Generate</Nav.Link>
                            </Nav.Item> */}
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className='font-heading'>
                                    <ul>
                                        <li style={{ cursor: "pointer" }} onClick={() => addText('Add a Heading', 'head')}>Add a heading</li>
                                        <li style={{ cursor: "pointer" }} onClick={() => addText('Add a SubHeading', 'sub')}>Add a subheading</li>
                                        <li style={{ cursor: "pointer" }} onClick={() => addText('Add some body text', 'body')}>Add a bodytext</li>
                                    </ul>
                                </div>
                                <div className='box-cont'>
                                    <label htmlFor="">Size</label>
                                    <div className='box-cont-in'>
                                        <div className='txt-size'>
                                            <span>Aa</span>
                                            <div className="slidecontainer">
                                                <input
                                                    type="range"
                                                    min="10"
                                                    max="100"
                                                    className="slider"
                                                    id="myRange"
                                                    style={{ height: 5 }}
                                                    value={textLayerData.fontSize}
                                                    onChange={(e) => textSize(e, "fontSize")}
                                                />
                                            </div>
                                            <span>Aa</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='inp-wrap'>
                                    <label htmlFor="">Fonts</label>
                                    <select
                                        onChange={textFontFamily}
                                        className='input solid'
                                        value={textLayerData.fontFamily}
                                        style={{ color: "#000", fontFamily: textLayerData.fontFamily }}
                                    >
                                        <option value={""}>Select Font</option>
                                        {
                                            fonts.length > 0 ?
                                                fonts.map((font, index) => {
                                                    return (
                                                        <option style={{ fontFamily: font }}
                                                            value={font} key={index}>
                                                            {font}
                                                        </option>
                                                    )
                                                })
                                                : ''
                                        }
                                    </select>
                                </div>

                                <div className='row text-picker'>
                                    <div className='col-6 '>
                                        <ColorPicker
                                            name="color"
                                            from="text"
                                            color={textLayerData.fontColor}
                                            callBack={textColor}
                                        />
                                    </div>
                                    <div className='col-6 '>
                                        <div className="text_picker">
                                            <ColorPicker
                                                name="background color"
                                                from="textBg"
                                                color={textLayerData.backgroundColor}
                                                callBack={textColor}
                                                style={{ left: 0 }}
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className='box-cont'>
                                    <label htmlFor="">Type Settings</label>
                                    <div className='box-cont-in'>
                                        <div className='type-settings'>
                                            <ul>
                                                <li title='Bold' className={textLayerData.fontWeight === "bold" ? 'active' : ""} onClick={() => handleType("bold")}><BiBold /></li>
                                                <li title='Italic' className={textLayerData.fontStyle === "italic" ? 'active' : ""} onClick={() => handleType("italic")}><AiOutlineItalic /></li>
                                                <li title='Underline' className={textLayerData.underline ? 'active' : ""} onClick={() => handleType("uLine")}><BiUnderline /></li>
                                                <li title='Strike' className={textLayerData.linethrough ? 'active' : ""} onClick={() => handleType("linethrough")}><RiStrikethrough2 /></li>
                                                <li title='Uppercase' className={textLayerData.textTransform === "uppercase" ? 'active' : ""} onClick={() => handleType("uppercase")}><RxLetterCaseUppercase /></li>
                                                <li title='Capitalize' className={textLayerData.textTransform === "capitalize" ? 'active' : ""} onClick={() => handleType("capitalize")}><RxLetterCaseCapitalize /></li>
                                                <li title='Lowercase' className={textLayerData.textTransform === "lowercase" ? 'active' : ""} onClick={() => handleType("lowercase")}><RxLetterCaseLowercase /></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='box-cont'>
                                    <label htmlFor="">Align</label>
                                    <div className='box-cont-in'>
                                        <div className='type-settings'>
                                            <ul>
                                                <li title='Text Left' className={textLayerData.align === "left" ? 'active' : ""} onClick={() => handleType("left")}><AiOutlineAlignLeft /></li>
                                                <li title='Text Center' className={textLayerData.align === "center" ? 'active' : ""} onClick={() => handleType("center")}><AiOutlineAlignCenter /></li>
                                                <li title='Text Right' className={textLayerData.align === "right" ? 'active' : ""} onClick={() => handleType("right")}><AiOutlineAlignRight /></li>
                                                <li title='Text Justify' className={textLayerData.align === "justify" ? 'active' : ""} onClick={() => handleType("justify")}><RiAlignJustify /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='box-cont'>
                                    <label htmlFor="">Line Height</label>
                                    <div className='box-cont-in'>
                                        <div className='type-settings'>
                                            <ul>
                                                <li>
                                                    <input
                                                        className='input solid'
                                                        value={+textLayerData.lineHeight}
                                                        onChange={(e) => textLineHeight(e)}
                                                        type="number"
                                                        min={1}
                                                        step="0.1"
                                                        style={{ color: "#000" }}
                                                    />
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            {/* <Tab.Pane eventKey="second">
                                <Generate />
                            </Tab.Pane> */}
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </>
    )

}

export default ImageText;