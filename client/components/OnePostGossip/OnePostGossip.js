import React from "react";
import PropTypes from "prop-types";
// import Moment from "react-moment";

import styles from "./style.scss";
import CommentArea from "../Comment/CommentArea";
import PostLanding from "../postlanding/PostLanding";

export default class OnePostGossip extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTemplate(props) {
        if (props && props.gossip) {
            return (
                <article className="tg-post tg-blockpuote">
                    <figure>
                        {/* <img src={ props.confession.status_link } alt="image description"/> */}
                    </figure>
                    <div className="tg-post-content">
                        <div className="post-meta category-name">
                            <span><a href="#">block quote</a></span>
                        </div>
                        <h3>
                            <a href="#">
                                {/* <Moment format="DD/MM/YYYY">{props.gossip.status_published.toString()}</Moment> */}
                            </a></h3>
                        <div className="post-meta">
                            <span className="date">Posted by: User</span>
                        </div>
                        <div className="description">
                            <p className={ styles.paragraph }>{props.gossip.status_message }</p>
                        </div>
                    </div>
                </article>
            );
        } else {
            return (
                <PostLanding/>
            );
        }
    }

    render() {
        return (
            <main id="main" className="haslayout">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            {this.renderTemplate(this.props)}
                            <CommentArea statusId = {this.props.params.statusId} commentsList = {this.props.params.commentsList}
                                insertComment = {this.props.params.insertComment}/>
                        </div>
                        {/* <Aside/> */}
                        <div id="aside-area"></div>
                    </div>
                </div>
            </main>

        );
    }
}

OnePostGossip.propTypes = {
    gossip: PropTypes.object,
    params: PropTypes.object.isRequired
};
