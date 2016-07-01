var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {
 
    create();
   
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var sources = creep.room.find(FIND_SOURCES);
        var sourceForCreep = sources[0];
        
        // If there is more than one source every harvester is randomly assigned to one of the sources.
        if (creep.memory.sourceId === undefined){
            if (sources.length>1)    {
                sourceToMine = sources[rand(0,sources.length-1)];
               
            }
            creep.memory.sourceId = sourceToMine.id;
            console.log(creep.name+"  role: "+creep.memory.role+ " source: "+creep.memory.sourceId);
        }
        sourceToMine = Game.getObjectById(creep.memory.sourceId);
       
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, sourceToMine);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, sourceToMine);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, sourceToMine);
        }
    }        
}

	// Getting an integer random number wihtin the defined borders.
    var rand = function(min, max) {	
        return Math.floor(Math.random() * (max - min + 1)) + min       
    }

    var create = function() {

    	clean();

    	if (createCreep('harvester', 6, [WORK, CARRY, CARRY, MOVE])){
    		return;
    	}
    	if(createCreep('upgrader', 4, [WORK, WORK, CARRY, MOVE])){
    		return;
    	}
    	if(createCreep('builder', 4, [WORK, WORK, CARRY,MOVE])){
    		return;
    	}
               
	}

    var	createCreep = function(roleTyp, counter, work){
        var exisitingCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleTyp);
        console.log(roleTyp + ": " + exisitingCreeps.length);

        if(exisitingCreeps.length < counter) {
            var newName = Game.spawns.Spawn1.createCreep(work, undefined, {role: roleTyp});
            console.log('Spawning new '+roleTyp+' : ' + newName);
            return true;
        }
        return false;
	}

    var	clean = function(){
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}