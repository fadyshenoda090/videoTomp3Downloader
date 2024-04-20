const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const youtubedl = require('youtube-dl');

const app = express();


// bodyParser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// get home page 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


// submit form to download youtube video
app.post("/", (req, res) => {

    const videoLink = req.body.link;
    let videoName;


    const video = youtubedl(videoLink,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname })

    // Will be called when the download starts.
    video.on('info', function(info) {
        console.log('Download started')
        console.log('filename: ' + info._filename)
        console.log('size: ' + info.size)

    })


    youtubedl.getInfo(videoLink, function(err, info) {
        if (err) throw err;

        console.log('title:', info.title);
        videoName = info._filename + ".mp4";

        video.pipe(fs.createWriteStream(videoName));
    })




    // Will be called if download was already completed and there is nothing more to download.
    video.on('complete', function complete(info) {
        'use strict';
        console.log('filename: ' + info._filename + ' already downloaded.');
    });

    video.on('end', function() {
        console.log('finished downloading!');

        res.sendFile(__dirname + "/index.html");
    });

});



// lisetn to the port
const port = 8080;
app.listen(port, (req, res) => {
    console.log("server listen to port", port);
});