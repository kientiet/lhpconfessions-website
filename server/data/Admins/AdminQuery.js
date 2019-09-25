import moment from "moment";

import {
    Admins,
    AdminSchema
} from "./AdminSchema";

module.exports.insertNewAdmin = (adminId, userInformation) => {
    let newAdmin = new AdminSchema({
        userId: userInformation.userId,
        reallyName: userInformation.realName,
        confessionName: userInformation.confessionName,
        imgURL: userInformation.imgURL,
        addedBy: adminId,
        insertedDate: moment().valueOf()
    });
    Admins.find({userId: adminId}).count().exc((error, nCount) => {
        if (nCount > 0) {
            Admins.create(newAdmin);
        }
    });
};
