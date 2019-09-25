import React from "react";
import PropTypes from "prop-types";

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("Each comment", this.props);
        return (
            <li>
                <div className="author">
                    <div className="author-img">
                        <img src={this.props.authorImage} alt="image description"/>
                    </div>
                    <div className="meta">
                        <span className="name">{this.props.authorName}</span>
                        <span className="date">{this.props.commentDate}</span>
                    </div>
                </div>
                <div className="description">
                    <p>{this.props.commentContent}</p>
                </div>
            </li>

        );
    }
}

Comment.propTypes = {
    authorImage: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    commentDate: PropTypes.string.isRequired,
    commentContent: PropTypes.string.isRequired
};

Comment.defaultProps = {
    authorImage: "",
    authorName: "",
    commentDate: "",
    commentContent: ""
};
