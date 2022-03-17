import React from 'react'

const Billpage = () => {
    return (
        <div className="container my-3">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <div class="card-header bg-primary text-light">
                    <h1>Your Item Details</h1>
                </div>
                <div class="card-body">
                    <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active">
                                <td>Mike</td>
                                <td>1</td>
                                <td>51</td>
                                <td><button className='btn btn-danger'>Delete</button></td>
                                <td><button className='btn btn-success'>Update</button></td>
                            </tr>
                            <tr>
                                <td>zhandubam</td>
                                <td>1</td>
                                <td>51</td>
                                <td><button className='btn btn-danger'>Delete</button></td>
                                <td><button className='btn btn-success'>Update</button></td>
                            </tr>
                            <tr class="table-active">
                                <td>oil </td>
                                <td>1</td>
                                <td>51</td>
                                <td><button className='btn btn-danger'>Delete</button></td>
                                <td><button className='btn btn-success'>Update</button></td>
                            </tr>
                            <tr>
                                <td>namak</td>
                                <td>1</td>
                                <td>51</td>
                                <td><button className='btn btn-danger'>Delete</button></td>
                                <td><button className='btn btn-success'>Update</button></td>
                            </tr>
                        </tbody>
                    </table>    
                </div>
                <div class="card-footer bg-primary text-light">
                    <h1>Your Bill</h1>
                </div>
                <div class="card-body">
                <table class="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Total Item</th>
                                <th scope="col">Total Quantity</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-active">
                                <td>2</td>
                                <td>5</td>
                                <td>251</td>
                            </tr>
                           
                        </tbody>
                    </table>   
                    </div> 
            </div>
        </div>
    )
}

export default Billpage