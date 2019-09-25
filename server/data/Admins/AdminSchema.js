import mongoose from "mongoose";

let AdminSchema = new mongoose.Schema({
    userId: String,
    realName: String,
    confessionName: String,
    imgURL: String,
    addedBy: String,
    insertedDate: String
});

AdminSchema.set("JSON", {getters: true});

var Admins = mongoose.model("confessions", AdminSchema);

module.exports = Admins;
