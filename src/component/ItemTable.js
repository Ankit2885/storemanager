import React from 'react'

const ItemTable = (props) => {

    const deleteItem = (e) => {
        let index = e.target.id;
        let User = localStorage.getItem("user");
        let NewItemObj
        if (User === null) {
            NewItemObj = [];
        }
        else {
            NewItemObj = JSON.parse(User);
        }

        NewItemObj.splice(index, 1);
        localStorage.setItem("user", JSON.stringify(NewItemObj));
        props.printBill();      
    }

    return (
        <>
            <tr className="table-active">
                <td>{props.ItemName}</td>
                <td>{props.Quantity}</td>
                <td>{props.Cost}</td>
                <td>{props.Date}</td>
                <td><button id={props.index} onClick={()=>{props.updateItem(props.index)}} className='btn btn-success'>Update</button></td>
                <td><button id={props.index} onClick={deleteItem} className='btn btn-danger'>Delete</button></td>
            </tr>            
        </>
    )
}

export default ItemTable