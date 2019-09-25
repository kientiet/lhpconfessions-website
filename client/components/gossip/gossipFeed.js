import React from "react";
import PropTypes from "prop-types";
import Loader from "../loader/Loader";
import styles from "./styles.scss";
import GossipPost from "./gossipPost";

require("./styles.scss");

export default class GossipFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            // isOpen: false,
            // modalImage: "",
            // message: "not in bottom",
            gossipContent: []
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
        if (nextProps !== this.props.gossipContent) {
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

    clickText() {
        $(".overlay").fadeIn(500);
    }

    clickOverLay() {
        $(".overlay").not(".text").click(function() {
            $(".overlay").fadeOut(500);
            $(".gossip-content").css({"border-bottom": ""});
        });
    }

    removeRed() {
        $(".gossip-content").css({"border-bottom": ""});
    }

    postGossip() {
        // Test the case people not input anything
        let gossipConent = $(".gossip-content").val().trim();
        if (gossipConent === "") {
            $(".gossip-content").css({"border-bottom": "2px solid red"});
        } else {
            this.props.insertGossip(localStorage.getItem("userId"), gossipConent);
            $(".gossip-content").val("");
            $(".overlay").fadeOut(500);
        }
    }

    render() {
        let gossipContent = this.props.gossipContent;
        return (
            <main id="main" className="haslayout three-columns-post">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="feed-content col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            <section className="pending-section">
                                <div>
                                    <img src="http://placehold.it/100/100"/>
                                    <textarea className="gossip-content" placeholder="Wanna gossip today?" onClick={() => this.clickText()} onKeyPress={this.removeRed} rows="10"></textarea>
                                    <input type="submit" value="Post" className="btn btn-success" onClick={() => this.postGossip()}/>
                                </div>
                            </section>

                            <div className={["overlay", styles.overlay].join(" ")} onClick={() => this.clickOverLay()}></div>

                            {Object.keys(gossipContent).map((item, index) => {
                                if (gossipContent[item].status_message) {
                                    return (
                                        <GossipPost className={styles.fadeInUp}
                                            key={ index }
                                            postId={ gossipContent[item]._id }
                                            postImage={ gossipContent[item].status_link }
                                            postDate={ gossipContent[item].status_published }
                                            postDescription={ gossipContent[item].status_message }
                                            postComments={ gossipContent[item].num_comments }
                                            postReactions={ gossipContent[item].num_reactions }
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

GossipFeed.propTypes = {
    gossipContent: PropTypes.object.isRequired,
    loadMoreStatus: PropTypes.func.isRequired,
    insertGossip: PropTypes.func.isRequired
};
