import AppConstants from "../constants/ActionConstants";
import update from "react-addons-update";

function initState() {
    return {
        gossipFeed: [],
        isLoading: false
    };
}

const GossipReducer = (state = initState(), action) => {
    let nextState;
    switch (action.type) {
        case AppConstants.LOAD_GOSSIP_FEED:
            nextState = update(state, {
                loadMore: {$set: action.data.gossipFeed}
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

export default GossipReducer;
