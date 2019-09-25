import request from "./Request";

const Network = () => {
    const buildUrl = ({id, resource}) => {
            let loc = location.origin,
                parameters = [loc, "v1/api"];
            if (resource) {
                parameters = parameters.concat([resource]);
            }
            if (id) {
                parameters = parameters.concat([id]);
            }

            return parameters.join("/");
        },

        // Default option for every request
        defaultOptions = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        };

    return {

    // /**
    //   * @function post
    //   * @description Make a POST request.
    //   * @param {string} path
    //   * @param {object} body
    //   * @param {object} options
    //   * @returns {promise}
    //   */
        post: (path, body, options = {}) => {
            return request(buildUrl(path), Object.assign(
                options,
                defaultOptions,
                {
                    method: "POST",
                    body: JSON.stringify(body)
                }
            ));
        },

        //  /**
        //   * @function get
        //   * @description Make a GET request.
        //   * @param {string} path
        //   * @param {object} options
        //   * @returns {promise}
        //   */
        get: (path, options = {}) => {
            return request(buildUrl(path), Object.assign(
                options,
                defaultOptions,
                {method: "GET"}
            ));
        },

        //  /**
        //   * @function edit
        //   * @description Make a PUT request.
        //   * @param {string} path
        //   * @param {object} body
        //   * @param {object} options
        //   * @returns {promise}
        //   */
        update: (path, body, options = {}) => {
            return request(buildUrl(path), Object.assign(
                options,
                defaultOptions,
                {method: "PUT"}
            ));
        },

        //  /**
        //   * @function delete
        //   * @description Make a DELETE request.
        //   * @param {string} path
        //   * @param {object} options
        //   * @returns {promise}
        //   */
        delete: (path, options = {}) => {
            return request(buildUrl(path), Object.assign(
                options,
                defaultOptions,
                {method: "DELETE"}
            ));
        },

        ping: () => request(buildUrl(), {method: "GET"})
    };
};

export default Network;
