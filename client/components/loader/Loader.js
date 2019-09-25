import React from "react";
import PropeTypes from "prop-types";
import styles from "./Loader.module.scss";

export default class Loader extends React.Component {
    displayBlock() {
        return this.props.isLoading ? "block" : "none";
    }

    render() {
        return (
            <div id="spinner" className={styles.spinner} style={{"display": this.displayBlock()}}>
                <div className={styles.bounce1}></div>
                <div className={styles.bounce2}></div>
                <div className={styles.bounce3}></div>
            </div>
        );
    }
}

Loader.propTypes = {
    isLoading: PropeTypes.bool.isRequired
};

Loader.defaultProps = {
    isLoading: false
};
