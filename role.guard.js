module.exports = {

	run : function(creep) {

		var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
		if (hostiles.length>0) {
			var target = hostiles[0];
			if (!creep.pos.isNearTo(target)) {
				creep.moveTo(target);
				console.log("Hostile creep from user " + target.owner.username
						+ " spottet. Moving to engange.");
			} else {
				creep.attack(target);
				console.log("Hostile creep from user " + target.owner.username
						+ " spottet. Attakinge.");
			}
		} else {
			creep.moveTo(Game.spawns.Spawn1);		
		}
	}
}

