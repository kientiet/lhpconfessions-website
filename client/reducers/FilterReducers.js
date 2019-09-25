import update from "react-addons-update";
import AppConstants from "../constants/ActionConstants";

const getInitalState = () => {
    return {
        pendingConfessions: []
    };
};

export default function(state = getInitalState(), action) {
    let nextState;
    switch (action.type) {
        case AppConstants.FETCH_PENDING_CONFESSIONS:
            nextState = update(state, {
                pendingConfessions: {$set: action.data}
            });
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
}
