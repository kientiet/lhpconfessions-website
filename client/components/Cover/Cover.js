/* eslint-disable global-require */
import React from "react";
import PropTypes from "prop-types";

export default class Cover extends React.Component {

    render() {
        return (
            <div>
                {
                    (this.props.quote) ?
                        <div id="cover" className="tg-banner haslayout">
                            <div className="container">
                                <div className="tg-banner-poststyle">
                                    <figure>
                                        <a href="#">
                                            <img src="https://scontent.fsnc1-1.fna.fbcdn.net/v/t31.0-8/28061452_1634262949974872_8523583212680958485_o.jpg?_nc_cat=0&oh=b8ce8877b89aa37c391cac2cf368b1f9&oe=5BF975DC"
                                                alt="image description"/>
                                        </a>
                                    </figure>
                                    <div className="post-content">
                                        <div className="display-table">
                                            <div className="display-table-cell">
                                                <div className="post-meta">
                                                    <span>Sep 14 2017</span>
                                                </div>
                                                <div className="title">
                                                    <h2><i>{this.props.quote}</i></h2>
                                                </div>
                                                <div className="post-meta no-padding">
                                                    <span>
                                                        <a href="#">
                                                            <i className="fa fa-user"></i>
                                                            <em> {this.props.author}</em>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }
            </div>
        );
    }
}

Cover.propTypes = {
    quote: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
};
