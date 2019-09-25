import AppConstants from "../constants/ActionConstants";
// import rp from "request-promise-native";

export function modalChange(data) {
    return {
        type: AppConstants.MODAL,
        data
    };
}

export function modalInit() {
    let Modal = {
        isOpen: false,
        isHidden: true,
        component: {
            modalTitle: "",
            modalFor: ""
        }
    };
    return (dispatch) => {
        dispatch(modalChange(Modal));
    };
}

function openModal(props) {
    if (props.component && props.component.modalTitle !== "") {
        props.isOpen = !props.isOpen;
        props.isHidden = !props.isOpen;
        return (dispatch) => {
            dispatch(modalChange(props));
        };
    }
    return null;
}

export function closeModal(props) {
    return openModal(props);
}

export function showImage(props, imgURL) {
    props.component.modalTitle = "Show image";
    props.component.modalFor = "image";
    props.component.modalImage = imgURL;
    return openModal(props);
}
