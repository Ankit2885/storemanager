import { CommonAxios } from "./CommonAxios";
import { setAlert } from "./HeaderAlertAction";

export const onCommonDelete = (url, data, state, setState, setSweet) => async (dispatch, getState) => {
    let res = await CommonAxios(url, data)
    if (res.status === true) {
        setState(state.filter((val) => val._id !== data._id))
        setSweet({
            enable: false,
            id: false,
            confirmButtonName: "Delete",
            loader: false
        })
        dispatch(setAlert(res.msg, "success"))
    } else {
        setSweet({
            enable: false,
            id: false,
            confirmButtonName: "Delete",
            loader: false
        })
        dispatch(setAlert(res.msg, "danger"))
    }
}
export const onCommonUploadFile = (formData, actionFunction, loader, setLoader) => async (dispatch, getState) => {
    let res = await CommonAxios("save-upload-file", formData)
    if (res.status === true) {
        if (actionFunction) {
            actionFunction();
        }
        setLoader({ ...loader, upload: false })
        dispatch(setAlert(res.msg, "success"))
    } else {
        setLoader({ ...loader, upload: false })
        dispatch(setAlert(res.msg, "danger"))
    }
}