const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.objectId,
        ref: 'Course',
        required: [true, 'Booking must belong to a course!']
    },
    user: {
        type: mongoose.Schema.objectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        require: [true, 'Booking must have a price.']
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    paid: {
        type: Boolean,
        default: true
    }

});

bookingSchema.pre(/^find/, function(next){
    this.populate('user').populate({
        path: 'course',
        select: 'name'
    });
    next();
});
const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking;