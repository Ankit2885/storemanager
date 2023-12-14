import React from 'react'

const ItemCard = ({ curElem }) => {
    return (
        <div className='card shadow p-3 mb-5 bg-body rounded' style={{ height: "100%", width: "100%" }}>
            <h5>{curElem.ItemName}</h5>
            <span>Quantity: {curElem.Quantity}</span>
            <span>Cost: {curElem.Cost}</span>
            <span>Date: {curElem.Date}</span>
        </div>
    )
}

export default ItemCard
