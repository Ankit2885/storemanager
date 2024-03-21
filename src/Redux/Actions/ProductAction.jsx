import { CommonAxios } from "./CommonAxios"
import { setAlert } from "./HeaderAlertAction"

export const onFetchAllProducts = (data, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("fetch-all-products", data)
    if (res.status === true) {
        dispatch(setAlert(res.msg, "success"))
    } else {
        dispatch(setAlert(res.msg, "danger"))
    }
    setLoader({ ...loader, fetch: false });
}
export const onCreateProduct = (data, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("create-project", data)
    if (res.status === true) {
        dispatch(setAlert(res.msg, "success"))
    } else {
        dispatch(setAlert(res.msg, "danger"))
    }
    setLoader({ ...loader, submit: false });
}