import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import gql from "graphql-tag";
import {graphql, compose} from "react-apollo";
import PropTypes from "prop-types";
// import cssModules from "react-css-modules";
import * as HomeActionCreators from "../../client/actions/HomeActions";
// import Aside from "../aside/Aside";
import Feed from "../components/feed/Feed";

let feedQuery = gql`
    query ($userId: String!) {
        userConfessions(userId: $userId) {
            _id
            status_id
            status_message
            status_link
            status_published
            num_reactions
            num_comments
        }
    }
`;

export class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    getHeight() {

    }

    render() {
        return (
            <Feed confessions={this.props.feedConfessions} actions={this.props.actions} loadMoreStatus={this.props.loadMoreEntries}/>
        );
    }
}
HomeContainer.propTypes = {
    apollo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    Home: PropTypes.object.isRequired,
    feedConfessions: PropTypes.array.isRequired,
    loadMoreEntries: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
        return Object.assign({}, ownProps, state);
    },

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(HomeActionCreators, dispatch)
    });

    // StyledComponent = cssModules(MyAmazingContainer, styles);

export default compose(
    graphql(feedQuery, {
        options: () => ({
            variables: {
                userId: localStorage.getItem("userId")
            },
            fetchPolicy: "network-only"
        }),

        props({data}) {
            let callBack = [];
            if (data.userConfessions) {
                callBack = data.userConfessions;
            }
            return {
                feedConfessions: callBack,
                loadMoreEntries() {
                    return data.fetchMore({
                        variables: {
                            userId: localStorage.getItem("userId")
                        },
                        updateQuery: (previousResult, {fetchMoreResult}) => {
                            if (!fetchMoreResult) {
                                return previousResult;
                            }
                            let unionFetch = Object.assign({}, previousResult, {
                                userConfessions: [...previousResult.userConfessions, ...fetchMoreResult.userConfessions]
                            });
                            // return [];
                            return unionFetch;
                        }
                    });
                }
            };
        }
    }),

    connect(mapStateToProps, mapDispatchToProps)
)(HomeContainer);
