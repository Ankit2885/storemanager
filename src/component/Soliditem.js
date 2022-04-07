import React from 'react'

const Soliditem = () => {
    return (
        <div className="container my-3">
            <div className="card shadow p-3 mb-5 bg-body rounded">
                <div className="card-header bg-primary text-light">
                    <h1>Solid Item Details</h1>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Item Name</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />

                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Quantity</span>
                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span className="input-group-text">.00</span>
                    </div>
                    <button type="button" className="btn btn-primary">Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default Soliditem