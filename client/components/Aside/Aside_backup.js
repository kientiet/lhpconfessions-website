import React from "react";

export default class Aside extends React.Component {
    render() {
        return (
            <aside id="sidebar" className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6  col-xs-6 widget-width">
                        <div className="tg-widget tg-recent-post">
                            <h4><span>Hot posts of day</span></h4>
                            <div className="recent-post">
                                <ul>
                                    <li>
                                        <div className="post-thumb">
                                            <a href="#">
                                                <img src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/10947215_808859399181902_4149415249458598237_n.jpg?oh=ac7ff155b5a4674a6449807eeedf9d21&oe=5A154B24"
                                                    alt="image description" style={{width: "75px", height: "75px"}}/>
                                            </a>
                                        </div>
                                        <div className="post-data">
                                            <h5><a href="#">#1_24/1
                                                        Festival Lê Hồng Phong sắp tới rồi, mà bh chưa có vé với bồ nữa...
                                                        Ai làm bồ tui hôm đó với</a></h5>
                                            <span className="author-name">By: <a href="#">Kien Tiet</a></span>
                                            <span className="date">Sep, 05 2015</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="post-thumb">
                                            <a href="#">
                                                <img src="https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/1610881_822021587865683_2190101458383457052_n.jpg?oh=a032edf46c0d1b3f1358c1c132604678&oe=5A5B2ADA"
                                                    alt="image description" style={{width: "75px", height: "75px"}}/>
                                            </a>
                                        </div>
                                        <div className="post-data">
                                            <h5><a href="#">Happy new year</a></h5>
                                            <span className="author-name">By: <a href="#">Rick Allenson</a></span>
                                            <span className="date">Sep, 05 2015</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}
