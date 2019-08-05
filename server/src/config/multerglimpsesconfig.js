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

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        var Destination = path.join(__dirname,'../images/glimpses/',req.body.eventName)
        var stat = null;
        try {
            stat = fs.statSync(Destination);
        } catch (err) {
            console.log(req.body)
            console.log("Idhar andar hu mai")
            fs.mkdirSync(Destination,{recursive: true});
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }       
        cb(null, Destination);
    },
    filename: function(req,file,cb) {
        cb(null,req.body.eventName+'-'+Date.now()+path.extname(file.originalname).toLowerCase())
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req,file,cb) {
        checkFileType(file, cb)
    }
})

module.exports = upload