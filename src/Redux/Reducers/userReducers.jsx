import produce from "immer"
const initialState = {
    data: false
}

export const LeadReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LEAD_FOLDER_DATA":
            return produce(state, (draft) => {
                draft.data = action.payload.data
                draft.loader = action.payload.loader
            })
        case "DELETE_FOLDER_LEAD":
            return produce(state, (draft) => {
                draft.data[action.payload.index].leads = action.payload.data
            })

        case "CHANGE_FOLDER_LEAD_STATUS":
            return produce(state, (draft) => {
                draft.data[action.payload.index].leads[action.payload.leadIndex].leadStatus = action.payload.status
            })

        case "CHANGE_FOLDER_NAME":
            return produce(state, (draft) => {
                draft.data[action.payload.index].folderName = action.payload.name
            })

        case "UNMOUNT_LEAD_FOLDER_DATA":
            return produce(state, (draft) => {
                draft.data = false
                draft.loader = false
            })

        default:
            return state
    }
}