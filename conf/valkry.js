var db_valkry

function initValkry(callback){
	db.collection(db_collection).doc(db_doc_valkry).get().then((snapshot)=>{
		db_valkry = snapshot.data()
		callback();
	});	
}

function drawValkries(targetDiv){
	var temp = "";
	$.each(db_valkry, function(key, item){
		$.each(item, function(id, val){
			temp += "<img width='120' src='"+val.face+"' class='valkry_item' id='"+id+"'>";
		})
		temp += "<br>";
	});
	targetDiv.html(temp);
}
function getValkryInfo(id){
	return db_valkry[id.substring(0,id.length-1)][id];
}

function descValkryInfo(){
	$.each(db_valkry, function(id, item){
		$.each(item, function(key, val){
//			if(val["face"] != ""){
//				$("#test").append(key+ " - " + val["face"]+"<br>");
//			}		
			$.each(val["skill"], function(idx, url){
				$("#test").append(key+"_"+idx+" - "+url+"<br>");
			});
		});
	});
}