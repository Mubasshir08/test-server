const mongoose = require('mongoose');

// export default mongoose.connect('mongodb://127.0.0.1:27017/react_ToDo_list');
module.exports = mongoose.connect('mongodb+srv://mubasshir:82XZUZ38LZ0rQCkG@cluster0.66r4eon.mongodb.net/react_ToDo_list?retryWrites=true&w=majority');