import { combineReducers } from "redux";
import { ImageReducer } from "./ImageReducer";
import { HeaderAlertReducer } from "./HeaderAlertReducer";

const appReducer = combineReducers({
    alert: HeaderAlertReducer,
    image: ImageReducer,
})

const rootReducers = (state, action) => {
    // if (action.type === 'LOGOUT') {
    //     localStorage.clear();
    //     state = undefined
    // }
    return appReducer(state, action)
}

export default rootReducers;