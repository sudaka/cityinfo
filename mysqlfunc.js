const mysql = require("mysql2");
const auth = require('./auth.js');

module.exports.execreq = function (req,callback) {
let data;
let cnn = mysql.createConnection({
  host: "localhost",
  user: auth.getbdlogin(),
  database: "telegrambot",
  password: auth.getbdpass()
});

/*cnn.execute(req,
  function(err, results, fields) {
    //return results;
    //console.log(err);
    console.log(results[0].id+'   '+results.length); // собственно данные
    //console.log(fields); // мета-данные полей 
});
*/

cnn.execute(req,callback);
cnn.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});

return data;
}
