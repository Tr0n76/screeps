
var controllerCreeps = require('controller.creeps');
var roleTower = require('role.tower');


module.exports.loop = function(){
	
	   controllerCreeps.run();
	   
	   roleTower.run();
	   
}

