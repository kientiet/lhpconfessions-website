import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {graphql, compose} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import * as WritePostActionCreators from "../../client/actions/WritePostActions";
import WriteConfession from "../components/write/WriteConfession";

let submitQuery = gql`
    mutation createConfession($newPost: String!, $newTitle: String!){
        addConfession(newPost: $newPost, newTitle: $newTitle){
            _id
        }
    }
`;

export class WritePostContainer extends Component {

    render() {
        return (
            <WriteConfession submit={this.props.createConfession}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => (
        Object.assign({}, ownProps, state)
    ),

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(WritePostActionCreators, dispatch)
    });

    // StyledComponent = cssModules(MyAmazingContainer, styles);

export default compose(
    graphql(submitQuery, {name: "createConfession"}),
    connect(mapStateToProps, mapDispatchToProps))(WritePostContainer);

WritePostContainer.propTypes = {
    createConfession: PropTypes.func.isRequired
};
