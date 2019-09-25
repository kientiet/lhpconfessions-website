"use strict";

const path = require("path"),
    webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    precss = require("precss"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    FaviconsWebpackPlugin = require("favicons-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    NpmInstallPlugin = require("npm-install-webpack-plugin"),
    stylesDir = path.join(__dirname, "client/assets/styles"),
    jsDir = path.join(__dirname, "client/assets/js"),
    ROOT_PATH = path.resolve(__dirname);

let appEntry, devtool, plugins;

if (process.env.NODE_ENV === "production") {
    appEntry = [
        path.join(__dirname, "client/index.js")
    ];
    devtool = "source-map";
    plugins = [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new NpmInstallPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new HtmlWebpackPlugin({
            template: require("html-webpack-template"),
            title: "LHP Confessions",
            template: "./client/index.html",
            googleAnalytics: {
                trackingId: "UA-108894233-1",
                pageViewOnLoad: true
            },
            mobile: true,
            inject: false
        }),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        })
    ];
} else {
    appEntry = [
        path.join(__dirname, "client/index.js"),
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server"
    ];
    devtool = "eval";
    plugins = [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
        new webpack.NoErrorsPlugin(),
        new NpmInstallPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        }),
        new HtmlWebpackPlugin({
            title: "LHP Confessions",
            template: "./client/index.html",
            mobile: true,
            inject: false
        }),
        new FaviconsWebpackPlugin("./client/assets/images/logo.png"),
        new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery"
        })
    ];
}

module.exports = {
    node: {
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            "masonry": "masonry-layout",
            "isotope": "isotope-layout",
            actions: path.resolve(ROOT_PATH, "client/actions"),
            utils: path.resolve(ROOT_PATH, "client/utils"),
            reducers: path.resolve(ROOT_PATH, "client/reducers"),
            store: path.resolve(ROOT_PATH, "client/stores"),
            components: path.resolve(ROOT_PATH, "client/components"),
            containers: path.resolve(ROOT_PATH, "client/containers"),
            constants: path.resolve(ROOT_PATH, "client/constants"),
            pages: path.resolve(ROOT_PATH, "client/pages")
        }
    },
    entry: {
        app: appEntry,
        vendor: ["react", "react-dom", "react-mdl", "react-router",  "isotope-layout", "theia-sticky-sidebar"],
        client_css: [
            path.join(stylesDir, "main.css"),
            path.join(stylesDir, "owl.carousel.css"),
            path.join(stylesDir, "owl.transitions.css"),
            path.join(stylesDir, "responsive.css"),
            path.join(stylesDir, "transitions.css"),
            path.join(stylesDir, "bootstrap.min.css")
            // path.join(stylesDir, "font-awesome.min.css"),
            // path.join(stylesDir, "owl.theme.css"),
        ],
        bootstrap: path.join(jsDir, "vendor/bootstrap.js"),
        bootstrapMin: path.join(jsDir, "vendor/bootstrap.min.js"),
        // modernizr: path.join(jsDir, "vendor/modernizr-2.8.3-respond-1.4.2.min.js"),
        // npmPackage: path.join(jsDir, "vendor/npm.js"),
        // theia: path.join(jsDir, "theia-sticky-sidebar.js"),
        // isotop: path.join(jsDir, "isotop.js"),
        // isotopeMin: path.join(jsDir, "isotope.pkgd.min.js"),
        owlCarousel: path.join(jsDir, "owl.carousel.js"),
        fontAwesome: path.join(jsDir, "font-awesome.js"),
        mainJs: path.join(jsDir, "main.js"),
        jQueryMin: path.join(jsDir, "vendor/jquery-1.11.3.min.js")
    },

    output: {
        path: path.join(__dirname, "build"),
        publicPath: "/",
        filename: "[name].js"
    },
    devtool,
    module: {
        // noParse: /node_modules\/ajv\//,
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                loaders: [
                    "style",
                    "css?modules&importLoaders=1" + "&localIdentName=[name]__[local]___[hash:base64:5]!postcss"
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: "url-loader?limit=10000&name=assets/[hash].[ext]"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"

            }]
    },
    postcss: () => [precss, autoprefixer],
    plugins
};
