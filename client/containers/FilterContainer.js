import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import PropTypes from "prop-types";
import _ from "lodash";

import * as FilterActionCreators from "../../client/actions/FilterActions";
import FilterConfession from "../components/filter/FilterConfession";

let feedQuery = gql`
query ($pendingConfessionsId: [String]!, $userId: String!) {
    confessionPending(pendingConfessionsId: $pendingConfessionsId, userId: $userId) {
        _id
        status_id
        status_message
        status_link
        status_published
        type
    }
}
`,

    updateStatusMutation = gql`
        mutation ($postId: String!, $adminId: String!, $status: String!) {
            updateConfessionStatus(postId: $postId, adminId: $adminId, status: $status) {
                _id
                status_message
                type
            }
        }
    `;

export class FilterContainer extends Component {
    SAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.apollo.data !== this.props.apollo.data) {
            let allId = _.compact(_.map(nextProps.apollo.data, "_id"));
            localStorage.setItem("pendingConfessions", JSON.stringify(allId));
        }
    }

    render() {
        return (
            <FilterConfession confessions={this.props.pendingConfessions}
                loadMoreStatus={this.props.loadMorePendingPosts}
                updateMutation={this.props.updateStatusMutation}/>
        );
    }
}

FilterContainer.propTypes = {
    apollo: PropTypes.object.isRequired,
    pendingConfessions: PropTypes.array.isRequired,
    loadMorePendingPosts: PropTypes.func.isRequired,
    updateStatusMutation: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
        return Object.assign({}, ownProps, state);
    },

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(FilterActionCreators, dispatch)
    });

export default compose(
    graphql(updateStatusMutation, {
        options: () => ({
            forceFetch: true
        }),

        props({mutate}) {
            return {
                updateStatusMutation(parameters) {
                    parameters = Object.assign({}, parameters, parameters.variables);
                    mutate(parameters);
                }
            };
        }
    }),

    graphql(feedQuery, {
        options: () => ({
            variables: {
                pendingConfessionsId: [],
                userId: localStorage.getItem("userId")
            },
            fetchPolicy: "network-only"
        }),

        props({data}) {
            let callBack = {};
            if (data.confessionPending) {
                callBack = data.confessionPending;
            }
            return {
                pendingConfessions: _.uniqBy(callBack, "_id"),
                loadMorePendingPosts() {
                    return data.fetchMore({
                        variables: {
                            pendingConfessionsId: JSON.parse(localStorage.getItem("pendingConfessions"))
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult && fetchMoreResult.confessionPending.length === 0) {
                                return previousResult;
                            }
                            let unionFetch = Object.assign({}, previousResult, {
                                confessionPending: [...previousResult.confessionPending, ...fetchMoreResult.confessionPending]
                            });
                            unionFetch.confessionPending = _.uniqBy(unionFetch.confessionPending, "_id");
                            return unionFetch;
                        }
                    });
                }
            };
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)
)(FilterContainer);
