var roleHarvester = {

    run: function(creep, source) {
    	
    	setHarvestFlagForCreep(creep)
    	
    	console.log("Harvester "+creep.name+" is harvesting "+creep.memory.harvesting +" energy "+creep.carry.energy+" max "+creep.carryCapacity);
    	
    	if (creep.memory.harvesting) { 
    		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {  	    		
    			creep.moveTo(source);
    			return;
    		}
    	}
    	
    	var targets = getTargetsForEnergyTransfer(creep);
		
        if(targets.length > 0) {
        	
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }	           
}


function getTargetsForEnergyTransfer(creep){
	return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
	});
}

function setHarvestFlagForCreep(creep){	
	if (creep.carry.energy == 0){
		 creep.memory.harvesting = true;
		 return;
	}
		
	if (creep.carry.energy == creep.carryCapacity){
		 creep.memory.harvesting = false;
		 return;
	}	
}

module.exports = roleHarvester;