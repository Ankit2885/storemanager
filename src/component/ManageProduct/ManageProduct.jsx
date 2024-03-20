import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import { Link } from 'react-router-dom'
import ProductRow from './ProductRow'

const ManageProduct = () => {

    const [loader, setLoader] = useState({
        fetch: false
    })

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
                <div className="table-area mt-3">
                    <div className="table-responsive">
                        <table className="table widget-table">
                            <tr>
                                <th>S.NO</th>
                                <th>Name</th>
                                <th>Keyword</th>
                                <th className="text-end">Action</th>
                            </tr>

                            {[1].length > 0 ?
                                [1].map((curElem, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <ProductRow
                                                curElem={curElem}
                                                index={index}
                                            />
                                        </React.Fragment>
                                    )
                                })
                                : <tr>
                                    <td className="text-center" colSpan={4}>
                                        {loader.fetch ? <i className="fa fa-spin fa-spinner spin-style" /> : "No campaigns created yet."}
                                    </td>
                                </tr>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProduct
