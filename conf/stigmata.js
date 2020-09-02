var db_stigmata
db.collection(db_collection).doc(db_doc_stigmata).get().then((snapshot)=>{
				db_stigmata = snapshot.data().datas
				console.log("init_stigmata")
			});