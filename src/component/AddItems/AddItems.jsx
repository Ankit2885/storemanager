import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { onFetchAllProducts } from '../../Redux/Actions/ProductAction';
import ProductCard from './ProductCard';

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
                    {productData.length > 0 ?
                        productData.map((curElem, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ProductCard
                                        curElem={curElem}
                                    />
                                </React.Fragment>
                            )
                        })
                        : ""}

                </div>
            </div>
        </div >
    )

}

export default AddItems
