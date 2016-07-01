var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');

module.exports.loop = function(){
	manageCreeps();	   	   
	    for(var name in Game.creeps) {	    	
	    	var creep = Game.creeps[name];
	    	setRoleForCreep(creep);	 
	    }        
}

// Runs the role for the given creep.
var setRoleForCreep = function(creep){
   if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep, getSourceForCreep(creep));
    }
    if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep,  getSourceForCreep(creep));
    }
    if(creep.memory.role == 'builder') {
        roleBuilder.run(creep,  getSourceForCreep(creep));
    }
    if(creep.memory.role == 'guard') {
        roleGuard.run(creep);
    }
} 

// Getting the source for the given creep. If the creep is not assinged to a
// source a source is randomly chossen and saved for the creep.
var getSourceForCreep = function(creep){		
	 var sources = creep.room.find(FIND_SOURCES);
	 var sourceForCreep = sources[0];
	 
	// If there is more than one source every harvester is randomly assigned
	// to one of the sources.
    if (creep.memory.sourceId === undefined){
        if (sources.length>1)    {
            sourceToMine = sources[rand(0,sources.length-1)];               
        }
        creep.memory.sourceId = sourceToMine.id;
        console.log(creep.name+"  role: "+creep.memory.role+ " source: "+creep.memory.sourceId);
    }
    return Game.getObjectById(creep.memory.sourceId);
} 

// Getting an integer random number wihtin the defined borders.
var rand = function(min, max) {	
    return Math.floor(Math.random() * (max - min + 1)) + min       
}

// Creating all the creeps.
var manageCreeps = function() {
	
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
	if(createCreep('guard', 4, [ATTACK, ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH])){
		return;
	}
           
}

// Creates a single creep with the given role and work
var	createCreep = function(roleTyp, counter, work){
    var exisitingCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleTyp);       

    if(exisitingCreeps.length < counter) {
        var newName = Game.spawns.Spawn1.createCreep(work, undefined, {role: roleTyp});
        console.log('Spawning new creep for role '+roleTyp+' with name ' + newName);
        return true;
    }
    return false;
}

// Cleans the memory from dead creeps.
var	clean = function(){
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing dead creep memory:', name);
        }
    }
}
