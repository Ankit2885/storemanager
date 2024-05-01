import React, { useState } from 'react'
import { SketchPicker } from "react-color";

const ColorPicker = (props) => {
    const [show, setShow] = useState(false)

    const removeTextBg = () => {
        let e = {
            hex: ""
        }
        props.callBack(e, props.from)
    }
    return (
        <div className='box-cont' >
            <label htmlFor="" className='text-capitalize'>{props.name}</label>
            <div className='box-cont-in' style={{ marginTop: "12px" }}>
                <div className='color-select'>
                    <span
                        className='selected-color'
                        onClick={() => setShow(true)}
                        style={{ background: props.color, border: "1px solid ", cursor: 'pointer' }}
                    />
                    {show ?
                        <>
                            <div style={{ height: "100%", width: "100%", position: "fixed", top: 0, left: 0 }} onClick={(e) => setShow(false)} />
                            <SketchPicker color={props.color} onChange={(e) => props.callBack(e, props.from)} />
                        </>
                        : ""
                    }
                    <span className='px-1'>{props.color}</span>
                    {props.from === "textBg" ?
                        <div
                            className='selected-color'
                            style={{ background: "#ffffff", border: "1px solid gray", position: "relative", cursor: 'pointer' }}
                            onClick={removeTextBg}
                            title='Remove Background'
                        >
                            <span style={{ border: "1px solid red", transform: "rotate(45deg)", height: "100%", position: "absolute", left: "50%" }} />
                        </div>
                        : ""}
                </div>

            </div>
        </div>
    )
}

export default ColorPicker