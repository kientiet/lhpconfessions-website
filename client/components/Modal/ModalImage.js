import React from "react";
import PropTypes from "prop-types";

export default class ModalImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={this.props.ModalImage} alt="image description"/>
        );
    }
}

ModalImage.propTypes = {
    ModalImage: PropTypes.string.isRequired
};
