/* eslint-disable new-cap */

import {
    Gossip
} from "../connectors";
import Mongoose from "mongoose";
import Moment from "moment";
// Mongoose.set("debug", true);
// import _ from "lodash";

function initStatus() {
    return {
        "status_message": "",
        "status_published": "",
        "userId": "",
        "num_likes": 0,
        "num_reactions": 0,
        "num_shares": 0,
        "num_comments": 0,
        "status": String,
        "AdminId": String
    };
}

export function gossipCreatePost(newPost) {
    let value = initStatus();
    value.status_message = newPost.newPost;
    value.userId = newPost.userId;
    value._id = Mongoose.Types.ObjectId();
    value.status_published = Moment().valueOf();

    return Gossip.collection.insert(value, function(err) {
        if (!err) {
            console.log("Inserted a document into the collection.");
        }
    });
}

// export function getPosts(userId, loadedIdArray) {
//     return Confessions.find({status_id: {$nin: loadedIdArray}}).lean().limit(6).exec((err, confessions) => {
//         if (!err) {
//             let newPostsId = _.map(confessions, "status_id");
//             updateLoadedId(userId, newPostsId);
//         } else {
//             console.log(err);
//         }
//     });
// };

// export function getPostById(postId) {
//     return Confessions.findOne({status_id: postId}).lean().exec(() => {
//     });
// };
