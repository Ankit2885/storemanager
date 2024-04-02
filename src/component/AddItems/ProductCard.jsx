import React from 'react'

const ProductCard = (props) => {
    const { curElem, index } = props
    return (
        <div className="col-lg-3 mb-3">
            <div className='card'>
                <div className="card-body d-flex justify-content-center">
                    <div className='product-card-image'>
                        <img style={{ objectFit: "contain", backgroundColor: "#f9f4f4" }} src={curElem.productImage} className="card-img-top" alt="no image found" />
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

export default ProductCard
