import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import cx from "classnames";
import Moment from "react-moment";

import styles from "./style.scss";
import * as ModalActionsCreator from "../../actions/ModalActions";

export class MiniPost extends React.Component {
    constructor(props) {
        super(props);
    }

    show() {
        // this.props.openModal(imgURL);
        const {actions} = this.props,
            currentModal = this.props.ModalStore.Modal;

        actions.showImage(currentModal, this.props.postImage);
    }

    onePostURL() {
        return "/onepost/" + this.props.postId;
    }

    render() {
        return (
            <div id={ this.props.postId } className={cx("col-lg-4 col-md-4 col-sm-4 col-xs-6 post-width", styles.fadeIn)}>
                <article className="tg-post">
                    <figure>
                        <img className={styles.imageProp} src={this.props.postImage} alt="image description"/>
                        <div className="tg-img-hover">
                            <div className="holder">
                                <a href="#"><i className="fa fa-link"></i></a>
                                <a onClick={() => this.show()}><i className="fa fa-search-plus"></i></a>
                            </div>
                        </div>
                    </figure>
                    <div className="tg-post-content">
                        <h3>
                            <a href="#">
                                <Moment format="DD/MM/YYYY">{this.props.postDate}</Moment>
                            </a>
                        </h3>
                        <div className="post-meta">
                            <span className="date">posted by: {this.props.postBy}</span>
                        </div>
                        <div className={cx(styles.description, "description")}>
                            <p>{this.props.postDescription}.</p>
                        </div>
                        <a href={ this.onePostURL() } className="tg-btn-countinuereading">countinue reading</a>
                        <div className="tg-post-foot">
                            <div className="post-meta pull-left">
                                <span className="tg-post-author">Reactions : <a href="#">{this.props.postReactions}</a></span>
                            </div>
                            <div className="post-meta pull-right">
                                <span className="tg-post-author"><a href="#">{this.props.postComments} comments</a></span>
                            </div>
                        </div>
                    </div>
                    <ul className="post-social-icons">
                        <h4>Coming features</h4>
                    </ul>
                </article>
            </div>
        );
    }
}

MiniPost.propTypes = {
    postId: PropTypes.string.isRequired,
    postImage: PropTypes.string.isRequired,
    postDescription: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    postBy: PropTypes.string.isRequired,
    postComments: PropTypes.number.isRequired,
    postReactions: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    ModalStore: PropTypes.object.isRequired
};

MiniPost.defaultProps = {
    postBy: "Admin Team",
    postComments: 0,
    postReactions: 0
};

const mapStateToProps = (state, ownProps) => (
        Object.assign({}, ownProps, state)
    ),

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(ModalActionsCreator, dispatch)
    });

export default connect(mapStateToProps, mapDispatchToProps)(MiniPost);
