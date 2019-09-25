import AppConstants from "../constants/ActionConstants";
import NProgress from "nprogress";
import networkTools from "../utils/Network";
// import rp from "request-promise-native";

export function fetchedQuote(data) {
    return {
        type: AppConstants.FETCH_QUOTE,
        data
    };
}

export function fetchQuote() {
    NProgress.start();
    return (dispatch) => {
        networkTools().get({id: "", resource: "quoteOfDay"})
            .then((result) => dispatch(fetchedQuote(result)));
        NProgress.done();
    };
}

export function quoteInit(value) {
    return {
        type: AppConstants.INITIALED,
        init: !value
    };
}
