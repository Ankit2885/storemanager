import React, { useContext } from 'react'
import { Acontext } from '../App';
import DraggableCardList from './DraggableCardList';

const Liquiditem = (props) => {

    const context = useContext(Acontext);

    const OnChangeGetValue = (e) => {
        props.setLiquidItem({ ...props.liquidItem, [e.target.name]: e.target.value })
    }

    const handelAddItem = () => {
        let NewItemObj;
        let User = localStorage.getItem("user");
        if (User === null) {
            NewItemObj = [];
        }
        else {
            NewItemObj = JSON.parse(User);
        }
        NewItemObj.push(context);
        localStorage.setItem("user", JSON.stringify(NewItemObj));

        let item = document.getElementById("ItemName");
        let quantity = document.getElementById("Quantity");
        let cost = document.getElementById("Cost");
        item.value = "";
        quantity.value = "";
        cost.value = "";
    }

    return (
        <>
            <div className="container my-3">
                <div className="card shadow p-3 mb-5 bg-body rounded">
                    <div className="card-header bg-primary text-light">
                        <h1>Liquid Item Details</h1>
                    </div>
                    <div className="card-body">
                        <div className="input-group mb-3">
                            <span className="input-group-text">Item Name</span>
                            <input type="text" className="form-control" name='ItemName' id='ItemName' aria-label="Amount (to the nearest dollar)" onChange={OnChangeGetValue} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Quantity</span>
                            <input type="text" className="form-control" name='Quantity' id='Quantity' aria-label="Amount (to the nearest dollar)" onChange={OnChangeGetValue} />
                            <span className="input-group-text">
                                <select defaultValue={"Liter"} style={{ "border": "none", "backgroundColor": "#e9ecef" }}>
                                    <option value="Liter">Liter</option>
                                    <option value="Mili Liter">Mili Liter</option>
                                    <option value="Packet">Packet</option>
                                    <option value="KG">KG</option>
                                </select>
                            </span>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Date</span>
                            <input type="date" className="form-control" name='Date' id='Date' min={new Date().toISOString().split('T')[0]} aria-label="Amount (to the nearest dollar)" onChange={OnChangeGetValue} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Cost $</span>
                            <input type="number" className="form-control" name='Cost' id='Cost' aria-label="Amount (to the nearest dollar)" onChange={OnChangeGetValue} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handelAddItem}>Add Item</button>
                    </div>
                </div>
            </div>
            <DraggableCardList />
        </>
    )
}

export default Liquiditem