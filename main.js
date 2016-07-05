
var controllerCreeps = require('controller.creeps');
var controllerTower = require('controller.tower');


module.exports.loop = function(){
	
	   controllerCreeps.run();	   
	   controllerTower.run();
	   
}

