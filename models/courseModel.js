const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A course must have a name.'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A course name must have less or equal than 40 characters'
      ],
      minlength: [5, 'A course name must have more or equal than 10 characters']
    },
    category: {
      type: String,
      required: [true, 'A course must have a category.'],
      enum: {
        values: [
          'photography',
          'health',
          'cooking',
          'industry',
          'computer science',
          'misc',
          'workshop',
          'horsmanship',
          'business',
          'adventure'
        ]
      }
    },
    address: {
      type: String,
      required: [true, 'A course must have an address']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A course must have a duration.']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A course must have a group size.']
    },
    difficulty: {
      type: String,
      required: [true, 'A course must have a difficulty.'],
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty is either: easy, medium, hard'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      validator: [
        validator.isAlpha,
        'Course name must only contain characters.'
      ]
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A course must have a price.']
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A course must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      require: [true, 'A course must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretCourse: {
      type: Boolean,
      default: false,
      select: false
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
      }
    ],
    instructors: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// course.index({ price: 1 });
courseSchema.index({ price: 1, ratingsAverage: -1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ startLocation: '2dsphere' });

courseSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// Virtual populate
courseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'course',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
courseSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
courseSchema.pre(/^find/, function(next) {
  // courseSchema.pre('find', function(next) {
  this.find({ secretCourse: { $ne: true } });
  this.start = Date.now();
  next();
});

courseSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'instructors',
    select: '-__v -passwordChangedAt'
  });
  next();
});

// courseSchema.post(/^find/, function(docs, next) {
//   console.log(`Query took ${Date.now() - this.start} millliseconds!`);
//   next();
// });

// AGGREGATION MIDDLEWARE
courseSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretCourse: { $ne: true } } });
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
