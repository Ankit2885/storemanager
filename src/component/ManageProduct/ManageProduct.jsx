import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductRow from './ProductRow'
import { onFetchAllProducts } from '../../Redux/Actions/ProductAction'
import { useDispatch } from 'react-redux'
import FullScreenLoader from '../CommonComponent/FullScreenLoader'
const CustomVirtualizedList = lazy(() => import('../CommonComponent/CustomVirtualizedList'));

const ManageProduct = () => {

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
                    <h6>Manage products</h6>
                </div>
            </div>
            <div className="container-product-list d-flex justify-content-between">
                <h1>Your all products</h1>
                <div >
                    <Link to={"/manage/add-product"} className="theme-btn text-decoration-none" ><span>Add product</span></Link>
                </div>
            </div>
            <div className="container-product-list">
                <Suspense fallback={<FullScreenLoader />}>
                    <CustomVirtualizedList
                        productData={productData}
                        setProductData={setProductData}
                        itemHeight={86}
                        windowHeight={600}
                        numberOfItems={productData.length}
                        overScan={10}
                        loader={loader}
                    />
                </Suspense>
                {/* <div className="table-area mt-3">
                    <div className="table-responsive">
                        <table className="table widget-table">
                            <tr>
                                <th>S.NO</th>
                                <th>Product image</th>
                                <th>Name</th>
                                <th>category</th>
                                <th>price</th>
                                <th>date</th>
                                <th className="text-end">Action</th>
                            </tr>

                            {productData.length > 0 ?
                                productData.map((curElem, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ProductRow
                                                curElem={curElem}
                                                index={index}
                                                productData={productData}
                                                setProductData={setProductData}
                                            />
                                        </React.Fragment>
                                    )
                                })
                                : <tr>
                                    <td className="text-center" colSpan={6}>
                                        {loader.fetch ? <i className="fa fa-spin fa-spinner spin-style" /> : "No campaigns created yet."}
                                    </td>
                                </tr>
                            }
                        </table>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default ManageProduct