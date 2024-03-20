import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import Swal from 'sweetalert2';

const UploadBulk = (props) => {
    const { leadFolderData, fetchAllFolder } = props
    const [state, setState] = useState({
        fId: "",
        file: "",
        fileName: ""
    });
    const [loader, setLoader] = useState({
        submit: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader({ ...loader, submit: true })
        const formData = new FormData()
        formData.append('fId', state.fId)
        formData.append('file', state.file)
    }

    const onInputChange = (e) => {
        let allowedExt = ['text/csv']
        if (e.target.files.length > 0) {
            if (allowedExt.includes(e.target.files[0].type)) {
                if (e.target.files[0].size < 5000000) {
                    setState({ ...state, file: e.target.files[0] })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Max allowed size for images is 5MB!',
                        confirmButtonColor: "#0b67ed"
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'You have Selected Invalid File Type!',
                    confirmButtonColor: "#0b67ed"
                })
            }
        }
    }

    const downloadCsvFile = (e) => {
        e.preventDefault();
        const csvData = 'Name,Email,Phone';
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'leads.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="bulkUp">
            <form action="" onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <h4>Add Bulk product</h4>
                    <a className='ms-3' href='' onClick={downloadCsvFile}>Click here to download CSV format</a>
                </div>
                <div className="input-outer mt-4" style={{ position: "relative" }}>
                    <div className="widget-upload justify-content-center">
                        <div >
                            <input
                                type="file"
                                accept=".csv"
                                onChange={onInputChange}
                                disabled={loader.submit}
                                required
                            />
                            <BsCloudUpload style={{ marginRight: "10px", fontSize: "17px" }} />
                            Please upload your CSV file <br /> {state?.file?.name}
                        </div>
                    </div>
                </div>
                <div className="input-outer mt-4">
                    <button type="submit" className="theme-btn full" disabled={loader.submit}><span>{loader.submit ? <> Uploading <i className="fa fa-spinner fa-spin ms-1" /></> : "Upload"}</span></button>
                </div>
            </form>
        </div>
    )
}

export default UploadBulk
