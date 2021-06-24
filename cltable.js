const mysqlfunc = require('./mysqlfunc.js');
const auth = require('./auth.js');

module.exports.ClTable = class ClTable {
    constructor(tname) {
        this.tname = tname;
    }
    infolog() {
        console.log(tname);
    }
}