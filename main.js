var controllerBuild = require('controller.build');
var controllerCreeps = require('controller.creeps');
var controllerTower = require('controller.tower');


module.exports.loop = function(){
	
	for(var name in Game.rooms) {		
		 var room = Game.rooms[name];
		 
		   controllerCreeps.run(room);	   
		   controllerTower.run(room);
		   controllerBuild.run(room);
		
    } 	   
}

