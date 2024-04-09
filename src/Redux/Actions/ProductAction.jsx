import { CommonAxios } from "./CommonAxios"
import { setAlert } from "./HeaderAlertAction"

export const onFetchAllProducts = (data, setProductData, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("fetch-all-products", data)
    if (res.status === true) {
        setProductData(Array(1000000).fill(res.data).flat())
        // setProductData(res.data)
    }
    setLoader({ ...loader, fetch: false });
}
export const onFetchProduct = (data, setState, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("fetch-product", data)
    if (res.status === true) {
        setState(res.data)
    }
    setLoader({ ...loader, fetch: false });
}
export const onCreateProduct = (data, setState, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("create-product", data)
    if (res.status === true) {
        setState({
            name: "",
            category: "",
            price: "",
            image: ""
        })
        dispatch(setAlert(res.msg, "success"))
    } else {
        dispatch(setAlert(res.msg, "danger"))
    }
    setLoader({ ...loader, submit: false });
}
export const onUpdateProduct = (data, navigate, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("update-product", data)
    if (res.status === true) {
        navigate("/manage")
        dispatch(setAlert(res.msg, "success"))
    } else {
        dispatch(setAlert(res.msg, "danger"))
    }
    setLoader({ ...loader, submit: false });
}