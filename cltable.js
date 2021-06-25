const mysqlfunc = require('./mysqlfunc.js');
const auth = require('./auth.js');

module.exports.ClTable = class ClTable {
    creating = false
    constructor(name, iscreating = false, ...tstruct) {
        //check is the tree_tname and treepath_tname exist
        this.creating = iscreating;
        this.tname = 'tree_'+name;
        this.tpname = 'treepath_'+name;
        this.tstruct = tstruct;
        let req = "SELECT count(*) as count FROM information_schema.tables where table_name = '"+this.tname+"' or table_name = '"+this.tpname+"'";
        mysqlfunc.execreq(req, checktablecount.bind(this));
    }

    infolog() {
        console.log(this.tname);
    }
}

function checktablecount(err,results,fields) {
    //logreqresults(err,results,fields)
    if (!(err)) {
        //create new tree structure in database
        if ((results[0].count == 0) && this.creating) {
            let req = "CREATE TABLE "+this.tname+" (tid int NOT NULL AUTO_INCREMENT PRIMARY KEY"+this.tstruct+")";
            req +=  " ENGINE=InnoDB DEFAULT CHARSET=latin1";
            mysqlfunc.execreq(req, checkerror.bind(this));
            req = "CREATE TABLE "+this.tpname+" (tpid int NOT NULL AUTO_INCREMENT PRIMARY KEY, anc int DEFAULT NULL, des int DEFAULT NULL, lvl int DEFAULT NULL)";
            req +=  " ENGINE=InnoDB DEFAULT CHARSET=latin1";
            mysqlfunc.execreq(req, checkerror.bind(this));
            }
    }
    //console.log(results[0].count);    
}

function checkerror(err,results,fields) {
    if (err) {console.log(err);} 
}

function logreqresults(err,results,fields) {
    for (let key in results) {
        for (let key1 in results[key]) {console.log('data from main func:   '+results[key][key1]+' key:'+key+' key1:'+key1);}
    }
    for (let key in fields) {
        for (let key1 in fields[key]) {console.log('fields from main func:   '+fields[key][key1]+' key:'+key+' key1:'+key1);}
    }
    console.log(err);
}