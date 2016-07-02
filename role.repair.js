var roleRepair = {

	run : function(creep, source) {
		
		setHarvestFlagForCreep(creep)
    	
    	if (creep.memory.harvesting) { 
    		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {  	    		
    			creep.moveTo(source);    			
    		}
    	}else{    	
			var structures = getTargetsForRepair(creep);
	
			for (var i=0;i<structures.length;i++){
				var item = structures[i];	

				if (!creep.pos.isNearTo(item)) {
					creep.moveTo(item);
				} else {
					creep.repair(item)
				}
			}
    	}
	}
}

function getTargetsForRepair(creep){
	return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_SPAWN ||
                    structure.structureType === STRUCTURE_TOWER ||
                    structure.structureType ===  STRUCTURE_ROAD) && (structure.hits < structure.hitsMax);
        }
	});
}

function setHarvestFlagForCreep(creep){	
    
	if (creep.carry.energy === 0){
		 creep.memory.harvesting = true;
	}
		
	if (creep.carry.energy === creep.carryCapacity){
		 creep.memory.harvesting = false;
	}	
}

module.exports = roleRepair;
