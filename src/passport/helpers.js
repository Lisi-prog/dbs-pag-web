const bcrypt = require("bcrypt-nodejs");

const helpers = {}

helpers.encryptPassword = async (password) => {
    return await bcrypt.hashSync(password, await bcrypt.genSaltSync(10))
};

helpers.comparePassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;