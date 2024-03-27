import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import UploadBulk from './UploadBulk';
import { useDispatch } from 'react-redux';
import { onCreateProduct, onFetchProduct, onUpdateProduct } from '../../../Redux/Actions/ProductAction';
import Swal from 'sweetalert2';
import { onCommonUploadFile } from '../../../Redux/Actions/CommonActions';
const AddProduct = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const { _id } = Object.fromEntries(searchParams.entries());

    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: "",
        category: "",
        price: "",
        productImage: ""
    })
    const [loader, setLoader] = useState({
        fetch: false,
        submit: false,
        upload: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value });
    }

    const onInputChange = (e) => {
        let allowedExt = ['image/png', 'image/jpg', 'image/jpeg']
        if (e.target.files.length > 0) {
            if (allowedExt.includes(e.target.files[0].type)) {
                if (e.target.files[0].size < 5000000) {
                    setState({ ...state, productImage: e.target.files[0] })
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader({ ...loader, submit: true });
        const formData = new FormData()
        formData.append('name', state.name)
        formData.append('category', state.category)
        formData.append('price', state.price)
        formData.append('file', state.productImage)
        if (_id) {
            formData.append('_id', _id)
            dispatch(onUpdateProduct(formData, navigate, loader, setLoader));
        } else {
            dispatch(onCreateProduct(formData, setState, loader, setLoader));
        }
    }

    const fetchProduct = () => {
        setLoader({ ...loader, fetch: true });
        let data = {
            _id: _id
        }
        dispatch(onFetchProduct(data, setState, loader, setLoader))
    }

    useEffect(() => {
        if (_id) {
            fetchProduct()
        }
    }, [_id]);

    return (
        loader.fetch ?
            <div className="site-wrap">
                <div className="loader-sec">
                    <div className="loader" />
                </div>
            </div>
            :
            <div className='site-wrap'>
                <div className="widget-top">
                    <div className="widget-top-left">
                        <h6>Add Products</h6>
                    </div>
                    <div>
                        <Link to={"/manage"} className="theme-btn text-decoration-none" style={{ width: "130px" }}><span><GoArrowLeft style={{ fontSize: "17px" }} /> Back</span></Link>
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
                                    <label for="price" class="form-label">Price in indian rupee ₹</label>
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
                                <div class="mb-3">
                                    <label for="productImage" class="form-label">Upload product image {state._id ? "(leave for same image)" : ""}</label>
                                    <input
                                        type="file"
                                        accept='image/*'
                                        class="form-control"
                                        id="productImage"
                                        name='productImage'
                                        onChange={onInputChange}
                                        required={state._id ? false : true}
                                    />
                                </div>
                                <div className="input-outer mt-4">
                                    <button type='submit' className="theme-btn full"> <span>{loader.submit ? <> Submitting <i className="fa fa-spinner fa-spin ms-1" /></> : "Submit"}</span></button>
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
