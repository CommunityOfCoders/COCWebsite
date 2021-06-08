const cloudinary = require("cloudinary");
const { validationResult } = require('express-validator/check');
var http = require('http');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

const Magazine = require("../models/Magazine")

module.exports = {
    async getMagazines(_req, res, next)
    {
        const magazines = await Magazine.find().sort("-date").lean();
        res.locals.cache = magazines;
        next();
        res.status(200).json(magazines);
    },
    async getMagazineById(req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
  
      try {
        const magazineId = req.params.id;
        console.log(magazineId);
        let magazine = await Magazine.findById(magazineId)
          .lean();
        console.log(magazine);
        res.status(200).json(magazine);
      } catch (err) {
        res.status(400).json({
          error: err.message,
        });
      }
    },
    
    async uploadMagazineToGdrive(req, res, next) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      if(!(req.body.downloadURL && req.file && req.body.magazineName && req.body.date))
      { 
        res.json({"error":"Required field: downloadURL, photoURL, magazineName, date(YYYY-MM-DD), description"});
        return;
      }

      try{
        let magazine = await Magazine.create(
          {
            magazineName : req.body.magazineName, 
            date : req.body.date, 
            downloadURL : req.body.downloadURL,
            description : req.body.description
          });
        console.log("Uploading Image...");
        const image = await cloudinary.v2.uploader.upload(req.file.path, {
          public_id: magazine._id,
          tags: ["magazine"],
          invalidate: true,
        });
        console.log("Image uploaded!");

        magazine = await Magazine.findByIdAndUpdate( magazine._id,
          { 
              photoURL: image.secure_url   
          },
          { new: true }).select({ "_id": 1, "magazineName": 1, "date": 1}).lean();

        res.status(200).json({
          id: magazine._id,
        }); 
        next();
      }
      catch(error){
        res.json({"error":error.message});
      }
    },

    async updateMagazine(req, res, next)
    {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const id = req.params.id;
      const body=req.body;

      if(!(body.magazineName || body.date || body.photoURL || body.downloadURL || body.description || req.file))
      {
        res.json({"error":"At least add one of the following fields: magazineName, date, photoURL, downloadURL or upload an image"});
        return;
      }

      if(req.file) //updating image
      {
        console.log("Deleting existing image...");
        try {
          await cloudinary.api.resource(id);
          try {
            await cloudinary.v2.uploader.destroy(id);
          } catch (error) {
            res.status(500).json({});
          }
        } catch (error) { }
        console.log("Uploading new image...");
        const image = await cloudinary.v2.uploader.upload(req.file.path, {
          public_id: id,
          tags: ["magazine"],
          invalidate: true,
        });
        console.log("Image uploaded!");

        body.photoURL = image.secure_url;
      }

      const magazine = await Magazine.findByIdAndUpdate( id, body,
        { new: true }).lean();
      
        res.json(magazine);
        next();
    },

    async deleteMagazine(req, res, next)
    {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const id = req.params.id;
      Magazine.findByIdAndDelete(id).lean()
      .then(()=>{
        cloudinary.api.resource(id);
      }, (err)=>{
        res.json({"error":err.message});
        return;
      })
      .then(()=>{
        cloudinary.v2.uploader.destroy(id);
      }, (err)=>{
        res.json({"error":err.message});
        return;
      })
      .then(()=>{
        res.status(204).json({"message":"successfully deleted!"});
        next();
      }, (err)=>{
        res.json({"error":err.message});
        return;
      });
    }
}