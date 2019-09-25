import React from "react";
// import cssModules from "react-css-modules";
// import styles from "./OnePostPage.module.scss";
// Example to import a component using ES6 destructuring.
import OnePostContainer from "../../containers/OnePostContainer";

const OnePostPage = (props) => (
    <div>
        <OnePostContainer {...props} />
    </div>
);

export default OnePostPage;
// export default cssModules(OnePostPage, styles);
