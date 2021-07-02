const mysql = require("mysql2/promise");
const auth = require('./auth.js');

var execreq = async function(req) {
    let cnn = await mysql.createConnection(auth.getDbAuth());
    try {
            const [rows, fields] = await cnn.execute(req);
            return [null,rows,fields]
        } catch (e) {
            return [e,'',''];
        } finally {
            //console.log('=======end conn=========');
            cnn.end();
        }

};
 
module.exports.execreq = execreq;
