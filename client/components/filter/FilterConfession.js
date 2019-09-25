import React from "react";
import PropTypes from "prop-types";

import FilterPost from "./FilterPost";

export default class FilterConfession extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const contentArea = document.getElementById("content"),
            contentAreaHeight = Math.max(contentArea.clientHeight, contentArea.scrollHeight, contentArea. offsetHeight);

        if (window.pageYOffset - contentAreaHeight >= 20 && (!this.state.isLoading)) {
            this.setState({
                isLoading: true
            });
            this.props.loadMoreStatus();
        }
    }

    SAFE_componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props.confessions) {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        let confessions = this.props.confessions;
        return (
            <main id="main" className="haslayout">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            {Object.keys(confessions).map((item, index) => {
                                if (confessions[item].status_message && confessions[item].type && confessions[item].type === "pending") {
                                    return (
                                        <FilterPost key={ index }
                                            postId={confessions[item]._id}
                                            content={confessions[item].status_message}
                                            date={confessions[item].status_published}
                                            updateMutation={this.props.updateMutation}
                                        />);
                                }
                            }
                            )}
                        </div>

                        <div id="aside-area"></div>

                    </div>
                </div>
            </main>
        );
    }
}

FilterConfession.propTypes = {
    confessions: PropTypes.array.isRequired,
    loadMoreStatus: PropTypes.func.isRequired,
    updateMutation: PropTypes.func.isRequired
};
