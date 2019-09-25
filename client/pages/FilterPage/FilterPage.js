import React from "react";
// import cssModules from "react-css-modules";
// import styles from "./HomePage.module.scss";
// Example to import a component using ES6 destructuring.
import FilterContainer from "../../containers/FilterContainer";

const FilterPage = (props) => (
    <div>
        <FilterContainer {...props} />
    </div>
);

export default FilterPage;
