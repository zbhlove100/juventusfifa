var mysql      = require('mysql');

function getmysqlconnection(){
  var mysqlconnection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'zbhxzz'
	});
  return mysqlconnection;
}
export.getconnetion = function(type){
	switch(type){
		case "mysql":
			return getmysqlconnection();
			break;
	}
}