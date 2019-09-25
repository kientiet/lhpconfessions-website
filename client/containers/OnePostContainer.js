import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import PropTypes from "prop-types";

import * as OnePostActionsCreator from "../../client/actions/OnePostActions";
import OnePost from "../../client/components/onepost/OnePost";
import PostLanding from "../../client/components/postlanding/PostLanding";

let postType = gql`
    query ($statusId: String!) {
        confessionWithId(statusId: $statusId) {
            _id
            status_id
            status_message
        }
    }
`;

export class OnePostContainer extends Component {
    SAFE_componentWillMount() {
        const {actions} = this.props;
        actions.getPostWithId(this.props.params.postId);
    }

    renderTemplate(props) {
        if (props) {
            return (
                <main id="main" className="haslayout">
                    <div id="twocolumns" className="container">
                        <div className="row">
                            <div id="content" className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                                <PostLanding/>
                            </div>
                        </div>
                    </div>
                </main>
            );
        } else {
            return <OnePost confession={props.confession}/>;
        }
    }

    render() {
        let props = this.props.onePost;
        return (
            <OnePost confession={props}/>
        );
    }
}

OnePostContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    OnePost: PropTypes.object.isRequired,
    onePost: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => (
        Object.assign({}, ownProps, state)
    ),

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(OnePostActionsCreator, dispatch)
    });

export default compose(
    graphql(postType, {
        options: (ownProps) => ({
            variables: {
                statusId: ownProps.match.params.postId
            }
        }),

        props({data}) {
            return {
                onePost: data.confessionWithId
            };
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)
)(OnePostContainer);
