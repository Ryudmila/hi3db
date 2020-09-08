var db_stigmata
function initStigmata(callback){
	db.collection(db_collection).doc(db_doc_stigmata).get().then(
	function(doc){
		if(doc.exists){
			console.log("data exist");
			db_stigmata=doc.data()
			callback();
		}else{
			console.log("no data")
		}
		
	}).catch(function(error){
		console.log("error - " + error);
	});
	//(snapshot)=>{
	//	db_stigmata = snapshot.data().datas
	//	console.log(db_stigmata);
	//	callback();
	//});	
}
//성흔 기본 UI
function makeStigmata(id, stigmata){
	var strTemp = '<div class="stigmata_body" id="id_stigmata_body" style="width: 450px;display: inline-block;" >					<div class="stigmata_name"><div class="stigmata_set_container"><div class="stigmata_set2">SET2</div><div class = "stigmata_set3">SET3</div></div> <div class="sitgmata_name_value">id_stigmata_name</div></div>					<div class="stigmata_img" align="center">					<img class="class_top_stigmata" src="id_stigmata_top_img" name="id_stigmata_name" id="top" key="id_stigmata_key">					<img class="class_mid_stigmata" src="id_stigmata_mid_img" name="id_stigmata_name" id="mid" key="id_stigmata_key">					<img class="class_bot_stigmata" src="id_stigmata_bot_img" name="id_stigmata_name" id="bot" key="id_stigmata_key">					</div>					<div class="sitgmata_rec"></div></div>';		
	if(stigmata.top!= null){
		if(stigmata.top.rec){
			strTemp = strTemp.replace(/class_top_stigmata/g, "stigmata_rec");
		}else{
			strTemp = strTemp.replace(/class_top_stigmata/g, "stigmata");
		}
		strTemp = strTemp.replace(/id_stigmata_top_img/g, stigmata.top.src);
	}else{
		strTemp = strTemp.replace(/class_top_stigmata/g, "temp_stigmata");
	}
	if(stigmata.mid!= null){
		if(stigmata.mid.rec){
			strTemp = strTemp.replace(/class_mid_stigmata/g, "stigmata_rec");
		}else{
			strTemp = strTemp.replace(/class_mid_stigmata/g, "stigmata");
		}
		strTemp = strTemp.replace(/id_stigmata_mid_img/g, stigmata.mid.src);
	}else{
		strTemp = strTemp.replace(/class_mid_stigmata/g, "stigmata");
	}
	if(stigmata.bot!= null){
		if(stigmata.bot.rec){
			strTemp = strTemp.replace(/class_bot_stigmata/g, "stigmata_rec");
		}else{
			strTemp = strTemp.replace(/class_bot_stigmata/g, "stigmata");
		}
		strTemp = strTemp.replace(/id_stigmata_bot_img/g, stigmata.bot.src);
	}else{
		strTemp = strTemp.replace(/class_bot_stigmata/g, "stigmata");
	}
	if(stigmata.set2!=null){
		if(stigmata.set2.rec){
			
		}else{
			strTemp = strTemp.replace(/stigmata_set2/g, "stigmata_none");
		}			
	}else{
		strTemp = strTemp.replace(/stigmata_set2/g, "stigmata_none");
		
	}
	if(stigmata.set3!=null){
		if(stigmata.set3.rec){
			
		}else{
			strTemp = strTemp.replace(/stigmata_set3/g, "stigmata_none");
		}
	}else{
		strTemp = strTemp.replace(/stigmata_set3/g, "stigmata_none");
	}		
	strTemp = strTemp.replace(/id_stigmata_name/g, stigmata.name);
	strTemp = strTemp.replace(/id_stigmata_key/g, id);
	strTemp = strTemp.replace(/id_stigmata_body/g, id+"_body");
	return strTemp;
}
//뷰에다가 모든 성흔을 그림
function drawStigmatas(targetDiv){
	console.log("call drawStigmatas");
	targetDiv.html('');
	console.log(db_stigmata);
	$.each(db_stigmata, function(id, stigmata){
		targetDiv.append(makeStigmata(id, stigmata));
	});
}
//단일 성흔 정보 획득
function getStigmataInfo(id, target){
	return db_stigmata[id][target];
}
//검색 기능
function filterStigmata(temp){
	$.each(db_stigmata, function(id, item){
		var exist = false;
		$.each(item, function(key, tmp){
			if(tmp["desc"] != undefined){
				if(tmp["desc"].includes(temp)){
					exist = true;
				}
			}
		});
		if(exist){
			$("#"+id+"_body").css("display","inline-block");
		}else{
			$("#"+id+"_body").css("display","none");
		}
	});
}
//성흔 조합 옵션
function conbineStigmata(sTop, sMid, sBot){
	console.log("conbineStigmata - " + sTop + ", " + sMid + ", " + sBot);
	var temp = {};
	var set = {};
	if(sTop != null && sTop != undefined){
		temp["top"] = db_stigmata[sTop]["top"]
		temp["top"]["name"] = db_stigmata[sTop]["name"]
		if(set[sTop] == null || set[sTop] == undefined){
			set[sTop] = 1;
		}else{
			set[sTop] = set[sTop] + 1;
		}
	}
	if(sMid != null && sMid != undefined){
		temp["mid"] = db_stigmata[sMid]["mid"]
		temp["mid"]["name"] = db_stigmata[sMid]["name"]
		if(set[sMid] == null || set[sMid] == undefined){
			set[sMid] = 1;
		}else{
			set[sMid] = set[sMid] + 1;
		}
	}
	if(sBot != null && sBot != undefined){
		temp["bot"] = db_stigmata[sBot]["bot"]
		temp["bot"]["name"] = db_stigmata[sBot]["name"]
		if(set[sBot] == null || set[sBot] == undefined){
			set[sBot] = 1;
		}else{
			set[sBot] = set[sBot] + 1;
		}
	}
	$.each(set, function(key, val){
		if(val > 1){
			temp["set"] = {};
			temp["set"]["set2"] = db_stigmata[key]["set2"]		
		}
		if(val > 2){
			temp["set"]["set3"] = db_stigmata[key]["set3"]
		}
	});
	return temp;
}

function descStigmataInfo(){
	$.each(db_stigmata, function(id, item){
		$.each(item, function(key, tmp){
			if(tmp["src"] != undefined){
				if(tmp["src"]!=""){
					$("#test").append(id+"_"+key + " - " + tmp["src"]+"<br>");
				}
			}
		});
	});
}
