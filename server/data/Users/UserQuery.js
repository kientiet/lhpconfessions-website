import {History} from "../connectors";
import {getPosts} from "../Confessions/ConfessionQuery";
import tempImgURL from "../../utils/tempImg";

function insertNewUsers(userId) {
    let options = {
        userId: userId,
        loadedId: []
    };

    History.create(options, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("success");
        }
    });
};

export function getUserLoadedId(userId) {
    try {
        let checkUser = new Promise((resolve, reject) => {
            History.find({userId: userId}).count().exec((error, nCount) => {
                if (error) {
                    reject(error);
                } else if (!nCount) {
                    insertNewUsers(userId);
                    resolve([]);
                } else {
                    History.findOne({userId: userId}).exec((error, loadedIdArray) => {
                        resolve(loadedIdArray.loadedId);
                    });
                }
            });
        });
        return checkUser;
    } catch (error) {
        console.log(error);
    }
};

export function isNewUser(userId) {
    return new Promise((resolve, reject) => {
        History.find({userId: userId}).count().exec((error, nCount) => {
            error ? reject(error) : resolve(nCount);
        });
    });
    // return res;
};

export function getUserConfessions(userId) {
    let loadedId = getUserLoadedId(userId),
        process = new Promise((resolve) => {
            loadedId.then((loadedIdArray) => {
                let confessions = getPosts(userId, loadedIdArray);
                confessions.then((posts) => {
                    posts.forEach(function(item) {
                        let status_link = item.status_link;
                        if ((!status_link) || (status_link === "nan") || (status_link.match(/\.(jpeg|jpg|gif|png)$/) === null)) {
                            let temp = tempImgURL[Math.floor(Math.random() * tempImgURL.length)];
                            item.status_link = temp;
                        }
                        return item;
                    }, this);
                });
                resolve(confessions);
            });
        });

    return process;
}

// export default {getUserLoadedId, isNewUser}
