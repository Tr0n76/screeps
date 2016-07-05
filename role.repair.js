module.exports  = {

	run : function(creep, source) {
		
		setRepairFlagForCreep(creep)
    	
    	if (creep.memory.repair) {     		    
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
		
		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {  	    		
			creep.moveTo(source);    			
		}
	}
}

var repairList = null;

function setRepairFlagForCreep(creep){	
    
    if(creep.memory.repair && creep.carry.energy == 0) {
        creep.memory.repair = false;
    }
    if(!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repair = true;
    }

}

function getTargetsForRepair(creep){	
	var targets = Memory.targetsForRepair;	
	
	if ((!Memory.targetsForRepair)||(Memory.targetsForRepair.length===0)){
		targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {	           
						return (structure.structureType === STRUCTURE_EXTENSION ||
	                    structure.structureType === STRUCTURE_SPAWN ||
	                    structure.structureType === STRUCTURE_TOWER ||
	                    ((structure.structureType ===  STRUCTURE_ROAD) && (structure.hits < (structure.hitsMax/4)))||    
	                    structure.structureType ===  STRUCTURE_WALL ||
	                    structure.structureType ===  STRUCTURE_RAMPART) && (structure.hits < structure.hitsMax);
	        }
		});
	}
	
	console.log("Targets for repair : "+targets.length);
	
	return targets;
 }

function clearRepairList(targets){
	for (var i ; i<repairList.length;i++){
		if (item[i].hits==item[i].hitsMax){
			repairList.splice[i];
		}
	}
}

