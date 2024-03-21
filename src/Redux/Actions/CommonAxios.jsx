import axios from "axios"
import { BaseUrl } from "../../component/Global/Global";
export const CommonAxios = async (url, data) => {
    try {
        let response = await axios.post(`${BaseUrl}/${url}`, data);
        if (response.data.status === true) {
            return {
                status: true,
                data: response.data.data,
                msg: response.data.message
            }
        } else {
            return {
                status: false,
                data: response.data.data,
                msg: response.data.message
            }
        }
    } catch (error) {
        return {
            status: false,
            data: "",
            msg: error.message
        }
    }

}