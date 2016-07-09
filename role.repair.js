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

function selectNewTargetForRepair(actualTargetId){	
   
	if (!actualTargetId)
	{
		return true;
	}
	
	var actualTarget = Game.getObjectById(actualTargetId);
	if (!actualTarget){
		return true;
	}
	
	if (actualTarget.hits  == actualTarget.hitsMax){
		return true;
	}
	
	if (Game.time % 60 === 0){  
		return true;
	}
	
	return false;
}

function getTargetWithMostNeedForRepair(structures){
    var targetIdForRepair =  structures[0].room.memory.targetForRepairId;
  
    if (selectNewTargetForRepair(targetIdForRepair)){
        mostNeedForRepair = structures[0];
    	for (var i=0; i<structures.length;i++){
    		var item = structures[i];
    		var hitsDiff = mostNeedForRepair.hits - item.hits;
    	
    		if (hitsDiff>0){
        		mostNeedForRepair =  item;
    		}			
    	}
    	mostNeedForRepair.room.memory.targetForRepairId = mostNeedForRepair.id;
    }
	var target = Game.getObjectById(structures[0].room.memory.targetForRepairId);
	console.log(target.id+" "+target.structureType+" "+target.hits+"/"+target.hitsMax);
	return target;
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

		return creep.room.find(FIND_STRUCTURES, {filter: (structure) => {	           
						return (structure.structureType === STRUCTURE_EXTENSION ||
	                    structure.structureType === STRUCTURE_SPAWN ||
	                    structure.structureType === STRUCTURE_TOWER ||
	                    structure.structureType ===  STRUCTURE_ROAD ||    
	                    structure.structureType ===  STRUCTURE_WALL ||
	                    structure.structureType ===  STRUCTURE_RAMPART) && (structure.hits < structure.hitsMax);
	        }
		});
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

