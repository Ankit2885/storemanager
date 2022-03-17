import React from 'react'

const Soliditem = () => {
    return (
        <div className="container my-3">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <div class="card-header bg-primary text-light">
                    <h1>Solid Item Details</h1>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Item Name</span>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />

                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Quantity</span>
                        <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span class="input-group-text">.00</span>
                    </div>
                    <button type="button" class="btn btn-primary">Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default Soliditem