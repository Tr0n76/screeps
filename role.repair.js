var roleRepair = {

	run : function(creep) {

		var structures = creep.room.find(FIND_MY_STRUCTURES);		
					
		for (var i=0;i<structures.length;i++){
			var item = structures[i];
			if (item.hits<item.hitsMax){
				console.log("Repair "+item.id +" hits="+item.hits+" max="+item.hitsMax);
				if (!creep.pos.isNearTo(item)) {
					creep.moveTo(target);
				} else {
					creep.repair(item)
				}
			}			
		}
				
	}
}

module.exports = roleRepair;
