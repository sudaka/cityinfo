const mysqlfunc = require('./mysqlprom.js');
const auth = require('./auth.js');

module.exports.ClTable = class ClTable {
    creating = false
    constructor(name, iscreating = false, ...tstruct) {
        //check is the tree_tname and treepath_tname exist
        this.creating = iscreating;
        this.tname = name+'_items';
        this.tpname = name+'_tree';
        this.tstruct = tstruct;
        this.notaction = true;
        this.checktablecount();
    }

    infolog() {
        console.log(this.tname);
    }
    checktablecount() {
        return checkAction.apply(this,[inchecktablecount]);
    }

    droptables() {
        return checkAction.apply(this,[indroptables]);
    }
    addItem(parid,data) {
        return checkAction.apply(this,[inAddItem,parid,data]);
    }
}

async function checkAction(accfunc,...args) {
    if (this.notaction) {
        this.notaction = false;
        let output = await accfunc.apply(this,args);
        this.notaction = true;
        return output;
    } else {
        console.log('Please try later.');
        return ['Please try later.','',''];
    }
}

async function indroptables() {
        if ((this.tname.length != 0) && (this.tpname.length != 0)) {
            console.log('Dropping tables ' + this.tname + ', '+this.tname+'...');
            let req = 'DROP TABLE IF EXISTS ' + this.tname + ', ' + this.tpname;
            let [err,results,fields] = await mysqlfunc.execreq(req);
            if (!(err)) {
                console.log('Tables dropped.');
                this.tname = '';
                this.tpname = '';
                return [err,results,fields];
            } else {
                console.log(e);
                return [err,results,fields];
            }   
        } else {
            console.log('Tables is wrong.');
            return ['Tables is wrong.','',''];
        }
}

async function inchecktablecount() {
        let req = "SELECT count(*) as count FROM information_schema.tables where table_name = '"+this.tname+"' or table_name = '"+this.tpname+"'";
        let [err,results,fields] = await mysqlfunc.execreq(req);
        if (!(err)) {
            //create new tree structure in database
            if ((results[0].count == 0) && this.creating) {
                console.log('Creating tables..');
                let req = "CREATE TABLE "+this.tname+" (tid int NOT NULL AUTO_INCREMENT PRIMARY KEY"+this.tstruct+")";
                req +=  " ENGINE=InnoDB DEFAULT CHARSET=latin1";
                await mysqlfunc.execreq(req);
                req = "CREATE TABLE "+this.tpname+" (tpid int NOT NULL AUTO_INCREMENT PRIMARY KEY, anc int DEFAULT NULL, des int DEFAULT NULL, lvl int DEFAULT NULL)";
                req +=  " ENGINE=InnoDB DEFAULT CHARSET=latin1";
                await mysqlfunc.execreq(req);
                return [err,results,fields];
                }
        } else {
            console.log(err);
            return [err,'',''];
        }
        
}

async function inAddItem(parid,data) {
    let req = "INSERT INTO " + this.tname + " VALUES (NULL"+data+")";
    console.log(req);
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
    console.log('Errors: '+err);
}