import React, { useEffect } from 'react'
import { RiArrowGoBackLine, RiArrowGoForwardLine, RiDeleteBin6Line, RiFileCopyLine } from 'react-icons/ri'
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu"
import { themeColor } from '../../Global/Global'
// import { themeColor } from '../../../Global/Global'

const MyCanvas = ({ undo, redo, canvas, canvasState, saveJson, cvLoader }) => {

    const duplicate = () => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.clone(function (clonedObj) {
                canvas.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    clonedObj.canvas = canvas;
                    clonedObj.forEachObject(function (obj) {
                        canvas.add(obj);
                    });
                    clonedObj.setCoords();
                } else {
                    canvas.add(clonedObj);
                }
                activeObject.top += 10;
                activeObject.left += 10;
                canvas.setActiveObject(clonedObj);
                canvas.requestRenderAll();
            });
        }
    }

    const deleteLayer = () => {
        let activeLayer = canvas.getActiveObjects();
        if (activeLayer) {
            activeLayer.forEach(function (object) {
                canvas.remove(object);
            });
            saveJson();
        }
    }
    /** Layer Front or Back */
    const layerFront = () => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
            canvas.renderAll();
        }
    }

    const layerBack = () => {
        let activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
            canvas.renderAll();
        }
    }

    useEffect(() => {
        const handleKey = (event) => {
            if (event.keyCode === 40) {
                event.preventDefault()
                layerBack(canvas)
            }
            if (event.keyCode === 38) {
                event.preventDefault()
                layerFront(canvas)
            }
            if (event.keyCode === 46) {
                deleteLayer()
            }
            if (event.keyCode === 90 && (event.ctrlKey || event.metaKey)) {
                undo()
            }
            if (event.keyCode === 89 && (event.ctrlKey || event.metaKey)) {
                redo()
            }
        }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [canvas, canvasState])

    return (
        <div className='image-editor'>
            <div className="image-editor-img_square">
                <canvas id="canvas" className={cvLoader ? "hidden" : `creator-img`} >
                    <h4>Search from library or upload an image to start customizing it</h4>

                </canvas>
                {
                    cvLoader ?
                        <div style={{
                            height: "100%",
                            width: "100%",
                            // position: 'absolute',
                            // top: 0,
                            // left: 0,
                            fontSize: 40,
                            color: themeColor,
                            display: "flex",
                            alignItems: 'center',
                            position: "absolute",
                            justifyContent: "center"
                        }}>
                            <i className="fa fa-spinner fa-spin" />
                        </div> : ""

                }

            </div>
            <div className='editor-bar Image-editor-bar'>
                <div className='editor-bar-left text-center'>
                    <ul className='justify-content-center'>
                        <li onClick={() => undo()} title='Undo'><RiArrowGoBackLine className='whiteFont' /></li>
                        <li onClick={() => redo()} title='Redo'><RiArrowGoForwardLine className='whiteFont' /></li>
                        <li onClick={duplicate} title='Copy Layer'><RiFileCopyLine className='whiteFont' /></li>
                        <li onClick={layerBack} title='Layer Down'><LuArrowDownWideNarrow className='whiteFont' /></li>
                        <li onClick={layerFront} title='Layer Up'><LuArrowUpWideNarrow className='whiteFont' /></li>
                        <li onClick={deleteLayer} title='Layer Delete'><RiDeleteBin6Line className='whiteFont' /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MyCanvas