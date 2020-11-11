const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mailId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}
);

var Customers = mongoose.model('Customers', customersSchema);

module.exports = Customers;