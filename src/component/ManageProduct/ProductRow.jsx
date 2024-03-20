import React, { useState } from 'react'
import { BsEye, BsTrash3 } from 'react-icons/bs';
import SweetAlert from '../CommonComponent/SweetAlert';

const ProductRow = ({ curElem, index }) => {

    const [sweet, setSweet] = useState({
        enable: false,
        id: false,
        confirmButtonName: "Delete",
        loader: false
    })

    const onConfirm = () => {
        setSweet({
            ...sweet,
            confirmButtonName: "Deleting",
            loader: true
        })
        // let data = {
        //     id: curElem.id,
        // }
        // dispatch(onDeleteCampaign("delete-ai-email", data, contactLeadData, setContactLeadData, setSweet))
    }

    const onCancel = () => {
        setSweet({
            ...sweet,
            enable: false,
            id: false,
            confirmButtonName: "Delete",
            loader: false
        })
    }

    const deleteRow = () => {
        setSweet({
            ...sweet,
            enable: true,
        })
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>name</td>
            <td>milk</td>
            <td className="text-end">
                <span className="widg-icon">
                    <a><BsEye /></a>
                    <a onClick={deleteRow}><BsTrash3 /></a>
                </span>
            </td>

            <SweetAlert
                show={sweet.enable}
                message={`Are you sure? <br><br> Do you want to delete this campaign?`}
                confirmButtonColor={""}
                cancelButtonColor={""}
                confirmButtonName={sweet.confirmButtonName}
                cancelButtonName={"Cancel"}
                alertLoader={sweet.loader}
                handleClose={onCancel}
                performDelete={onConfirm}

            />
        </tr>
    )
}

export default ProductRow
