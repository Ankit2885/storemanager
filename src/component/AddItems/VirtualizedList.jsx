import React, { useState } from 'react'

const VirtualizedList = (props) => {
    const { productData, itemHeight, windowHeight, numberOfItems, overScan } = props

    const [scrollTop, setScrollTop] = useState(0);
    const startIndex = Math.max(Math.floor(scrollTop / itemHeight) - overScan, 0);  //get the greatest value of them two values
    let renderNodeCount = Math.floor(windowHeight / itemHeight) + 2 * overScan
    renderNodeCount = Math.min(numberOfItems - startIndex, renderNodeCount);        //get the smallest value of them two values


    const generateRows = () => {
        let items = [];

        for (let i = 0; i < renderNodeCount; i++) {
            const index = i + startIndex
            items.push(
                <div className="col-lg-3 mb-3" style={{
                    border: "2px solid yellow",
                    height: `${itemHeight}px`,
                }}>
                    <div className='card'>
                        <div className="card-body d-flex justify-content-center">
                            <div className='product-card-image'>
                                <img style={{ objectFit: "contain", backgroundColor: "#f9f4f4" }} src={productData[index].productImage} className="card-img-top" alt="no image found" />
                            </div>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">Card title {index + 1}</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <button href="#" className="btn btn-primary">Add product</button>
                        </div>
                    </div>
                </div>
            )
        }
        console.log(items)
        return items
    }


    console.log({ startIndex, scrollTop, windowHeight, renderNodeCount, number: (numberOfItems - startIndex) }, "hell")

    return (
        <div
            style={{
                border: "2px solid black",
                height: `${windowHeight}px`,
                overflowY: "scroll"
            }}
            onScroll={(e) => { setScrollTop(e.currentTarget.scrollTop) }}
        >
            <div style={{ height: `${numberOfItems * itemHeight}px` }}> {/* dummy height according to data */}

                <div style={{
                    border: "2px solid red",
                    transform: `translateY(${startIndex * itemHeight}px`
                }}>   {/* current data height  */}
                    {generateRows()}
                </div>
            </div>
        </div >
    )
}

export default VirtualizedList
