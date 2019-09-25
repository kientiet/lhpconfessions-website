import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import PropTypes from "prop-types";
import * as GossipActionCreators from "../../client/actions/GossipActions";
import GossipFeed from "../components/gossip/gossipFeed";

let gossipFeedQuery = gql`
    query ($finalDate: String!, $userId: String!) {
        gossipFeed(userId: $userId, finalDate: $finalDate) {
            _id
            status_message
            status_published
            num_reactions
            num_comments
        }
    }
`,

    postGossipQuery = gql`
        mutation($userId: String!, $newPost: String!){
            addGossip(userId: $userId, newPost: $newPost){
                _id
                status_message
                status_published
                num_reactions
                num_comments
            }
        }

`;

export class GossipContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    render() {
        return (
            <GossipFeed gossipContent = {this.props.gossipFeed} loadMoreStatus = {this.props.loadMoreEntries} insertGossip = {this.props.insertGossip}/>
        );
    }
}

GossipContainer.propTypes = {
    gossipFeed: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loadMoreEntries: PropTypes.func.isRequired,
    insertGossip: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
        Object.assign({}, ownProps, state);
    },

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(GossipActionCreators, dispatch)
    });

export default compose(
    graphql(postGossipQuery, {
        props({mutate}) {
            return {
                insertGossip(userId, gossipContent) {
                    mutate({
                        variables: {
                            userId: userId,
                            newPost: gossipContent
                        }
                        // update: (store, {data: {result}}) => {
                        //     console.log(result);
                        //     let unionFetch = Object.assign({}, store, result);
                        //     return unionFetch;
                        //     // if (!fetchMoreResult) {
                        //     //     return previousResult;
                        //     // }
                        //     // let unionFetch = Object.assign({}, previousResult, {
                        //     //     gossipFeed: [...previousResult.gossipFeed]
                        //     // });
                        //     // localStorage.setItem("finalDate", _.min(unionFetch, (eachGossipContent) => eachGossipContent.status_published).status_published);
                        //     // return unionFetch;
                        // }
                    });
                }
            };
        }
    }),

    graphql(gossipFeedQuery, {
        options: () => ({
            variables: {
                userId: localStorage.getItem("userId"),
                finalDate: ""
            },
            fetchPolicy: "network-only"
        }),

        props({data}) {
            let callback = [];
            if (data.gossipFeed) {
                callback = data.gossipFeed;
                let minObject = _.min(callback, (eachGossipContent) => eachGossipContent.status_published);
                localStorage.setItem("finalDate", minObject.status_published);
            }

            return {
                gossipFeed: callback,
                loadMoreEntries() {
                    return data.fetchMore({
                        variables: {
                            userId: localStorage.getItem("userId"),
                            finalDate: ""
                        },

                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) {
                                return previousResult;
                            }
                            let unionFetch = Object.assign({}, previousResult, {
                                gossipFeed: [...previousResult.gossipFeed]
                            });
                            localStorage.setItem("finalDate", _.min(unionFetch, (eachGossipContent) => eachGossipContent.status_published).status_published);
                            return unionFetch;
                        }
                    });
                }
            };
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)
)(GossipContainer);
