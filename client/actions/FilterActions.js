// import AppConstants from "../constants/ActionConstants";
// import NProgress from "nprogress";
// import networkTools from "../utils/Network";
// import rp from "request-promise-native";

// export function fetchedPendingConfessions(data) {
//     return {
//         type: AppConstants.FETCH_PENDING_CONFESSIONS,
//         data
//     };
// }

// export function fetchPendingConfessions() {
//     NProgress.start();
//     const options = {
//         uri: "/v1/api/" + localStorage.getItem("userId") + "/getPendingConfessions"
//     };
//     rp(options).then((pendingConfessions) => {
//         return (dispatch) => {
//             dispatch(fetchedPendingConfessions(pendingConfessions));
//             NProgress.done();
//         };
//     });
// }
