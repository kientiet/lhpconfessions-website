import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import PropTypes from "prop-types";
import _ from "lodash";

import * as OnePostGossipActionsCreator from "../../client/actions/OnePostGossipActions";
import OnePostGossip from "../../client/components/OnePostGossip/OnePostGossip";
// import PostLanding from "../../client/components/postlanding/PostLanding";

let postType = gql`
    query ($statusId: String!) {
        gossipWithId(statusId: $statusId) {
            _id
            status_message
            status_published
        }
    }
`,

    commentQuery = gql`
        query ($statusId: String!, $loadedCommentsId: [String]!) {
            commentWithStatusId(statusId: $statusId, loadedCommentsId: $loadedCommentsId) {
                _id
                comment_message
                comment_published
                userId
            }
        }
    `,

    insertCommentQuery = gql`
        mutation ($statusId: String!, $userId: String!, $newComment: String!) {
            addComment(statusId: $statusId, userId: $userId, newComment: $newComment) {
                _id
                comment_message
                comment_published
                userId
            }
        }
    `;

export class OnePostGossipContainer extends Component {
    SAFE_componentWillMount() {
        const {actions} = this.props;
        actions.getPostWithId(this.props.params.postId);
    }

    render() {
        let props = this.props.onePostGossip,
            params = {
                statusId: this.props.match.params.postId,
                commentsList: this.props.commentsList,
                insertComment: this.props.insertNewComment
            };
        return (
            <OnePostGossip gossip={props} params={params}/>
        );
    }
}

OnePostGossipContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    onePostGossip: PropTypes.object.isRequired,
    commentsList: PropTypes.array.isRequired,
    insertNewComment: PropTypes.func.isRequired,
    loadMoreComments: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => (
        Object.assign({}, ownProps, state)
    ),

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(OnePostGossipActionsCreator, dispatch)
    });

export default compose(
    graphql(insertCommentQuery, {
        props({mutate}) {
            return {
                insertNewComment(content, userId, statusId) {
                    mutate({
                        variables: {
                            statusId: statusId,
                            userId: userId,
                            newComment: content
                        }
                    });
                }
            };
        }
    }),

    graphql(commentQuery, {
        options: (ownProps) => ({
            variables: {
                statusId: ownProps.match.params.postId,
                loadedCommentsId: []
            }
        }),

        props({data}) {
            let result = [];
            if (data.commentWithStatusId) {
                result = data.commentWithStatusId;
                let allId = _.compact(_.map(result, "_id"));
                localStorage.setItem("loadedCommentsId", JSON.stringify(allId));
            }
            return {
                commentsList: result,
                loadMoreComments() {
                    return data.fetchMore({
                        variables: {
                            loadedCommentsId: localStorage.getItem("loadedCommentsId")
                        },

                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult && fetchMoreResult.commentWithStatusId.length === 0) {
                                return previousResult;
                            }
                            let unionFetch = Object.assign({}, previousResult, {
                                    commentWithStatusId: [...previousResult.commentWithStatusId, ...fetchMoreResult.commentWithStatusId]
                                }), allId;
                            unionFetch.commentWithStatusId = _.uniqBy(unionFetch.commentWithStatusId, "_id");

                            allId = _.compact(_.map(result, "_id"));
                            localStorage.setItem("loadedCommentsId", JSON.stringify(allId));
                            return unionFetch;
                        }
                    });
                }
                // Add loading more comment overhere
            };
        }
    }),

    graphql(postType, {
        options: (ownProps) => ({
            variables: {
                statusId: ownProps.match.params.postId
            }
        }),

        props({data}) {
            return {
                onePostGossip: data.gossipWithId
            };
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)
)(OnePostGossipContainer);
