/* eslint-disable new-cap */

import {
    Confessions,
    History
} from "../connectors";
import _ from "lodash";
import Mongoose from "mongoose";
import Moment from "moment";
// Mongoose.set("debug", true);

function updateLoadedId(userId, newPostsId) {
    History.findOne({userId: userId}).exec((err, user) => {
        if (!err) {
            user.loadedId = user.loadedId.concat(newPostsId);
            user.save();
            // Users.update({userId: userId}, {$set: {loadedId: temp}});
        }
    });
}

function initStatus() {
    return {
        "status_id": "testing",
        "link_name": "new hang",
        "status_type": "text",
        "status_message": "none",
        "status_link": "",
        "status_published": 0,
        "num_reactions": 0,
        "num_comments": 0,
        "num_shares": 0,
        "num_likes": 0,
        "num_loves": 0,
        "num_wows": 0,
        "num_hahas": 0,
        "num_sads": 0,
        "num_angrys": 0,
        type: "pending"
    };
}

export function createPost(newPost) {
    let value = initStatus();
    value.link_name = newPost.title;
    value.status_message = newPost.message;
    value._id = Mongoose.Types.ObjectId();
    value.status_published = Moment().valueOf();

    return Confessions.collection.insert(value, function(err) {
        if (!err) {
            console.log("Inserted a document into the collection.");
        }
    });
}

export function getPosts(userId, loadedIdArray) {
    return Confessions.find({status_id: {$nin: loadedIdArray}}).lean().limit(6).exec((err, confessions) => {
        if (!err) {
            let newPostsId = _.map(confessions, "status_id");
            updateLoadedId(userId, newPostsId);
        } else {
            console.log(err);
        }
    });
};

export function getPostById(postId) {
    return Confessions.findOne({status_id: postId}).lean().exec(() => {
    });
};
