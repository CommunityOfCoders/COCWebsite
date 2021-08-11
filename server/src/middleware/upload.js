const multer = require('multer')
const path = require('path')

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}
  
var upload = multer({ 
    dest: 'uploads/',
    limits:{fileSize: 30*1024*1024},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});

module.exports = upload