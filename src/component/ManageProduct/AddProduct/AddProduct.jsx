import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import UploadBulk from './UploadBulk';
import { useDispatch } from 'react-redux';
import { onCreateProduct } from '../../../Redux/Actions/ProductAction';
const AddProduct = () => {

    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        category: "",
        price: "",
        image: ""
    })
    const [loader, setLoader] = useState({
        submit: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader({ ...loader, submit: true });
        let data = { ...state }
        dispatch(onCreateProduct(data, loader, setLoader));
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
                                    name='name'
                                    value={state.name}
                                    onChange={handleChange}
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
                                    name='category'
                                    value={state.category}
                                    onChange={handleChange}
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
                                    name='price'
                                    value={state.price}
                                    onChange={handleChange}
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
