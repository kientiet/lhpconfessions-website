/* eslint-disable global-require */
import _ from "lodash";

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    api: {
        quoteOfDay: "http://api.forismatic.com/api/1.0/"
    },
    graphql: {
        port: 8000
    },
    mongodb: {
        url: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}/${process.env.MONGODB_COLLECTION}`,
        port: process.env.MONGODB || 27017,
        jwtSecret: "1800DuyDepTraiThongMinhChungTinh"
    }
};

export default _.extend(config, require(`./${config.env}`).default);
