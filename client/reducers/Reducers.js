import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "redux-form";
import {reducer as toastrReducer} from "react-redux-toastr";
import {ApolloClient, createNetworkInterface} from "react-apollo";

// Import the various reducers here:
import HomeReducer from "./HomeReducers";
import OnePostReducers from "./OnePostReducers";
import GlobalReducer from "./GlobalReducers";
import ModalReducer from "./ModalReducers";
import GossipReducer from "./GossipReducers";

export const networkInterface = createNetworkInterface({uri: "/v1/graphql"}),

    client = new ApolloClient({networkInterface}),
    rootReducer = combineReducers({
        // Apply all of the reducers here.
        Home: HomeReducer,
        OnePost: OnePostReducers,
        Global: GlobalReducer,
        ModalStore: ModalReducer,
        Gossip: GossipReducer,
        routing: routerReducer,
        form: formReducer,
        toastr: toastrReducer,
        apollo: client.reducer()
    });

export default rootReducer;
