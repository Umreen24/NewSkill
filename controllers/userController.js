const catchAsync = require('../utils/catchAsync');


const sharp = require('sharp');
const multer = require('multer');


// const multerStorage = multer.diskStorage({
//   destination:(req,file, cb) =>{
//     cb(null,'public/img/users');
//   },
//   filename: (req, file, cb) =>{
   
//     const ext = file.min=metype.split('/')[1];
//     cb(null,`user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();


const multerFilter = (req, file, cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null, true)
  }else{
    cb(new AppError('Not an image! please upload only images.',400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter

});

exports.uploadUsersPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync( async(req, res, next) => {
if(!req.file) return next();

req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

await sharp(req.file.buffer)
.resize(500, 500)
.toFormat('jpeg')
.jpeg({quality: 90})
.toFile(`public/img/users/${req.file.filename}`);

next();


});

const filteredBody = filterObj(req.body,'name','email');
if(req.file) filteredBody.photo =req.file.filename;

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
