import React from 'react'
import { Modal } from 'react-bootstrap'
import { FaSpinner } from "react-icons/fa"
const SweetAlert = (props) => {

    const style1 = {
        width: "116px",
        height: "85px",
        background: "#e2dfdf73",
        borderRadius: "19px",
        position: "relative"
    }

    const style2 = {
        position: "absolute",
        top: "-55%",
        left: "12%",
        fontSize: "90px",
        color: "#5680b5"
    }


    return (

        <Modal className="theme-modal" show={props.show} onHide={props.handleClose} centered>
            <Modal.Body>
                <div className="connect-modal">
                    <div className="input-wrap text-center mt-5">
                        <img alt="" src={""} />
                        <h6 className="pt-3" dangerouslySetInnerHTML={{ __html: props.message }} />
                    </div>
                </div>
                <div className="group-btn">
                    <div className="row">
                        <div className="col-6">
                            <button className="theme-btn full bdr" onClick={props.handleClose}><span>{props.cancelButtonName}</span></button>
                        </div>
                        <div className="col-6">
                            <button className="theme-btn full" onClick={props.performDelete}><span>{props.confirmButtonName} {props.alertLoader ? <FaSpinner className="spin" /> : null}</span></button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SweetAlert