import React from "react";
import Slider from "./Slider";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Slider/>
                <header id="header" className="tg-header haslayout">
                    <div className="topbar haslayout">
                        <div className="container">
                            <div className="new-slides pull-left col-lg-4 col-md-5 col-sm-6 col-xs-6">
                                <div id="news-slider">
                                    <div className="item">
                                        <p>Ha Ve Sep 29, 2017</p>
                                    </div>
                                    <div className="item">
                                        <p>First day at school Sep 5, 2017</p>
                                    </div>
                                    <div className="item">
                                        <p>Festival Jan 31, 2018</p>
                                    </div>
                                </div>
                            </div>
                            <div className="search-social pull-right">
                                <ul className="social-icon">
                                    <li><a href="/"><i className="fa fa-home"></i></a></li>
                                    <li><a href="https://www.facebook.com/LhpConfessions/"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="/write"><i className="fa fa-pencil"></i></a></li>
                                    <li><a href="/filter"><i className="fa fa-filter"></i></a></li>
                                </ul>
                                <a href="#" className="btn-search fa fa-search show_hide"></a>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="container">
                        <div className="logo-box haslayout">
                            <strong className="logo">
                                <a href="#">
                                    <img alt="LHP Confessions"/>
                                </a>
                            </strong>
                            <span className="slogn">Nơi cảm xúc thật sự sống lại</span>
                        </div>
                    </div>
                    <nav id="nav" className="navbar navbar-default" data-spy="affix" data-offset-top="205">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/write">Write post</Link></li>
                                    <li><Link to="/filter">Filter</Link></li>
                                    <li><Link to="/gossip">Gossip</Link></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}
