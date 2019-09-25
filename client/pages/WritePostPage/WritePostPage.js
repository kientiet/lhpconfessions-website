import React from "react";
import cssModules from "react-css-modules";
import styles from "./WritePostPage.module.scss";
// Example to import a component using ES6 destructuring.
import WritePostContainer from "../../containers/WritePostContainer";

const WritePostPage = (props) => (
    <WritePostContainer {...props} />
);

export default cssModules(WritePostPage, styles);
