import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import UploadBulk from './UploadBulk';
const AddProduct = () => {

    const [loader, setLoader] = useState({
        submit: false
    })
    const handleSubmit = (e) => {
        setLoader({ ...loader, submit: true })
        e.preventDefault();
    }

    return (
        <div className='site-wrap'>
            <div className="widget-top">
                <div className="widget-top-left">
                    <h6>Add Products</h6>
                </div>
                <div>
                    <Link to={"/manage"} className="theme-btn text-decoration-none" style={{ width: "130px" }}><span><GoArrowLeft /> Back</span></Link>
                </div>
            </div>
            <div className="add-items-wrap">
                <div className="row">
                    <div className="col-lg-5">
                        <h4>Add product</h4>
                        <form action="" onSubmit={handleSubmit}>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Category</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="category"
                                    placeholder="Enter item category"
                                    required
                                />
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Price in indian rupee ₹</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="price"
                                    placeholder="Enter item price"
                                    required
                                />
                            </div>
                            <div className="input-outer mt-4">
                                <button className="theme-btn full"> <span>{loader.submit ? <> Submitting <i className="fa fa-spinner fa-spin ms-1" /></> : "Submit"}</span></button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-2">
                        <div className="dividline">
                            <span>or</span>
                        </div>

                    </div>
                    <div className="col-lg-5">
                        <UploadBulk />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
