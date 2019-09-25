import React from "react";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import PropTypes from "prop-types";
// import "bootstrap/js/modal";
// import "bootstrap/js/dropdown";
// import "bootstrap/js/tooltip";
// import Aside from "../Aside/Aside";

export default class WriteConfession extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.getPreStore()
        };
        this.handle();
    }

    //retrieve the pre-stored value
    getPreStore() {
        var storedValue = localStorage.getItem("pre-send");
        return storedValue ? storedValue : "";
    }

    handle() {
        this.onChange = this.onChange.bind(this);
        this.onInit = this.onInit.bind(this);
    }
    onChange(text) {
        this.setState({text: text});
        this.setLocalStorage(text);
    }

    setLocalStorage(text) {
        localStorage.setItem("pre-send", text);
    }

    saveData() {
        const {text} = this.state;
        this.props.submit({
            variables: {
                newPost: text,
                newTitle: "testingV1"
            }
        });
        this.resetNote();
    }

    resetNote() {
        this.setState({text: null}, () => {
            this.setLocalStorage("");
            ReactSummernote.reset();
            this.initButton();
        });
    }

    initButton() {
        var openBtn = '<button id="openFileBtn" type="button" class="btn btn-default btn-sm btn-small"><i class="fa fa-paper-plane"> GỬI</i></button>',
            fileGroup = '<div class="note-file btn-group">' + openBtn + "</div>";
        $(fileGroup).prependTo($(".note-toolbar"));
        document.getElementById("openFileBtn").onclick = () => {
            this.saveData();
        };
    }

    onInit() {
        this.initButton();
        $("#openFileBtn").tooltip({container: "body", placement: "bottom"});
    }
    render() {
        const options = {
            height: 450,
            placeholder: "Đây là nơi chứa đựng lời tự thú của các bạn",
            disableDragAndDrop: true,
            dialogsFade: true,
            toolbar: [
                ["font", ["bold", "underline", "clear"]],
                ["fontname", ["fontname"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["insert", ["link"]],
                ["view", ["fullscreen", "undo", "redo"]],
                ["misc", ["post"]]
            ]
        };
        return (
            <main id="main" className="haslayout">
                <div id="twocolumns" className="container">
                    <div className="row">
                        <div id="content" className="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                            <article className="tg-post tg-audio-post">
                                <div className="tg-post-content" style={{textAlign: "left"}}>
                                    <ReactSummernote
                                        value={this.state.text}
                                        options={options}
                                        onChange={this.onChange}
                                        onInit={this.onInit}
                                    />
                                </div>
                            </article>
                        </div>

                        <div id="aside-area"></div>
                    </div>
                </div>
            </main>
        );
    }
}

WriteConfession.propTypes = {
    submit: PropTypes.func.isRequired
};
