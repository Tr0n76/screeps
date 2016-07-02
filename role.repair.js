var roleRepair = {

	run : function(creep) {

		var structures = creep.room.find(FIND_MY_STRUCTURES);		
					
		for (var i=0;i<structures.length;i++){
			var item = structures[i];							
			console.log("Repair "+item.id +" hits="+item.hits+" max="+item.hitsMax);
			if (!creep.pos.isNearTo(item)) {
				creep.moveTo(target);
			} else {
				creep.repair(item)
			}
		}								
	}
}

function getTargetsForRepair(creep){
	return creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType ==  STRUCTURE_ROAD) 
                    && structure.hits < structure.hits.max;
        }
	});
}

module.exports = roleRepair;
