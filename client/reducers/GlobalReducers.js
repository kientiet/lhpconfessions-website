import update from "react-addons-update";
import AppConstants from "../constants/ActionConstants";
/*
    Usage: init the beginning value for table while waiting for new value
*/

const getInitalState = () => {
    return {
        quote: [],
        init: false
    };
};

export default function(state = getInitalState(), action) {
    let nextState;
    switch (action.type) {
        case AppConstants.FETCH_QUOTE:
            nextState = update(state, {
                quote: {$set: action.data}
            });
            break;
        case AppConstants.INITIALED:
            nextState = update(state, {
                init: {$set: action.init}
            });
            break;
        default:
            nextState = state;
            break;
    }
    return nextState;
}
