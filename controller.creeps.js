var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var roleRepair = require('role.repair');

module.exports = {

    run: function() {
    	        	
    	create();
    	
        for(var name in Game.creeps) {	    	
	    	var creep = Game.creeps[name];
	    	setRoleForCreep(creep);
	    }     
    	
	}
};

// Runs the role for the given creep.
function setRoleForCreep(creep){
   if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep, getSourceForCreep(creep));
    }
    if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep,  getSourceForCreep(creep));
    }
    if(creep.memory.role == 'builder') {
        roleBuilder.run(creep,  getSourceForCreep(creep));
    }
    if(creep.memory.role == 'repair') {
        roleRepair.run(creep, getSourceForCreep(creep));
    }
    if(creep.memory.role == 'guard') {
        roleGuard.run(creep);
    }
} 

// Counts the creeps attached to the given source.
function getCreepCountForSource(source){
	var count = 0;
	 for(var name in Game.creeps) {	    	
	    	var creep = Game.creeps[name];
	    	if (creep.memory.sourceId == source.id){
	    		count++;
	    	}
	 }
	 return count;
}

// Gets the source with the lowest creep count.
function getSourceWithMinCreepCount(creep){
	 var sources = creep.room.find(FIND_SOURCES);

    var minSource = null;
    
	 for (var i = 0; i < sources.length ; i++ ){
		 var tmpSource = sources[i];
		 
	     if (minSource==null){
	         minSource = creep.room.find(FIND_SOURCES)[0];
	     }
		 var minSourceCount = getCreepCountForSource(minSource);
		 var tmpSourceCount = getCreepCountForSource(tmpSource);
		 
	
		 if(minSourceCount >  tmpSourceCount){
			 minSource = tmpSource;
		 }
	 }
	 return minSource;
}

// Getting the source for the given creep. If the creep is not assinged to a
// source a source is randomly chossen and saved for the creep.
function getSourceForCreep(creep){		
	 var sources = creep.room.find(FIND_SOURCES);
	 var sourceToMine = sources[0];
	 
	// If the creep has no assigned source the source with the minimun creep
	// count is set for the creep.
    if (creep.memory.sourceId === undefined){
    	sourceToMine = getSourceWithMinCreepCount(creep);
        creep.memory.sourceId = sourceToMine.id;
        console.log(creep.name+"  role: "+creep.memory.role+ " source: "+creep.memory.sourceId);
    }
    return Game.getObjectById(creep.memory.sourceId);
} 

// Creating all the creeps.
function create(creps) {
	
	clean();
	
	if (isEmergencyCreepCreation()){	 
		if (createCreep('harvester', 8, [WORK, WORK, CARRY, MOVE])){
			return;
		}
	}
	
	if (createCreep('harvester', 6, [WORK, WORK, WORK, CARRY, CARRY,  MOVE, MOVE])){
		return;
	}
	if(createCreep('upgrader', 2, [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE])){
		return;
	}
	if(createCreep('builder', 2, [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE])){
		return;
	}	
	if(createCreep('guard', 4, [ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH])){
		return;
	}
           
}

// Creates a single creep with the given role and work
function createCreep(roleTyp, counter, work){
    var exisitingCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleTyp);          
    if(exisitingCreeps.length < counter) {
        var newName = Game.spawns.Spawn1.createCreep(work, undefined, {role: roleTyp});
        if (newName<0){  
        	return true;
        }
        console.log('Spawning new creep for role '+roleTyp+' with name ' + newName);
        return true;
    }
    return false;
}

// Cleans the memory from dead creeps.
function clean(){
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing dead creep memory:', name);
        }
    }
}

function isEmergencyCreepCreation(){
	var counter = 0;

	for(var name in Game.creeps){
		var creep = Game.creeps[name];
		if(creep.memory.role){
		    if (creep.memory.role === 'harvester'){
		       counter++;
		    }
		}
	}
	
	if (counter<5){
		console.log("Emergency harvesters count "+counter);
		return true;
	}
	return false;
}
