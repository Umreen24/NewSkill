
const Booking = require('../models/bookingModel');



exports.getMyCourse = catchAsync(async(req, res, next) =>{
    //1) Find all the bookings
const bookings = await Booking.find({course: req.user.id})

    //2)find all the courses with return ids
    const courseIDs = bookings.map(el => el.course);
    const course = await course.find({_id: {$in: courseIDs}});

    res.status(200).render('overview',{
        title: 'My Course',
        courses
    });

});