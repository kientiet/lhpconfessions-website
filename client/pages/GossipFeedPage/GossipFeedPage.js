import React from "react";
// import cssModules from "react-css-modules";
// import styles from "./HomePage.module.scss";
// Example to import a component using ES6 destructuring.
import GossipContainer from "../../containers/GossipContainer";

const gossipFeedPage = (props) => (

    <GossipContainer {...props} />

);

export default gossipFeedPage;
