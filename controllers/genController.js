exports.getAll = function(req,res){

	req.getConnection(function(err,connection){

		if(err)
		{
			return res.status(500).send({message : "Oops connection error",msgtype : 'E'})
		}

		var query = connection.query('select * from bookdetail',function(error,rows){

			if(error)
			{
				console.log(error);
				return res.status(500).send({message : error.sqlMessage,msgtype : 'E'})
			}

			return res.status(200).send({message : 'Data get successfully',msgtype : 'S',data : rows});

		})

	});
}

exports.saveBook = function(req,res){

	var data  =  req.body;

	console.log("Posted data : " + req.body);
	console.log("Stringify Posted data : " + JSON.stringify(req.body));

	req.getConnection(function(err,connection){

		if(err){
			return res.status(500).send({message : "Oops connection error",msgtype : 'E'})
		}

		var query = connection.query('insert into bookdetail set ?',data,function(error,rows){

			if(error){
				console.log(error);
				return res.status(500).send({message : error.sqlMessage,msgtype : 'E'})
			}

			return res.status(201).send({message : 'Data save successfully',msgtype : 'S',data : rows});
		})
	});
}

exports.updateBook = function(req,res){

	var _id = req.params.id;
	var data = req.body;

	req.getConnection(function(err,connection){

		if(err)
		{
			console.log("connection error : "  + err);
			return res.status(500).send({message : "Oops connection error",msgtype : "E"})
		}

		var query = connection.query('update bookdetail set ? where bookid = ?',[data,_id],function(error,rows){

			if(error){
				console.log("query error : " +error);
				return res.status(500).send({message : error.sqlMessage,msgtype : "E"})
			}

			console.log("After updated data : " + rows);
			return res.status(201).send({message : "Record updated successfully",msgtype : "S",data : rows})
		})
	});

}

exports.deleteBook = function(req,res){
	
	var _id = req.params.id;	

	req.getConnection(function(err,connection){

		if(err){
			console.log("connection Error : " + err)
			return res.status(500).send({message : "Oops connection error",msgtype : "E"})
		}

		var query = connection.query('delete from bookdetail where bookid = ?',_id,function(error,rows){

			if(error){
				console.log("query error : " + error)
				return res.status(500).send({message : error.sqlMessage,msgtype : "E"})
			}

			console.log("Records deleted data : " + rows)
			return res.status(200).send({message : "Record deleted successfully",msgtype : "S",data : rows})
		})
	});
}