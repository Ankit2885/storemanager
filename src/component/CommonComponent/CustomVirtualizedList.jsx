import React, { Suspense, lazy, useEffect, useState } from 'react'
const ProductRow = lazy(() => import('../ManageProduct/ProductRow'));

const CustomVirtualizedList = (props) => {
    const { productData, setProductData, itemHeight, numberOfItems, overScan, loader } = props
    const windowHeight = window.innerHeight

    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overScan, 0);  //get the greatest value of them two values
    let renderNodeCount = Math.floor(windowHeight / itemHeight) + 2 * overScan
    renderNodeCount = Math.min(numberOfItems - startIndex, renderNodeCount);        //get the smallest value of them two values


    const generateRows = () => {
        let items = [];
        for (let i = 0; i < renderNodeCount; i++) {
            const index = i + startIndex
            const curElem = productData[index]
            items.push(
                <React.Fragment key={index}>
                    <ProductRow
                        curElem={curElem}
                        index={index}
                        productData={productData}
                        setProductData={setProductData}
                    />
                </React.Fragment>
            )
        }
        return items
    }

    useEffect(() => {
        window.addEventListener("scroll", () => setScrollTop(document.documentElement.scrollTop))
        return () => window.removeEventListener("scroll", () => setScrollTop(document.documentElement.scrollTop));
    }, []);

    return (
        <div style={{ height: `${numberOfItems * itemHeight}px` }} >
            <table
                className="table widget-table"
                style={{
                    transform: `translateY(${startIndex * itemHeight}px)`,
                }}
            >
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Product image</th>
                        <th>Name</th>
                        <th>category</th>
                        <th>price</th>
                        <th>date</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {productData.length > 0 ? generateRows() :
                        <tr>
                            <td className="text-center" colSpan={7}>
                                {loader.fetch ? <i className="fa fa-spin fa-spinner spin-style" /> : "No campaigns created yet."}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomVirtualizedList
