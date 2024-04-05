import React, { Suspense, useEffect, useState } from 'react'
import { lazy } from 'react';
import { useDispatch } from 'react-redux'
import { onFetchAllProducts } from '../../Redux/Actions/ProductAction';
import InfinityScroll from '../CommonComponent/InfinityScroll';
import VirtualizedListLearn from './VirtualizedListLearn';
const ProductCard = lazy(() => import('./ProductCard'));

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
                    <InfinityScroll
                        state={productData}
                        totalDataLength={150}
                    />
                </div>

                {/* <div className="row"> */}
                {/* <Suspense fallback={<FullScreenLoader />}>
                        {productData.length > 0 ?
                            productData.map((curElem, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <ProductCard
                                            index={index}
                                            curElem={curElem}
                                        />
                                    </React.Fragment>
                                )
                            })
                            : ""}
                    </Suspense > */}
                {/* </div> */}

                {/* <VirtualizedListLearn
                    productData={productData}
                    itemHeight={383}
                    windowHeight={600}
                    numberOfItems={productData.length}
                    overScan={10}
                /> */}
            </div>
        </div >
    )

}

export default AddItems
