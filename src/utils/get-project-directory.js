const path = require("path");

const getProjectDir = () => {
    __dirname = path.resolve();
    return __dirname;
}

module.exports = getProjectDir;