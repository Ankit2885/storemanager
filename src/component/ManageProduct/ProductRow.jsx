import React, { useState } from 'react'
import { BsEye, BsPencil, BsTrash3 } from 'react-icons/bs';
import SweetAlert from '../CommonComponent/SweetAlert';
import { onCommonDelete } from '../../Redux/Actions/CommonActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const ProductRow = (props) => {

    const { curElem, index, productData, setProductData } = props

    const dispatch = useDispatch();
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
        let data = {
            _id: curElem._id,
        }
        dispatch(onCommonDelete("delete-product", data, productData, setProductData, setSweet))
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
            <td>
                <span className='table-profile'>
                    {/* <img src={"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRhCoNd-a1_D4imW9UOsTpaCCGK5wnu_TZsCpTL3cI81Ykr_eOnIP-N32E7hinTEDihlo9zK4C5BrXC2bD0n3_K2n6stArFF74WqTjHnyE9kHO4DOYaJiIt"} alt="" /> */}
                    <img src={curElem.productImage} alt="" />
                </span>
            </td>
            <td>{curElem.name}</td>
            <td>{curElem.category}</td>
            <td>{curElem.price}</td>
            <td>{curElem.date.split("T")[0]}</td>
            <td className="text-end">
                <span className="widg-icon">
                    <Link to={`/manage/add-product?_id=${curElem._id}`}><BsPencil /></Link>
                    <a onClick={deleteRow}><BsTrash3 /></a>
                </span>
            </td>

            <SweetAlert
                show={sweet.enable}
                message={`Are you sure? <br><br> Do you want to delete this product?`}
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
