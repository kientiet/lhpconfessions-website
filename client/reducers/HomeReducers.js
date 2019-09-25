import AppConstants from "../constants/ActionConstants";
import update from "react-addons-update";

function initState() {
    return {
        loadMore: false,
        isLoading: false
    };
}

const HomeReducers = (state = initState(), action) => {
    let nextState;
    switch (action.type) {
        case AppConstants.LOAD_MORE:
            nextState = update(state, {
                loadMore: {$set: action.data.loadMore}
            });
            break;
        case AppConstants.IS_LOADING:
            nextState = update(state, {
                isLoading: {$set: action.data.isLoading}
            });
            break;
        default:
            return state;
    }
    return nextState;
};

export default HomeReducers;
