var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, source) {

    	setBuildFlagForCreep(creep);

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
            	var structures = getTargetsForRepair(creep);
            	
    			for (var i=0;i<structures.length;i++){
    				var item = structures[i];	
    				if (!item){
    					continue;
    				}

    				if (!creep.pos.isNearTo(item)) {
    					creep.moveTo(item);
    				} else {
    					creep.repair(item)
    				}
    			}
            }
	    }
	    else {	     
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
	    }
	}
};

function setBuildFlagForCreep(creep){	
    
    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }

}


function getTargetsForRepair(creep){
	for (var i ; i<creep.memory.targetsForRepair.length;i++){
		if (item[i].hits==item[i].hitsMax){
			delete creep.memory.targetsForRepair[i];
		}
	}
	
	
	if (!creep.memory.targetsForRepair){
		creep.memory.targetsForRepair = creep.room.find(FIND_STRUCTURES, {
	        filter: (structure) => {
	            return (structure.structureType === STRUCTURE_EXTENSION ||
	                    structure.structureType === STRUCTURE_SPAWN ||
	                    structure.structureType === STRUCTURE_TOWER ||
	                    ((structure.structureType ===  STRUCTURE_ROAD) && (structure.hits < (structure.hitsMax/4)))||    
	                    structure.structureType ===  STRUCTURE_WALL ||
	                    structure.structureType ===  STRUCTURE_RAMPART) && (structure.hits < structure.hitsMax);
	        }
		});
	}else{
		return creep.memory.targetsForRepair;
	}				
}

module.exports = roleBuilder;