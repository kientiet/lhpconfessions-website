/* eslint-disable */
import {bindActionCreators} from "redux";
import React, {Component} from "react";
import {connect} from "react-redux";
import * as GlobalActionCreator from "../actions/GlobalActions";
import * as ModalActionCreator from "../actions/ModalActions";

// import {Header, Footer, Aside, Cover, ModalWrapper} from "components";
import PropTypes from "prop-types";
import ReactDom from "react-dom";

import Header from "./header/Header";
import Cover from "./cover/Cover";
import Footer from "./footer/Footer";
import Aside from "./aside/Aside";
import ModalWrapper from "./modal/ModalWrapper";

import homePage from "../pages/HomePage/HomePage";
import writePage from "../pages/WritePostPage/WritePostPage";
import filterPage from "../pages/FilterPage/FilterPage";
import managePage from "../pages/ManagePage/ManagePage";
import onePostPage from "../pages/OnePostPage/OnePostPage";
import gossipFeedPage from "../pages/GossipFeedPage/GossipFeedPage";
import onePostGossipPage from "../pages/OnePostGossipPage/OnePostGossipPage";

import {IndexRoute, Route, Redirect, Router, Switch} from "react-router-dom";
import {TransitionGroup, CSSTransition, CSSTransitionGroup} from "react-transition-group";

import uuidv1 from "uuid/v1"; // for timestamp
import uuidv4 from "uuid/v4"; // for random

export class Main extends Component {

    // componentDidMount() {
    //     let temp = document.getElementById("aside-area");
    //     ReactDom.render(<Aside/>, temp);
    // }

	componentWillMount() {
		const {actions} = this.props;
        this.AddUserId();
		actions.fetchQuote();
	}

    AddUserId() {
            localStorage.setItem("loading", false);
            if (!localStorage.getItem("userId")) {
                let userId = (uuidv1() + uuidv4()).replace(/-/g, "");
                localStorage.setItem("userId", userId);
            }
    }

    componentDidMount() {
        localStorage.setItem("cover-loaded", true);
    }

    componentWillUnmount() {
        localStorage.setItem("cover-loaded", false);
    }


	componentWillReceiveProps() {
		let temp = document.getElementById("aside-area");
		ReactDom.render(
			<Aside/>, temp);
	}

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.onRouteChanged();
        }
    }

    onRouteChanged() {
        const {actions} = this.props;
        if (localStorage.getItem("cover-loaded"))
            actions.quoteInit();
    }

	render() {
		const props = this.props.Global;
		return (
			<div>
				<Header/>
                {
                    (props.quote.quoteText && !props.init) ?
				        <Cover quote={props.quote.quoteText} author={props.quote.quoteAuthor}/> : null
                }
				<TransitionGroup>
                    <CSSTransition key={this.props.location.key} timeout={500} classNames="fade" mountOnEnter={true} unmountOnExit={true}>
                        <div className="WRAPPER">
    						<Switch location={this.props.location}>
                                <Route path="/write" component={writePage}/>
                                <Route path="/filter" component={filterPage}/>
                                <Route path="/" exact component={homePage}/>
                                <Route path="/manage" component={managePage}/>
                                <Route path="/onepost/:postId" component={onePostPage}/>
                                <Route path="/gossip" component={gossipFeedPage}/>
                                <Route path="/gossipPost/:postId" component={onePostGossipPage}/>
                            </Switch>
                        </div>
                    </CSSTransition>
				</TransitionGroup>

				<ModalWrapper isOpen={this.props.ModalStore.Modal.isOpen} onHide={this.props.ModalStore.Modal.isHidden} component={this.props.ModalStore.Modal.component}/>
				<Footer/>
				<div id="aside-area"></div>
			</div>
		);
	}
}

Main.propTypes = {
	actions: PropTypes.object.isRequired,
	Global: PropTypes.object.isRequired,
	ModalStore: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => (Object.assign({}, ownProps, state)),

	mapDispatchToProps = (dispatch) => ({
		actions: bindActionCreators(Object.assign({}, GlobalActionCreator, ModalActionCreator), dispatch)
	});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
