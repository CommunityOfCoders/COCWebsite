const multer = require('multer')
const path = require('path')
const fs = require('fs')

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
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

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         var Destination = path.join(__dirname,'../images/events/')
        
//         var stat = null;
//         try {
//             stat = fs.statSync(Destination);
//         } catch (err) {
//             fs.mkdirSync(Destination);
//         }

//         if (stat && !stat.isDirectory()) {
//             throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
//         }
 
//         cb(null, Destination);
//     },
//     filename: function (req, file, cb) {
//         var dt = new Date(Date.now());
//         cb(null, req.body.eventName + '-' + dt.getFullYear() + path.extname(file.originalname).toLowerCase());
//     }
// })
  
var upload = multer({ 
    dest: 'uploads/',
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});

module.exports = upload