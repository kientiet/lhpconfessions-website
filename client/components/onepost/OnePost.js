import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import styles from "./style.scss";
// import CommentArea from "../Comment/CommentArea";
import PostLanding from "../postlanding/PostLanding";

export default class OnePost extends React.Component {
    constructor(props) {
        super(props);
    }

    embedURL() {
        let postId = this.props.confession.status_id.split("_");
        return "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FLhpConfessions%2Fposts%2F" + postId[1] + "&width=500";
    }

    renderTemplate(props) {
        if (props && props.confession) {
            return (
                <article className="tg-post tg-blockpuote">
                    <figure>
                        <img src={ props.confession.status_link } alt="image description"/>
                    </figure>
                    <div className="tg-post-content">
                        <div className="post-meta category-name">
                            <span><a href="#">block quote</a></span>
                        </div>
                        <h3>
                            <a href="#">
                                <Moment format="DD/MM/YYYY">{props.confession.status_published}</Moment>
                            </a></h3>
                        <div className="post-meta">
                            <span className="date">Posted by: Admin group</span>
                        </div>
                        <div className="description">
                            <p className={ styles.paragraph }>{props.confession.status_message }</p>
                        </div>
                        <div className="tg-post-foot">
                            <iframe src={this.embedURL()} width="500" height="370" styles={{"border": "none", "overflow": "hidden"}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
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
                            {/* <CommentArea/> */}
                        </div>
                        {/* <Aside/> */}
                        <div id="aside-area"></div>
                    </div>
                </div>
            </main>

        );
    }
}

OnePost.propTypes = {
    confession: PropTypes.object,
    params: PropTypes.object.isRequired
};
