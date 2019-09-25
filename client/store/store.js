import {createStore, compose, applyMiddleware} from "redux";
import {syncHistoryWithStore} from "react-router-redux";
import thunk from "redux-thunk";
import {browserHistory} from "react-router";
import {createLogger} from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";
import rootReducer, {networkInterface, client} from "../reducers/Reducers";
import path from "path";

//initial network interface to connect to apollo

let loggerMiddleware = createLogger(), store,
    middlewares = [thunk, promiseMiddleware(), client.middleware()], composedEnhancers,
    enhancers = [], devToolsExtension = window.devToolsExtension,
    token = localStorage.getItem("token");

if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
}

if (process.env.NODE_ENV !== "production") {
    middlewares.push(loggerMiddleware);
}
networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {};  // Create the header object if needed.
        }

        // Get the authentication token from local storage if it exists
        req.options.headers.token = token ? token : null;
        next();
    }
}]);

composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
);

store = createStore(
    rootReducer,
    composedEnhancers
);

export const history = syncHistoryWithStore(browserHistory, store);

/* Hot reloading of reducers */
if (module.hot) {
    module.hot.accept(path.resolve(__dirname) + "../reducers/", () => {
        const nextRootReducer = require("../reducers/Reducers").default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
