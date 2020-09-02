var db_weapon
db.collection(db_collection).doc(db_doc_weapon).get().then((snapshot)=>{
				db_weapon = snapshot.data().datas
				console.log("init_weapon")
			});