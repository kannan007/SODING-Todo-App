var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var todolistSchema=new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		required: true
	}
},{
	timestamps: true
});
var Todolist= mongoose.model('Tasks',todolistSchema);
module.exports=Todolist;