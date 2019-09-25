import React from "react";
// import cssModules from "react-css-modules";
// import styles from "./HomePage.module.scss";
// Example to import a component using ES6 destructuring.
import HomeContainer from "../../containers/HomeContainer";

const HomePage = (props) => (

    <HomeContainer {...props} />

);

export default HomePage;
