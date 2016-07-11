module.exports = {

    run: function(room) {
       
         console.log(rampartes.length);
            
        if (Game.time % 60 === 0){  
            build(room);
    	}
    }
    	  
};

function build(room){
     var spawns = room.find(FIND_MY_SPAWNS);
            var sources = room.find(FIND_SOURCES);
            var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            var constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
            var controller = room.controller;
            var ramparts = room.find(FIND_STRUCTURES , {filter: {structureType: STRUCTURE_RAMPART}});
             
            if (constructionSites.length>=100){
                return;
            }
          
            for (var i=0; i<spawns.length; i++){
                
                for (var j=0; j<sources.length; j++){
                    buildRoad(room, constructionSites, spawns[i], sources[j]);   
                }
                
                for (var j=0; j<towers.length; j++){
                    buildRoad(room, constructionSites, spawns[i], towers[j]);   
                }
                
                for (var j=0; j<ramparts.length; j++){
                    buildRoad(room, constructionSites, spawns[i], ramparts[j]);   
                }
                
                buildRoad(room, constructionSites, spawns[i], controller);   
            }
            
            
      
         
	}

function buildRoad(room, constructionSites, from, to){   
    var posFrom = from.pos;
    var posTo = to.pos;
    
    var path = posFrom.findPathTo(posTo, { ignoreCreeps: true });

    for (var i=0; i<path.length; i++){
      
         createConstructionSite(room, constructionSites, path[i], STRUCTURE_ROAD);
    }
	
	
}

function createConstructionSite(room, constructionSites, pos, type){
    
    if (constructionSites.length>=100){
        return;
    }
    
   room.createConstructionSite(pos.x, pos.y, type);
}


