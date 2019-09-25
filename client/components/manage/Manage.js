import React from "react";
import {Tab, Nav, NavItem, Row, Col} from "react-bootstrap";

// import FilterConfession from "../filter/FilterConfession";

export default class Manage extends React.Component {
    // handleSelect(selectedKey) {
    // }

    render() {
        // const data = [{
        //         name: "Tanner Linsley",
        //         age: 26,
        //         friend: {
        //             name: "Jason Maurer",
        //             age: 23
        //         }
        //     }, {
        //         name: "Tanner Linsley",
        //         age: 26,
        //         friend: {
        //             name: "Jason Maurer",
        //             age: 23
        //         }
        //     }],

        //     columns = [{
        //         Header: "Name",
        //         accessor: "name" // String-based value accessors!
        //     }, {
        //         Header: "Age",
        //         accessor: "age",
        //         Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        //     }, {
        //         id: "friendName", // Required because our accessor is not a string
        //         Header: "Friend Name",
        //         accessor: d => d.friend.name // Custom value accessors!
        //     }];

        return (
            <main id="main" className="haslayout three-columns-post">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="feed-content col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first">
                                <Row className="clearfix">
                                    <Col sm={12}>
                                        <Nav bsStyle="tabs">
                                            <NavItem eventKey="first">
                                                Filter
                                            </NavItem>
                                            <NavItem eventKey="second">
                                                Comming events
                                            </NavItem>
                                        </Nav>
                                    </Col>
                                    <Col sm={12}>
                                        <Tab.Content animation>
                                            <Tab.Pane eventKey="first">
                                                {/* <FilterConfession/> */}
                                                Tab 1 content
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                Tab 2 content
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>

                        <div id="aside-area"></div>

                        {/* <Loader isLoading={this.state.isLoading}/> */}
                    </div>
                </div>
            </main>
        );
    }
}
