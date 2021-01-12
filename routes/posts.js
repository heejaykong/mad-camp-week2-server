const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Get All
router.get('/getAll', async (req, res) => {
  try {
    const posts = await Post.find();
    console.log("get all 요청했음")
    console.log(`sent ${posts}`)
    
    res.send(posts);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Get One by id
router.get('/get/:id', getPost, (req, res) => {
  console.log(`get one by id\n ${res.post}`);
  res.send(res.post);
});

// Post one post(with image field too)
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');

var form =
"<!DOCTYPE HTML><html><body>" +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
    "<input type='file' name='upload'/>" +
  "</form>" +
"</body></html>";

router.get('/', function (req, res){
  try {
    res.writeHead(200, {'Content-Type': 'text/html' });
    res.end(form);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    return crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname))+".JPEG");
    });
  }
});

router.post("/post/:name/:phoneNum",
  multer({
    storage: storage
  }).single('upload'), async function(req, res) {
    try {
      const reqFile = JSON.stringify(req.file);
      const reqBody = JSON.stringify(req.body);
      
      console.log(`req.file: ${reqFile}`);
      console.log(`req.body: ${reqBody}`);

      console.log(req.file.filename);
      
      console.log(`name is ${req.params.name}`);
      console.log(`phoneNum is ${req.params.phoneNum}`);
      console.log(`url is ${req.file.path}`);
      
      // 여기부턴 posts
      const post = new Post({
        name: req.params.name,
        phoneNum: req.params.phoneNum,
        url: (typeof req.file.path == undefined)? "" : `http://192.249.18.208:3000/images/${req.file.path}`
      })
      console.log(`after save, name is ${post.name}`);
      console.log(`after save, phonenum is ${post.phoneNum}`);
      console.log(`after save, url is ${post.url}`);
  
      console.log("포스트 성공!!!!!");
      const newPost = await post.save();
      console.log("after save");
      return res.status(201).json(newPost);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

// Put by id
router.put('/put/:id/:name/:phoneNum/:url',
  multer({
    storage: storage
  }).single('upload'), getPost, async function(req, res) {
  if (req.params.name != null) {
    res.post.name = req.params.name;
  }
  if (req.params.phoneNum != null) {
    res.post.phoneNum = req.params.phoneNum;
  }
  if (req.params.url != null) {
    const uptatedImageUrl = `http://192.249.18.208:3000/images/${req.file.path}`;

    res.post.url = uptatedImageUrl;
  }
  // url: (typeof req.file.path == undefined)? "" : `http://192.249.18.208:3000/images/${req.file.path}`
  try {
    const updatedPost = await res.post.save();
    console.log("update post:");
    console.log(updatedPost);
    console.log(`after save, name is ${updatedPost.name}`);
    console.log(`after save, phonenum is ${updatedPost.phoneNum}`);
    console.log(`after save, url is ${updatedPost.url}\n\n`);

    res.send(updatedPost);

  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Delete by id
const fs = require('fs');
router.delete('/delete/:id', getPost, async (req, res) => {
  try {
    const fileUrl = res.post.url;
    console.log(fileUrl);
    // fs.unlinkSync(__dirname + "/../uploads" + file); //처리하고 싶다... 비동기...
    console.log(`deleted post ㅎㅎ\n ${res.post}`);
    await res.post.remove();
    res.json({ message: "Deleted image" });
  
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Delete All(only post in DB, 파일시스템에 있는 프로필 이미지는 처리 못하는 중)
router.delete('/deleteAll', async (req, res) => {
  try {
    const posts = await Post.remove();
    res.json(posts);
    res.json({message: "deleted all~~~"});
    const pathToDelete = `http://192.249.18.208:3000/images/uploads/.`;
    fs.unlinkSync(pathToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getPost(req, res, next){
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.post = post;
  next();
}

module.exports = router;