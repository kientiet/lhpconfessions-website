import schema from "./data/schema";
import path from "path";
import webpack from "webpack";
import rp from "request-promise-native";
import graphql from "graphql";
import express from "express";
import WebpackDevServer from "webpack-dev-server";
import historyApiFallback from "connect-history-api-fallback";
import chalk from "chalk";
import cors from "cors";
import {graphqlExpress, graphiqlExpress} from "apollo-server-express";

import webpackConfig from "../webpack.config";
import config from "./config/environment";
// import {getUserLoadedId} from "./data/Users/UserQuery";
// import {getPosts, getPostById} from "./data/Confessions/ConfessionQuery";
// import tempImgURL from "./utils/tempImg";

const api = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    authRoutes = require("./routes/auth"),
    apiRoutes = require("./routes/api");

function quoteOfDay(res) {

    let options = {
        method: "POST",
        uri: config.api.quoteOfDay,
        formData: {
            method: "getQuote",
            format: "json",
            lang: "en",
            key: "2"
        },
        json: true // Automatically stringifies the body to JSON
    };

    rp(options).then((result) => {
        res.json(result);
    });
}

function apiServer() {
    api.use("/v1/api/quoteOfDay", (req, res) => {
        quoteOfDay(res);
    });

    api.use(bodyParser.urlencoded({extended: false}));
    api.use(passport.initialize());

    // load passport strategies
    const localSignupStrategy = require("./utils/passport/local-signup"),
        localLoginStrategy = require("./utils/passport/local-login"),
        authCheckMiddleware = require("./utils/auth-check");
    passport.use("local-signup", localSignupStrategy);
    passport.use("local-login", localLoginStrategy);

    api.use("/api", authCheckMiddleware);

    // pass the authenticaion checker middleware

    api.use("/auth", authRoutes);
    api.use("/api", apiRoutes);
}

function serverStatic_Development() {
    let server = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: "/build/",
        proxy: {
            "/v1/graphql": `http://localhost:${config.graphql.port}`,
            "/v1/api": `http://localhost:${config.graphql.port}`
        },
        stats: {
            colors: true
        },
        hot: true,
        historyApiFallback: true
    });

    // Serve static resources
    server.use("/", () => {
        express.static(path.join(__dirname, "../build"));
    });
    server.use(express.static(path.join(__dirname, "/server/static")));
    server.listen(config.port, () => console.log(chalk.green(`Static assets are listening on port ${config.port}`)));
}

function NoIntrospection(context) {
    return {
        Field(node) {
            if (node.name.value === "__schema" || node.name.value === "__type") {
                context.reportError(
                    new graphql.GraphQLError(
                        "GraphQL introspection is not allowed, but the query contained __schema or __type",
                        [node]
                    )
                );
            }
        }
    };
}

function graphqlServer_Delevelopment() {
    // Launch GraphQL
    api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    api.use("/v1/graphql", cors(), bodyParser.json(), graphqlExpress({schema}));
    api.use("/v1/graphiql", graphiqlExpress({endpointURL: "/v1/graphql"}));
    apiServer();

    api.listen(config.graphql.port, () => console.log(chalk.green(`GraphQL && normal API is listening on port ${config.graphql.port}`)));
}

if (config.env === "development") {
    serverStatic_Development();
    graphqlServer_Delevelopment();

} else if (config.env === "production") {
    const bodyParser = require("body-parser"),
        sslRedirect = require("heroku-ssl-redirect"),
        frameguard = require("frameguard"),
        RateLimit = require("express-rate-limit"),

        limiter = new RateLimit({
            windowMs: 10 * 60 * 1000, // 15 minutes
            max: 50, // limit each IP to 100 requests per windowMs
            delayMs: 5 // disable delaying - full speed until the max limit is reached
        });

    //rate limiter
    api.use(limiter);
    //block deny xframe-origin
    api.use(frameguard({action: "deny"}));
    //redirect http to https heroku
    api.use(sslRedirect());
    api.use(historyApiFallback());
    api.use("/", express.static(path.join(__dirname, "../build")));
    api.use(express.static(path.join(__dirname, "/server/static")));
    api.use("/v1/graphql", bodyParser.json(), graphqlExpress({schema, validationRules: [NoIntrospection]}));

    apiServer();

    api.listen(config.port, () => console.log(chalk.green(`API is listening on port ${config.port}`)));

}
