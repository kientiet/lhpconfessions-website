/* eslint-disable new-cap */

import {
    Comments
} from "../connectors";
import Mongoose from "mongoose";
import Moment from "moment";
// Mongoose.set("debug", true);
// import _ from "lodash";

function initStatus() {
    return {
        "userId": "",
        "status_id": "",
        "comment_message": "",
        "comment_published": "",
        "status": "post", // It could be block and post
        "AdminId": ""
    };
}

export function createComment(newComment) {
    let value = initStatus();
    value.comment_message = newComment.newComment;
    value.userId = newComment.userId;
    value.status_id = newComment.statusId;
    value.id = Mongoose.Types.ObjectId();
    value.comment_published = Moment().valueOf();

    return Comments.collection.insert(value, function(err) {
        if (!err) {
            console.log("Inserted a document into the collection.");
        }
    });
}
