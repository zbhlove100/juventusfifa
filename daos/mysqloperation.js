var connectionpool = require('./initconnection.js');

var mysqlcon = connectionpool.getconnetion("mysql");

function startconnect(){
	mysqlcon.concet();
}
function endconnect(){
	mysqlcon.end();
}