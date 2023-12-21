const mongoose =  require('mongoose');

const todo_Schema = mongoose.Schema({
    taskName : {
        type : String,
        required : true
    },
    clientIp: String
});

module.exports = mongoose.model('ToDo list', todo_Schema);