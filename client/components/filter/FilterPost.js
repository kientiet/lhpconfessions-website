import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

require("./styles.scss");

export default class FilterPost extends Component {
    constructor(props) {
        super(props);
        this.updateAction = this.updateAction.bind(this);
    }

    updateAction(postId, status) {
        let options = {
            variables: {
                postId: postId,
                adminId: localStorage.getItem("userId"),
                status: status
            }
        };
        this.props.updateMutation(options);
    }

    clickText(postId) {
        $(".overlay." + postId).fadeIn(500);

        $(".showPendingConfessions").css({"height": "150px"});
        $(".showPendingConfessions." + postId).css({"height": "300px"});
    }

    clickOverLay(postId) {
        $(".overlay").not(".text").click(function() {
            $(".overlay." + postId).fadeOut(500);
        });

        $(".showPendingConfessions." + postId).css({"height": "150px"});
    }

    render() {
        return (
            <div>
                <section className={["pending-section", this.props.postId].join(" ")}>
                    <div className={styles.pending}>
                        <img src="http://placehold.it/100/100"/>
                        <textarea className={["showPendingConfessions", this.props.postId]. join(" ")} placeholder="What's in your mind"
                            onClick={() => this.clickText(this.props.postId)} rows="10">{this.props.content}</textarea>
                        <input type="submit" value="Accept" className="btn btn-success" onClick={() => this.updateAction(this.props.postId, "accepted")}/>
                        <br></br>
                        <input type="submit" value="Denied" className="btn btn-danger" onClick={() => this.updateAction(this.props.postId, "deny")}/>
                    </div>
                </section>
                <div className={[styles.overlay, "overlay", this.props.postId].join(" ")} onClick={() => this.clickOverLay(this.props.postId)}></div>
            </div>

            // <article className="tg-post tg-audio-post">
            //     <div className="tg-post-content">
            //         <h3><a href="#">{this.props.title}</a></h3>
            //         <div className="post-meta">
            //             <span className="date">{this.props.date}</span>
            //         </div>
            //         <div className="description">
            //             <p>{this.props.content}</p>
            //         </div>
            //         <div className="tg-post-foot">
            //             <button className="btn btn-default" onClick={() => this.updateAction(this.props.postId, "accepted")}>Accept</button>
            //             <button className="btn btn-default" onClick={() => this.updateAction(this.props.postId, "deny")} style={{marginLeft: "20px"}}>Deny</button>
            //         </div>
            //     </div>
            // </article>
        );
    }
}

FilterPost.propTypes = {
    postId: PropTypes.string.isRequired,
    title: PropTypes.string,
    date: PropTypes.string,
    content: PropTypes.string,
    updateMutation: PropTypes.func.isRequired
};

FilterPost.defaultProps = {
    title: "LHP Confessions"
};
