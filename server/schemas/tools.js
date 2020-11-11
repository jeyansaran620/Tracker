const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    customer: {
        type: String,
        required: true
    },
    dateTaken: {
        type: Date,
        required: true
    },
    dateToBeReturned: {
        type: Date,
        required : true
    },
    dateReturned: {
        type : Date
    }
},
{
    timestamps: true
});

const toolsSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    defects: {
        type: String,
        required: true
    },
    rentals: [rentalSchema]
},{
    timestamps: true
});

var Tools = mongoose.model('tools', toolsSchema);

module.exports = Tools;