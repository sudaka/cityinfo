const mysql = require("mysql2/promise");
const auth = require('./auth.js');

var execreq = async function(req) {
    let cnn = await mysql.createConnection({
      host: auth.getbdhost(),
      user: auth.getbdlogin(),
      database: auth.getbdname(),
      password: auth.getbdpass()
    });
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
