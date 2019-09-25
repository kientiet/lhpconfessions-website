import React from "react";
import PropTypes from "prop-types";

import Comment from "./Comment";

export default class CommentArea extends React.Component {
    constructor(props) {
        super(props);
        this.submitComment = this.submitComment.bind(this);
    }

    submitComment(e) {
        if (e.keyCode === 13) {
            let content = $(".comment-box").val().trim();
            this.props.insertComment(content, localStorage.getItem("userId"), this.props.statusId);
            $(".comment-box").val("");
            e.preventDefault();
        }
    }

    render() {
        let commentsList = this.props.commentsList;
        console.log("Inside Comment:", commentsList);
        if (commentsList && commentsList.hasOwnProperty("length") && commentsList.length > 0) {
            return (
                <div id="comment">
                    <h3>{this.props.commentsList.length} Comments</h3>
                    <textarea className="comment-box" placeholder="gossip today" onKeyDown={this.submitComment}></textarea>
                    <ul>
                        {Object.keys(commentsList).map((index) => {
                            let item = commentsList[index];
                            return (
                                <Comment
                                    key={index}
                                    authorName={item.userId}
                                    commentDate={item.comment_published}
                                    commentContent={item.comment_message}
                                />
                            );
                        }
                        )}
                    </ul>
                </div>
            );

        } else {
            return (
                <div id="comment">
                    <h3>0 Comments</h3>
                    <textarea className="comment-box" placeholder="gossip today" onKeyDown={this.submitComment}></textarea>
                    <ul>
                        Be the first person comments this post.
                    </ul>
                </div>

            );
        }
    }
}

CommentArea.propTypes = {
    numOfComments: PropTypes.number.isRequired,
    commentsList: PropTypes.array.isRequired,
    insertComment: PropTypes.func.isRequired,
    statusId: PropTypes.string.isRequired
};

CommentArea.defaultProps = {
    commentsList: []
};
