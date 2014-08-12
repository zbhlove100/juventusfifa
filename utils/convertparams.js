exports.generateparams = function(req){
	var params = {}
	params.userid = req.session.user_id;
	params.username = req.session.user_name;
	return params;
}