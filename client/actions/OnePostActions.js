import AppConstants from "../constants/ActionConstants";
import NProgress from "nprogress";
import networkTools from "../utils/Network";

export function fetchedPostWithId(data) {
    return {
        type: AppConstants.FETCH_POST,
        data
    };
}

export function getPostWithId(postId) {
    NProgress.start();
    return (dispatch) => {
        networkTools().get({id: postId, resource: "getPostById"})
            .then((result) => {
                let temp = JSON.parse(result);
                dispatch(fetchedPostWithId(temp));
                NProgress.done();
            });
    };
}
