/* eslint-disable no-console, no-shadow */
import mongoose from "mongoose";
// import config from "./config/environment";
import "./api";
import config from "./config/environment";
//Connecting to mongodb

mongoose.Promise = global.Promise;
mongoose.connect(`${config.mongodb.url}`, {
    useMongoClient: true
});

// mongoose.connect(`mongodb://localhost:${config.mongodb.port}/db`, {
//     useMongoClient: true,
//     promiseLibrary: bluebird
// });

var db = mongoose.connection;
db.on("error", ()=> {
    console.log("---FAILED to connect to mongoDB");
});

db.once("open", () => {
    console.log("+++Connected to mongoDB. Succeeded");
});

if (process.env.NODE_ENV !== "production") {
    process.on("SIGINT", function() {
        console.log("\nGracefully shutting down from Duy's Professor (Ctrl+C)");
        var exec = require("child_process").exec;
        (() => {
            var cmd = "npm run stop";
            exec(cmd, function() {
                process.exit();
            });
        })();
    });
}
