import React from "react";
// import cssModules from "react-css-modules";
// import styles from "./OnePostPage.module.scss";
// Example to import a component using ES6 destructuring.
import OnePostGossipContainer from "../../containers/OnePostGossipContainer";

const onePostGossipPage = (props) => (
    <div>
        <OnePostGossipContainer {...props} />
    </div>
);

export default onePostGossipPage;
// export default cssModules(OnePostPage, styles);
