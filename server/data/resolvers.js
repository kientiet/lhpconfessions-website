import {Confessions, Gossip, Comments} from "./connectors";
import {getUserConfessions} from "./Users/UserQuery";
import {createComment} from "./Comments/CommentQuery";

import {ObjectId} from "mongodb";
import {createPost} from "./Confessions/ConfessionQuery";
import {gossipCreatePost} from "./Gossips/GossipQuery";
// import {queryData} from "../mlab/helpers";
// import {getPosts} from "./Confessions/ConfessionQuery";
// import tempImgURL from "../utils/tempImg";

const resolvers = {
    Query: {
        confessionList() {
            return Confessions.find().lean().limit(5);
        },

        userConfessions(root, {userId}) {
            return getUserConfessions(userId);
        },

        confessionWithId(root, {statusId}) {
            console.log(statusId);
            return Confessions.findOne({status_id: statusId});
        },

        gossipWithId(root, {statusId}) {
            statusId = new ObjectId(statusId);
            return Gossip.findOne({_id: statusId});
        },

        confessionPending(root, args) {
            try {
                let postId = [];
                if (args && args.pendingConfessionsId && args.pendingConfessionsId.length > 1) {
                    args.pendingConfessionsId.forEach(function(element) {
                        postId.push(new ObjectId(element));
                    }, this);
                }
                return Confessions.find({type: "pending", _id: {$nin: postId}}).lean().limit(5);
            } catch (error) {
                console.log(error);
            }
        },

        gossipFeed(root, args) {
            try {
                // For now, just return by timeline of the gossip
                // Later, we can change to "smart" query

                let finalDate = "";

                if (args && args.hasOwnProperty("finalDate")) {
                    if (args.finalDate === "") {
                        // return Gossip.find({}).lean().limit(6).then((error, result) => {
                        //     if (error) {
                        //         console.log(error);
                        //     } else  {
                        //         console.log(result);
                        //     }
                        // });
                        return Gossip.find({}).sort({status_published: -1}).lean().limit(6);
                    }
                    finalDate = args.date;
                }

                return Gossip.find({status_published: {$lt: finalDate}}).sort({status_published: -1}).lean().limit(6);
            } catch (error) {
                console.log(error);
            }
        },

        commentWithStatusId(root, args) {
            try {
                // Remember to check typeof of loaddedCommentsId
                if (args && args.hasOwnProperty("statusId") && args.hasOwnProperty("loadedCommentsId")) {
                    let loadedCommentsId = [];
                    args.loadedCommentsId.forEach(function(element) {
                        loadedCommentsId.push(new ObjectId(element));
                    }, this);

                    // console.log(args);
                    console.log(loadedCommentsId);
                    return Comments.find({status_id: args.statusId, _id: {$nin: loadedCommentsId}}).sort({comment_published: 1}).lean().limit(5);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {
        updateConfessionStatus(root, args) {
            try {
                let updateRecord = new Promise((resolve) => {
                    Confessions.findOne({_id: args.postId}).exec((error, post) => {
                        post.type = args.status;
                        post.save((error) => {
                            if (!error) {
                                resolve(Confessions.find({_id: args.postId}).lean());
                            }
                        });

                    });
                });
                return updateRecord;
            } catch (error) {
                console.log(error);
            }
        },

        addConfession: (_, args) => {
            const post = {
                message: args.newPost,
                title: args.newTitle,
                type: "pending"
            };
            createPost(post);
        },

        addGossip(root, args) {
            try {
                if (args && args.hasOwnProperty("userId") && args.hasOwnProperty("newPost")) {
                    return gossipCreatePost(args);
                }
                return "Not complete attribute";
            } catch (error) {
                console.log(error);
            }
        },

        // How to through back error to apollo???
        addComment(root, args) {
            try {
                if (args && args.hasOwnProperty("userId") && args.hasOwnProperty("newComment") && args.hasOwnProperty("statusId")) {
                    return createComment(args);
                }
                console.log("Not complete attribute");
                return "Not complete attribute";
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
};

export default resolvers;
