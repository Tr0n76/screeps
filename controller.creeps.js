var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var roleRepair = require('role.repair');

module.exports = {

    run: function(room) {
    	        	
        var creeps = room.find(FIND_MY_CREEPS);
        
    	if (Game.time % 10 === 0){    		
    		create(room, creeps);
    	}
    	
        for(var i=0; i<creeps.length; i++) {	    	
	    	var creep = creeps[i];
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
function create(room, creeps) {
    
	clean();
	
	if (isEmergencyCreepCreation()){	 
		if (createCreep(room, creeps, 'harvester', 4, [WORK, WORK, CARRY, MOVE])){
			return;
		}
	}
	
	if (createCreep(room, creeps, 'harvester', 8, [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE])){
		return;
	}
	if(createCreep(room, creeps, 'upgrader', 2, [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE])){
		return;
	}
	if(createCreep(room, creeps, 'repair', 4, [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE])){
		return;
	}	
	if(createCreep(room, creeps, 'builder', 2, [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,  MOVE, MOVE])){
		return;
	}	
	if(createCreep(room, creeps, 'guard', 2, [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH])){
		return;
	}          
}


// Creates a single creep with the given role and work
function createCreep(room, creeps, roleTyp, counter, work){
    var exisitingCreeps = _.filter(creeps, (creep) => creep.memory.role == roleTyp);          

    if(exisitingCreeps.length < counter) {
        var spawns = (room.find(FIND_MY_SPAWNS));
        var newName = spawns[0].createCreep(work, undefined, {role: roleTyp});
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
