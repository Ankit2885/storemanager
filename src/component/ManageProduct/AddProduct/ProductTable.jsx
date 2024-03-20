import React from 'react'

const ProductTable = () => {

    return (
        <div className="table-area mt-3">
            <div className="table-responsive">
                <table className="table widget-table">
                    <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Keyword</th>
                        <th className="text-end">Action</th>
                    </tr>

                    {[].length > 0 ?
                        [].map((curElem, index) => {
                            return (
                                <React.Fragment key={index}>

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
    )
}

export default ProductTable
