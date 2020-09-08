var db_weapon
function initWeapon(callback){
	db.collection(db_collection).doc(db_doc_weapon).get().then(
	function(doc){
		if(doc.exists){
			console.log("data exist")
			db_weapon = doc.data()
			
			var temp = {};
			var karr = [];
			$.each(db_weapon, function(key, item){
				karr.push(key);
			});
			$.each(karr.reverse(), function(key, idx){
				temp[idx] = db_weapon[idx];
			});
			db_weapon = temp;
			callback();
		}else{
			console.log("db_weapon no data");
		}
		
	
	
	
	
	//(snapshot)=>{
	//	db_weapon = snapshot.data().datas
		
	}).catch(function(error){console.log("db_weapon error - " + error)});;
}
function drawWeapons(targetDiv){
	targetDiv.html('');
	$.each(db_weapon, function(key, item){
		targetDiv.append("<img src = '"+item.src+"' class='weaponIcon' id='"+key+"'>");
	});
}
function getWeaponInfo(id){
	return db_weapon[id];
}
function filterWeapon(type){
	$.each(db_weapon, function(key, item){
		if(type == 'all'){
			$("#"+key).css("display", "inline-block");
		}else{
			if(key.substring(2, 3)==type){
				$("#"+key).css("display", "inline-block");
			}else{
				$("#"+key).css("display", "none");
			}
		}
	})
}

function descWeaponInfo(){
	$.each(db_weapon, function(id, item){
		if(item["src"] != ""){
		$("#test").append(id+ " - " + item["src"]+"<br>");
		}		
	});
}