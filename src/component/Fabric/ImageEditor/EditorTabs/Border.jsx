import React, { useEffect } from 'react'
import { useState } from 'react'
import { fabric } from 'fabric';
// import ColorPicker from '../../../CommonComponents/ColorPicker';
import rgbHex from 'rgb-hex';
import ColorPicker from '../../../CommonComponent/ColorPicker';

const Border = ({ canvas, saveJson }) => {
    const [borderColor, setBorderColor] = useState("#000000")
    const addBorder = (type) => {
        let border = new fabric.Rect({
            width: 347,
            height: 50,
            fill: 'transparent',
            stroke: '#000000',
            id: 'border',
            strokeUniform: true
        });

        if (type === 'solid-border') {
            border.set({
                strokeWidth: 3
            })
        }
        else if (type === 'dashed-border') {
            border.set({
                strokeWidth: 3,
                strokeDashArray: [8, 8]
            });
        }
        else if (type === 'dashed-border-light') {
            border.set({
                strokeWidth: 2,
                strokeDashArray: [5, 5]
            });
        }
        else if (type === 'dotted-border') {
            border.set({
                strokeWidth: 3,
                strokeLineCap: "round",
                strokeDashArray: [0, 8],
                strokeLineJoin: 'crop'
            });
        }

        canvas.add(border);
        canvas.renderAll();
        saveJson();
    }

    const handleColor = (e, type) => {
        let rgba = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a.toFixed(2)})`
        let hex = `#${rgbHex(rgba)}`
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "border") {
                canvas.getActiveObject().set("stroke", hex);
                setBorderColor(hex)
            }
        }
        canvas.renderAll()

    }

    const onObjectSelected = (e) => {
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "border") {
                setBorderColor(selectedObject.stroke)
            }
        } else {
            setBorderColor("#000000")
        }
    }

    useEffect(() => {
        if (canvas) {
            canvas.on('selection:updated', onObjectSelected);
        }
    }, [canvas])

    return (
        <>
            <ColorPicker
                name="color"
                from="border"
                color={borderColor}
                callBack={handleColor}
            />
            <div className="change-border-color mt-3">
                <a onClick={(e) => addBorder('solid-border')} className="border-style solid-border" />
                <a onClick={(e) => addBorder('dashed-border')} className="border-style dashed-border" />
                <a onClick={(e) => addBorder('dashed-border-light')} className="border-style dashed-border-light" />
                <a onClick={(e) => addBorder('dotted-border')} className="border-style dotted-border" />
            </div>
        </>
    )
}

export default Border