import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onFetchAllProducts } from '../../Redux/Actions/ProductAction';
import { themeColor } from '../Global/Global';
const CustomInfinityScroll = React.lazy(() => import("../CommonComponent/CustomInfinityScroll.jsx"))

const AddItems = () => {

    const dispatch = useDispatch();
    const [productData, setProductData] = useState([])
    const [loader, setLoader] = useState({
        fetch: false
    })

    const fetchAllProduct = () => {
        setLoader({ ...loader, fetch: true })
        let data = {};
        dispatch(onFetchAllProducts(data, setProductData, loader, setLoader))
    }

    useEffect(() => {
        fetchAllProduct();
    }, [])

    return (
        <div className='site-wrap'>
            <div className="widget-top">
                <div className="widget-top-left">
                    <h6>Add leads</h6>
                </div>
            </div>
            <div className="add-items-wrap">
                <div className="row">
                    <Suspense fallback={<div className="text-center"><i className="fa fa-spin fa-spinner spin-style" style={{ fontSize: "23px", color: themeColor }} /></div>}>
                        <CustomInfinityScroll
                            state={productData}
                            totalDataLength={productData.length}
                            pagePerData={20}
                        />
                    </Suspense>
                </div>
            </div>
        </div >
    )

}

export default AddItems
