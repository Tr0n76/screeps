
var roleRepair = require('role.repair');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep, source) {

    	setBuildFlagForCreep(creep);

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
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

