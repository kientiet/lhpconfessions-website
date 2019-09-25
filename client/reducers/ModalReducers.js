import update from "react-addons-update";
import AppConstants from "../constants/ActionConstants";
/*
    Usage: init the beginning value for table while waiting for new value
*/

const getInitalState = () => {
    return {
        Modal: {
            isOpen: false,
            isHidden: true,
            component: {}
        }
    };
};

export default function(state = getInitalState(), action) {
    let nextState;
    switch (action.type) {
        case AppConstants.MODAL:
            nextState = update(state, {
                Modal: {$set: action.data}
            });
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
}
