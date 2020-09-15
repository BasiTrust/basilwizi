const multer = require('multer');
var mongoose = require('mongoose');
var { Mongoose } = require('mongoose');
const { musicDB } = require('../_few_only/store.json');
const { Readable } = require('stream');
const GridFSBucket = require('mongodb/lib/gridfs-stream');
const GridFSBucketWriteStream = require('mongodb/lib/gridfs-stream/upload');
const GridFSBucketReadStream = require('mongodb/lib/gridfs-stream/download');
GridFSBucket.mongo = mongoose.mongo;
let library = '../public/media/tracks';

let gfs;
var conn = mongoose.createConnection(musicDB, { useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true });
conn.once('open', function () {
  gfs = GridFSBucket.bind(conn.db);
});
/*
exports.tracks_list = [
  (req, res, next) => {
    GridFSBucket.length(function(err, files) {
      if (err) { return next(err); }
      res.render('itm/songs', {
        title: 'Basilwizi Bamulonga',
        files: files
      });
    })
  }
];*/

/** Downloading tracks and playing them */
exports.track_get = [
  (req, res, next) => {
    var trackID = req.params.trackID;

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    var bucket = new gfs.GridFSBucket({
      bucketName: 'tracks'
    });
    
    var downloadStream = bucket.openDownloadStream(trackID);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.redirect('back');
    });
  }
];

/** Uploadng muisc to the GridFSBucket */
exports.track_post = [
  (req, res, next) => {
    try {
      const storage = multer.memoryStorage()
      const upload = multer({ storage: storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
      upload.single('track')(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: "Upload Request Validation Failed" });
        }
        try {

          var buffer = req.file;
          
          // Covert buffer to Readable Stream
          const readableTrackStream = new Readable();
          readableTrackStream.push(buffer);
          readableTrackStream.push(null);
      
          GridFSBucketWriteStream({
            bucketName: "tracks"
          });

          GridFSBucketReadStream(readableTrackStream).pipe(GridFSBucketReadStream);

          GridFSBucketWriteStream.on('finish', () => {
            return res.redirect('back');
          });
          
        } catch (error) {
          console.log(error);
          res.redirect('back');
        }
      });
    } catch (error) {
      console.log(error);
      res.redirect('back');
    }
  }
];
