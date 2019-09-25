/* eslint-disable new-cap */
// import _ from "lodash";
import Mongoose from "mongoose";

const bcrypt = require("bcrypt"),
    ConfessionSchema = Mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
            default: Mongoose.Types.ObjectId
        },
        status_id: String,
        status_message: String,
        link_name: String,
        status_type: String,
        status_link: String,
        status_published: String,
        num_reactions: Number,
        num_comments: Number,
        num_shares: Number,
        num_likes: Number,
        num_loves: Number,
        num_wows: Number,
        num_hahas: Number,
        num_sads: Number,
        num_angrys: Number,
        type: String
    }),

    GossipSchema = Mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
            default: Mongoose.Types.ObjectId
        },

        status_message: String,
        status_published: String,
        userId: String,
        num_likes: Number,
        num_reactions: Number,
        num_shares: Number,
        num_comments: Number,
        status: String,
        AdminId: String
    }),

    HistorySchema = Mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
            default: Mongoose.Types.ObjectId
        },
        userId: String,
        loadedId: []
    }),

    CommentSchema = Mongoose.Schema({
        id: {
            type: String,
            required: true,
            unique: true,
            index: true,
            default: Mongoose.Types.ObjectId
        },
        userId: String,
        status_id: String,
        comment_message: String,
        comment_published: String,
        status: String,
        AdminId: String
    }),

    UserSchema = Mongoose.Schema({
        email: {
            type: String,
            index: {unique: true}
        },
        password: String,
        name: String
    });

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

//pre-save hook methods
UserSchema.pre("save", function saveHook(next) {
    const user = this;

    // proceed further only if the password is modified or the user is new
    if (!user.isModified("password")) {
        return next();
    }

    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return next(saltError);
        }

        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            if (hashError) {
                return next(hashError);
            }

            // replace a password string with hash value
            user.password = hash;

            return next();
        });
    });
});

let User = Mongoose.model("user", UserSchema),
    History = Mongoose.model("history", HistorySchema),
    Confessions = Mongoose.model("confessions", ConfessionSchema),
    Gossip = Mongoose.model("gossip", GossipSchema),
    Comments = Mongoose.model("comments", CommentSchema);

export {Confessions, History, User, Gossip, Comments};
