import React, { useEffect } from 'react'
import { useState } from 'react'
import { fabric } from 'fabric';
import ColorPicker from '../../../CommonComponent/ColorPicker';
import rgbHex from 'rgb-hex';

const Layers = ({ canvas, saveJson }) => {
    const [layerColor, setLayerColor] = useState("#000000")
    const addLayer = (type) => {
        let layer = new fabric.Rect({
            width: 100,
            height: 80,
            left: -4,
            fill: '#000000',
            lockMovementY: true,
            lockMovementX: true,
        });
        layer.set({
            scaleX: canvas.width / layer.width
        });

        if (type === 'top') {
            layer.set({
                id: type,
                top: -1,
            });
        } else if (type === 'bottom') {
            layer.set({
                id: type,
                top: canvas.height - (layer.height * layer.scaleY),
            });
        }

        canvas.add(layer);
        canvas.sendToBack(layer);
        canvas.bringToFront(layer)
        saveJson()
    }

    const handleColor = (e, type) => {
        let rgba = `rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a.toFixed(2)})`
        let hex = `#${rgbHex(rgba)}`
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "top" || selectedObject.id === "bottom") {
                canvas.getActiveObject().set("fill", hex);
                setLayerColor(hex)
                canvas.renderAll()
                saveJson()
            }
        }

    }

    const onObjectSelected = (e) => {
        const selectedObject = canvas.getActiveObject()
        if (selectedObject) {
            if (selectedObject.id === "top" || selectedObject.id === "bottom") {
                setLayerColor(selectedObject.fill)
            }
        } else {
            setLayerColor("#000000")
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
                from="layer"
                color={layerColor}
                callBack={handleColor}
            />
            <div className="add-layer mt-2">
                <h6>Add top layer</h6>
                <div className="layer mt-1" onClick={(e) => addLayer('top')} />
            </div>

            <div className="add-layer mt-2">
                <h6>Add bottom layer</h6>
                <div className="layer mt-1" onClick={(e) => addLayer('bottom')} />
            </div>

        </>
    )
}

export default Layers