import React from "react";

export default class Slider extends React.Component {
    render() {
        return (
            <div id="sliding" className="sliding">
                <div className="container">
                    <a href="#" className="show_hide fa fa-close pull-right"></a>
                    <form className="header-search-form">
                        <fieldset>
                            <input type="text" className="form-control" placeholder="Search here..."/>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}
