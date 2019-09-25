import update from "react-addons-update";
import AppConstants from "../constants/ActionConstants";
/*
    Usage: init the beginning value for table while waiting for new value
*/

const OnePostReducers = (state = {}, action) => {
    let nextState;
    switch (action.type) {
        case AppConstants.FETCH_POST:
            nextState = update(state, {
                confession: {$set: action.data}
            });
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
};

export default OnePostReducers;
