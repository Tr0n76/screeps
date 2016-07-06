module.exports  = {

	run : function(creep, source) {
		
		setRepairFlagForCreep(creep);
		
    	
    	if (creep.memory.repair) {     		    
			var structures = getTargetsForRepair(creep);
			clearRepairList(structures);
			var item = getTargetWithMostNeedForRepair(structures);
		
			if (!creep.pos.isNearTo(item)) {
				creep.moveTo(item);
			} else {
				creep.repair(item);
			}
    	}else{
    		if(creep.harvest(source) == ERR_NOT_IN_RANGE) {  	    		
    			creep.moveTo(source);    			
    		}
    	}
	}
}

function getTargetWithMostNeedForRepair(structures){
	var mostNeedForRepair = structures[0];
	for (var i=0; i<structures.length;i++){
		var item = structures[i];
		var hitsDiffMax = mostNeedForRepair.hitsMax - mostNeedForRepair.hits;
		var hitsDiffTmp = item.hitsMax - item.hits;
				
		if ((hitsDiffMax < hitsDiffTmp)){
			var isWallAndNeedRepair = ((item.structureType ===  STRUCTURE_WALL) && (item.hits<((item.hitsMax/100)*5))); 
			if ((item.structureType !==  STRUCTURE_WALL) || isWallAndNeedRepair){
				mostNeedForRepair =  item;
			}
		}			
	}
	
	return mostNeedForRepair;
}

function setRepairFlagForCreep(creep){	
    
    if (!creep.memory.repair){
        creep.memory.repair=false;
    }
    
    if(creep.memory.repair && creep.carry.energy == 0) {
        creep.memory.repair = false;
    }
    if(!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
        creep.memory.repair = true;
    }

}

function getTargetsForRepair(creep){	
	var targets = Game.getObjectById(Memory.targetsForRepair);
	
	
	if ((!targets)||(targets.length===0)){
		targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {	           
						return (structure.structureType === STRUCTURE_EXTENSION ||
	                    structure.structureType === STRUCTURE_SPAWN ||
	                    structure.structureType === STRUCTURE_TOWER ||
	                    structure.structureType ===  STRUCTURE_ROAD ||    
	                    structure.structureType ===  STRUCTURE_WALL ||
	                    structure.structureType ===  STRUCTURE_RAMPART) && (structure.hits < structure.hitsMax);
	        }
		});
	}
	
	
	Memory.targetsForRepair = targets;
	
	return targets;
 }

function clearRepairList(targets){
	for (var i ; i<targets.length;i++){
	    var item = targets[i];
		if (item.hits==item.hitsMax){
			targets.splice[i];
		}
	}
	Memory.targetsForRepair = targets;
}

