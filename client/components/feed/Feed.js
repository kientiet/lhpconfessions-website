import React from "react";
import PropTypes from "prop-types";

import style from "./style.scss";
import MiniPost from "./MiniPost";
import Loader from "../loader/Loader";

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            // isOpen: false,
            // modalImage: "",
            // message: "not in bottom",
            confessions: []
        });
        this.handleScroll = this.handleScroll.bind(this);
    }

    getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }

    handleScroll() {
        $(window).scroll(() => {
            if ($(window).scrollTop() + $(window).height() === this.getDocHeight() && (!this.state.isLoading)) {
                this.setState({
                    isLoading: true
                });
                this.props.loadMoreStatus();
            }
        });

    }

    SAFE_componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props.confessions) {
            this.setState({
                isLoading: false
            });
        }
    }

    componentDidMount() {
        this.handleScroll();
    }

    componentWillUnmount() {
        $(window).off("scroll");

    }

    render() {
        let confessions = this.props.confessions;
        return (
            <main id="main" className="haslayout three-columns-post">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="feed-content col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            {Object.keys(confessions).map((item, index) => {
                                if (confessions[item].status_message) {
                                    return (
                                        <MiniPost className={style.fadeInUp}
                                            key={ index }
                                            postId={ confessions[item].status_id }
                                            postImage={ confessions[item].status_link }
                                            postDate={ confessions[item].status_published }
                                            postDescription={ confessions[item].status_message }
                                            postComments={ confessions[item].num_comments }
                                            postReactions={ confessions[item].num_reactions }
                                            openModal={ this.openModal }
                                        />);
                                }
                            }
                            )}
                        </div>

                        <div id="aside-area"></div>

                        <Loader isLoading={this.state.isLoading}/>
                    </div>
                </div>
            </main>
        );
    }
}

Feed.propTypes = {
    coverHeight: PropTypes.number.isRequired,
    confessions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loadMoreStatus: PropTypes.func.isRequired
};

Feed.defaultProps = {
    coverHeight: 0
};
