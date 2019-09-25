import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Modal from "react-bootstrap-modal";
import PropTypes from "prop-types";

import styles from "./style.scss";
import ModalImage from "./ModalImage";
import ModalDeletePost from "./ModalDeletePost";
import * as ModalActionsCreator from "../../actions/ModalActions";

export class ModalWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTemplate(props) {
        if (props.modalFor) {
            switch (props.modalFor) {
                case "image":
                    return <ModalImage ModalImage={props.modalImage}/>;
                case "deletePost":
                    return <ModalDeletePost/>;

                default:
                    return null;
            }
        }
    }

    isModalOpen() {
        return this.props.ModalStore.Modal.isOpen;
    }

    isModalClose() {
        return this.props.ModalStore.Modal.isHidden;
    }

    render() {
        const {actions} = this.props,
            modalProps = this.props.ModalStore.Modal;
        return (
            <Modal
                show={modalProps.isOpen}
                onHide={() => actions.closeModal(modalProps)}
                aria-labelledby="ModalHeader"
                className={styles.modal}
            >
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>{modalProps.component.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderTemplate(modalProps.component)}
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Dismiss className="btn btn-default"
                        onClick={() => actions.closeModal(modalProps)}
                    >
                        Cancel
                    </Modal.Dismiss>

                </Modal.Footer>
            </Modal>
        );
    }
}

ModalWrapper.propTypes = {
    actions: PropTypes.object.isRequired,
    ModalStore: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => (
        Object.assign({}, ownProps, state)
    ),

    mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(ModalActionsCreator, dispatch)
    });

export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
