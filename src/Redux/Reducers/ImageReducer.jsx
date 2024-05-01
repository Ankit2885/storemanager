import { produce } from "immer"
const initialState = false

export const ImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_IMAGE_DATA":

            return {
                ...action.payload
            }


        case "ON_LEAVE_IMAGE_EDITOR":
            return false

        case "CHANGE_TEMPLATE":
            return produce(state, (draft) => {
                draft.imageData[action.payload.activeIndex].data = action.payload.obj
                draft.imageData[action.payload.activeIndex].thumbnail = action.payload.url
                draft.imageData[action.payload.activeIndex].url = action.payload.url
                draft.imageData[action.payload.index].isSelected = 1
                draft.imageData[action.payload.activeIndex].isSelected = 0
            })

        case "SAVE_CANVAS":
            return produce(state, (draft) => {
                draft.imageData[action.payload.index].data = action.payload.data
                draft.imageData[action.payload.index].thumbnail = action.payload.url
                draft.imageData[action.payload.index].url = action.payload.url
            })

        case "REGENERATE_META":
            return produce(state, (draft) => {
                draft.imageData[action.payload.index].meta = action.payload.text
            })


        default:
            return state
    }
}