var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');


module.exports.loop = function(){
	   create();
   	   
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

// Counts the creeps attached to the given source.
var getCreepCountForSource = function(source){
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
var getSourceWithMinCreepCount = function(creep){
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
var getSourceForCreep = function(creep){		
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
var create = function() {
	
	clean();
	
	if (createCreep('harvester', 6, [WORK, CARRY, CARRY, MOVE])){
		return;
	}
	if(createCreep('upgrader', 4, [WORK, WORK, CARRY, MOVE])){
		return;
	}
	if(createCreep('builder', 6, [WORK, WORK, CARRY,MOVE])){
		return;
	}
	if(createCreep('guard', 4, [ATTACK, ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH, TOUGH])){
		return;
	}
           
}

var report = function(){
	
	var sources = creep.room.find(FIND_SOURCES);
	
	for (var item in sources){
		console.log("Source "+ item.id + " Creeps "+ getCreepCountForSource(item));
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
