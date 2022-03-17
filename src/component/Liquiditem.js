import React from 'react'

const Liquiditem = () => {
    return (
        <div className="container my-3">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <div class="card-header bg-primary text-light">
                    <h1>Liquid Item Details</h1>
                </div>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Item Name</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Quantity</span>
                        <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                        <span class="input-group-text">

                            <select style={{"border":"none","background-color":"#e9ecef"}}>
                                <option selected>Liter</option>
                                <option value="1">Packet</option>
                                <option value="2">Mili Liter</option>
                            </select>

                        </span>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">Quantity</span>
                        <div className='mx-3 mt-2'>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">1/2 Liter</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">1 Liter</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">2 Liter</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                <label class="form-check-label" for="inlineRadio3">3 Liter</label>
                            </div>
                        </div>
                    </div>

                    <div class="input-group mb-3">
                        <span class="input-group-text">Cost $</span>
                        <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>
                    <button type="button" class="btn btn-primary">Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default Liquiditem