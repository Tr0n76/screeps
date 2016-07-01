var roleGuard = {

	run : function(creep) {

		var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
		var hostile = hostiles[0];
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
			creep.moveTo(Game.spawns[0]);		
		}
	}
}

module.exports = roleGuard;
