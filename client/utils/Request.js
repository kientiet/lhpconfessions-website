/**
 * @private
 * @function request
 * @description Make a request to the server and return a promise.
 * @param {string} url
 * @param {object} options
 * @returns {promise}
 */
import rp from "request-promise-native";

export default function request(url, options) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject(new Error("URL parameter required"));
        }
        if (!options) {
            reject(new Error("Options parameter required"));
        }

        rp(url, options)
            .then(response => JSON.parse(response))
            .then(response => {
                if (response.errors) {
                    reject(response.errors);
                }            else {
                    resolve(response);
                }
            })
            .catch(reject);
    });
}
