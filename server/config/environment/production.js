export default {
    // Put your production configuration here
    mongodb: {
        url: `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DATABASE}/${process.env.MONGODB_COLLECTION}`,
        port: process.env.MONGODB || 27017
    }
};
