import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import {ApolloProvider} from "react-apollo";
// import ReduxToastr from "react-redux-toastr";

import store from "../store/store";

import {client} from "../reducers/Reducers";
import App from "../components/App";
// import * as Pages from "../pages/";

const router = () => {
    return (
        <ApolloProvider store={store} client={client}>

            <Router>
                <Route path="/" component={App}/>
            </Router>

        </ApolloProvider>
    );
};

export default router;
// export default (
//     <Route path='/' component={AppContainer}>
//         <IndexRoute component={Read} onEnter={ AddUserId }/>
//         <Route path='/write' component={Write} />
//         <Route path='/filter' component={Filter}/>
//         <Route path='/onepost' component={Read}/>
//         <Redirect from='*' to='/' />
//     </Route>
// );

// import React from "react";
// import {IndexRoute, Route, Redirect} from "react-router";
// import uuidv1 from "uuid/v1"; // for timestamp
// import uuidv4 from "uuid/v4"; // for random

// import AppContainer from "../components/App/AppContainer";
// import Read from "../components/Read/Read";
// import Write from "../components/Write/Write";
// import Filter from "../components/Filter/Filter";

// const AddUserId = () => {
//     localStorage.setItem("loading", false);
//     if (!localStorage.getItem("userId")) {
//         let userId = (uuidv1() + uuidv4()).replace(/-/g, "");
//         localStorage.setItem("userId", userId);
//     }
// };

// export default (
//     <Route path='/' component={AppContainer}>
//         <IndexRoute component={Read} onEnter={ AddUserId }/>
//         <Route path='/write' component={Write} />
//         <Route path='/filter' component={Filter}/>
//         <Route path='/onepost/:postId' component={Read}/>
//         <Redirect from='*' to='/' />
//     </Route>
// );

