




const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const { Readable } = require('stream');
const { musicDB } = require('../_few_only/store.json');

let library = '../public/media/tracks';

/**
 * Connect Mongo Driver to MongoDB.
 */
let db;
MongoClient.connect(musicDB, { useUnifiedTopology: true }, (err, database) => {
  if (err) {
    console.log('Connection:', "Make sure the Databse is running");
    process.exit(1);
  }
  db = database;
});

/**
 * List of all tracks
 */
exports.tracks_list = [
  (req, res, next) => {
    try {
      var tracks = new mongodb.GridFSBucket(db, { bucketName: library });
      setTimeout(()=>{
        res.render('itm/songs', {
          title: 'Basliwizi - people of the great river',
          files: tracks
        });
      },300)
    } catch (error) {
      console.log(error);
      res.redirect('back');
    }
  }
];

/**
 * GET /tracks/:trackID
 */
exports.track_get = [
  (req, res) => {
    try {
      var trackID = new ObjectID(req.params.trackID);
    } catch (error) {
      return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" })
    }
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    let bucket = new mongodb.GridFSBucket(db, {
      bucketName: library
    });
    
    let downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  }
];

/**
 * POST /tracks
 */
exports.track_post = [
  (req, res) => {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
    upload.single('track')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: "Upload Request Validation Failed" });
      } else if(!req.body.name) {
        return res.status(400).json({ message: "No track name in request body" });
      }
      
      let trackName = req.body.name;
      
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
  
      let bucket = new mongodb.GridFSBucket(db, {
        bucketName: library
      });
  
      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);
  
      uploadStream.on('error', () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
  
      uploadStream.on('finish', () => {
        return res.status(201).json({ message: "File uploaded successfully, stored under Mongo ObjectID: " + id });
      });
    });
  }
];