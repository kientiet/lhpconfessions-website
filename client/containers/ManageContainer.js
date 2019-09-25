import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
// import gql from "graphql-tag";
// import {graphql, compose} from "react-apollo";
// import PropTypes from "prop-types";
import {compose} from "react-apollo";

import * as ManageActionCreators from "../../client/actions/ManageActions";
import Manage from "../../client/components/manage/Manage";

export class HomeContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Manage/>
        );
    }
}
HomeContainer.propTypes = {
};

const mapStateToProps = (state, ownProps) => {
        return Object.assign({}, ownProps, state);
    },

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(ManageActionCreators, dispatch)
    });

    // StyledComponent = cssModules(MyAmazingContainer, styles);

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(HomeContainer);
