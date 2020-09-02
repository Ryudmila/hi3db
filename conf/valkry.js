var db_valkry
db.collection(db_collection).doc(db_doc_valkry).get().then((snapshot)=>{
				db_valkry = snapshot.data().datas
				console.log("init_valkry")
			});