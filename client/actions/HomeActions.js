import AppConstants from "../constants/ActionConstants";
// import NProgress from "nprogress";
// import {request} from "utils";

function loadMorePostType(data) {
    return {
        type: AppConstants.LOAD_MORE,
        data
    };
}

function isLoadingPostType(data) {
    return {
        type: AppConstants.IS_LOADING,
        data
    };
}

export function loadMorePostAction(currentLoadMoreStatus) {
    if (currentLoadMoreStatus.isLoading) {
        currentLoadMoreStatus.loadMore = true;
    }
    return (dispatch) => {
        dispatch(loadMorePostType({loadMore: !currentLoadMoreStatus.loadMore}));
    };
}

export function isLoadingPostAction(currentLoadingStatus) {
    return (dispatch) => {
        dispatch(isLoadingPostType({isLoading: currentLoadingStatus}));
    };
}
