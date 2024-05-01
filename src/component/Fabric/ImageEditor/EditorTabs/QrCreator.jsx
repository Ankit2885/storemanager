import React, { useEffect, useState } from 'react'
import { IoMdHelpCircleOutline } from "react-icons/io";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { fabric } from 'fabric';
import { themeColor } from '../../../Global/Global';
// import { themeColor } from '../../../../Global/Global';

const QrCreator = ({ canvas, canvasJson, setCanvasJson, qrUrl, setQrUrl }) => {
    const [loader, setLoader] = useState(false)

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()

        // let qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${qrUrl.redirectUrl}&chld=H|0`   this one was old API
        let qrCode = `https://image-charts.com/chart?chs=500x500&cht=qr&chl=${qrUrl.redirectUrl}&choe=UTF-8`

        let arrObj = canvas.getObjects()
        let indexQr = arrObj.findIndex(({ src }) => src.includes("https://image-charts.com/chart?"))
        if (indexQr !== -1) {
            setTimeout(() => {
                arrObj[indexQr].setSrc(qrCode, () => {
                    canvas.renderAll()
                }, { crossOrigin: 'Anonymous' })
                setLoader(false)
            }, 1000)
        } else {
            new fabric.Image.fromURL(qrCode, img => {
                img.scale(0.09);
                canvas.add(img);
                canvas.centerObject(img);
                canvas.renderAll();
            }, { crossOrigin: 'Anonymous' });
            await setCanvasJson({ ...canvasJson, data: canvas.toJSON() });
            setLoader(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setQrUrl({
            ...qrUrl,
            [name]: value
        })
    }

    return (
        <>
            <h6>Create QR</h6>
            <OverlayTrigger
                placement={"bottom"}
                overlay={
                    <Tooltip id="tooltip-top" >
                        Enter a website URL where you'd like people to be redirected to after scanning your QR code.
                    </Tooltip>
                }
            >
                <p className='mt-2' style={{ display: "inline-block", position: "relative", }}>QR Code Redirect Link  <IoMdHelpCircleOutline color={themeColor} className='mb-0 ms-1' size={17} cursor="help" /></p>
            </OverlayTrigger>

            <form onSubmit={handleSubmit}>
                <input
                    className='common-inp alt my-2'
                    type='url'
                    name='redirectUrl'
                    value={qrUrl.redirectUrl}
                    onChange={handleChange}
                    placeholder='Enter URL'
                    required
                />
                {/* <div className="input-outer mt-2">
                    <label className="" htmlFor="">AI QR</label>
                    <textarea
                        className="common-inp alt my-2"
                        type="text"
                        name='text'
                        value={qrUrl.text}
                        onChange={handleChange}
                        required
                    />
                </div> */}
                <button type='submit' className='theme-btn'><span>{loader ? <>Generating <i className='fa fa-spin fa-spinner' /></> : "Generate"}</span></button>
            </form>

        </>
    )
}

export default QrCreator