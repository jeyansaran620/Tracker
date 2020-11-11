const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const typesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tools: [String]
}
);

var Types = mongoose.model('Types', typesSchema);

module.exports = Types;