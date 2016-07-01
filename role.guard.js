var roleGuard = {

    run: function(creep) {
      
    	var hostile = creep.room.findNearest(HOSTILE_CREEPS);
    	if (hostile){
    		if (!creep.pos.isNearTo(target)) {
    			 creep.moveTo(target);
    		}else{
    			 creep.attack(target);
    		}
    	}else{
    	      if (!creep.pos.isNearTo(spawn)) {
    	            creep.moveTo(spawn);
    	        }
    	}
	}
}

module.exports = roleGuard;
