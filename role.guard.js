var roleGuard = {

	run : function(creep) {

		var hostile = creep.room.findNearest(FIND_HOSTILE_CREEPS);
		if (hostile) {
			if (!creep.pos.isNearTo(target)) {
				creep.moveTo(target);
				console.log("Hostile creep from user " + hositle.owner.username
						+ " spottet. Moving to engange.");
			} else {
				creep.attack(target);
				console.log("Hostile creep from user " + hositle.owner.username
						+ " spottet. Attakinge.");
			}
		} else {
			if (!creep.pos.isNearTo(spawn)) {
				creep.moveTo(spawn);
			}
		}
	}
}

module.exports = roleGuard;
