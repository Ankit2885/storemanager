import React, { useState, useRef, useEffect } from 'react'
import ItemTable from './ItemTable';

const Billpage = () => {

    const dailogBoxBtn = useRef(null);
    const dailogBoxClose = useRef(null);

    // onload function here
    useEffect(() => {
        printBill();
    }, []);

    const [UpdateItems, setUpdateItem] = useState({ id: "", eItemName: "", eQuantity: "", eCost: "", eDate: ""});
    const [TotalBill, setTotalBill] = useState({ TotalItem: 0, TotalQuantity: 0, TotalCost: 0 });

    let User = localStorage.getItem("user");
    const [ItemArray, setItemArray] = useState(JSON.parse(User));

    const updateItemOnChange = (e) => {
        setUpdateItem({ ...UpdateItems, [e.target.name]: e.target.value });
    }

    const printBill = () => {
        let User = localStorage.getItem("user");
        setItemArray(JSON.parse(User));

        let NewItemObj;
        if (User === null) {
            NewItemObj = [];
        }
        else {
            NewItemObj = JSON.parse(User);
        }

        // total cost calculate here
        let LTotalCost = 0;
        let LTotalQuantity = 0;
        for (let i = 0; i < NewItemObj.length; i++) {
            LTotalCost += parseInt(NewItemObj[i].Cost);
            LTotalQuantity += parseInt(NewItemObj[i].Quantity);
        }

        setTotalBill({ TotalItem: NewItemObj.length, TotalCost: LTotalCost, TotalQuantity: LTotalQuantity })
    }

    const updateItem = (index) => {
        dailogBoxBtn.current.click();
        setUpdateItem({ id: index, eItemName: ItemArray[index].ItemName, eQuantity: ItemArray[index].Quantity, eCost: ItemArray[index].Cost, eDate: ItemArray[index].Date })
    }

    const PopupUpdateChanges = () => {
        let NewItemObj;
        let User = localStorage.getItem("user");
        if (User === null) {
            NewItemObj = [];
        }
        else {
            NewItemObj = JSON.parse(User);
        }

        for (let i = 0; i < NewItemObj.length; i++) {
            if (UpdateItems.id === i) {

                NewItemObj[i].ItemName = UpdateItems.eItemName;
                NewItemObj[i].Quantity = UpdateItems.eQuantity;
                NewItemObj[i].Cost = UpdateItems.eCost;
                NewItemObj[i].Date = UpdateItems.eDate;
            }
        }
        localStorage.setItem("user", JSON.stringify(NewItemObj));
        printBill();
        dailogBoxClose.current.click();
    }

    return (
        <>
            <div className="container my-3">
                <div className="card shadow p-3 mb-5 bg-body rounded">
                    <div className="card-header bg-primary text-light">
                        <h1>Your Item Details</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody id='detailsTable'>
                                {ItemArray.map((item, index) => {
                                    return <ItemTable key={index} index={index} ItemName={item.ItemName} Quantity={item.Quantity} Cost={item.Cost} Date={item.Date} printBill={printBill} updateItem={updateItem} />
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="card-footer bg-primary text-light">
                        <h1>Your Bill</h1>
                    </div>
                    <div className="card-body">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Total Item</th>
                                    <th scope="col">Total Quantity</th>
                                    <th scope="col">Total Price</th>
                                </tr>
                            </thead>
                            <tbody id='billTable'>
                                <tr className="table-active">
                                    <td>{TotalBill.TotalItem}</td>
                                    <td>{TotalBill.TotalQuantity}</td>
                                    <td>{TotalBill.TotalCost}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* <!-- dailog box code start here --> */}
            <button style={{ display: 'none' }} ref={dailogBoxBtn} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal code here --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="eItemName" className="form-label">Item Name</label>
                                <input type="text" className="form-control" id="eItemName" name='eItemName' value={UpdateItems.eItemName} onChange={updateItemOnChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eQuantity" className="form-label">Quantity</label>
                                <input type="text" className="form-control" id="eQuantity" name='eQuantity' value={UpdateItems.eQuantity} onChange={updateItemOnChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eCost" className="form-label">Cost</label>
                                <input type="number" className="form-control" id="eCost" name='eCost' value={UpdateItems.eCost} onChange={updateItemOnChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="eDate" className="form-label">Date</label>
                                <input type="date" className="form-control" id="eDate" name='eDate' value={UpdateItems.eDate} onChange={updateItemOnChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={dailogBoxClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={PopupUpdateChanges}>Update Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Billpage