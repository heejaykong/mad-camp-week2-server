const express = require('express');
const router = express.Router();
const Image = require('../models/image');

var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');

var form =
"<!DOCTYPE HTML><html><body>" +
  "<form method='post' action='/upload' enctype='multipart/form-data'>" +
    "<input type='file' name='upload'/>" +
    // "<input type='submit'>" + 
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

const fs = require('fs');
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

// Post files
router.post("/upload",
  multer({
    storage: storage
  }).single('upload'), function(req, res) {
    try {
      const reqFile = JSON.stringify(req.file);
      const reqBody = JSON.stringify(req.body);
      
      console.log(`req.file: ${reqFile}`);
      console.log(`req.body: ${reqBody}`);
      
      res.redirect("/uploads/" + req.file.filename);
      console.log(req.file.filename);
      return res.status(201).end();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

router.get('/uploads/:filename', function (req, res){
  try{
    file = req.params.filename;
    console.log(`filename is ${req.params.filename}`);
    var img = fs.readFileSync(__dirname + "/../uploads/" + file);
    console.log(`file path is: ${__dirname}/uploads/${file} !!!!`)
    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get All
router.get('/getAll', async (req, res) => {
  try {
    const images = await Image.find();
    // res.json(images);
    console.log("get all 요청했음")
    res.send(images);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // Image.findAll()
  //   .then((images) => {
  //     if (!images.length) return res.status(404).send({ err: 'Image not found' });
  //     res.send(`find successfully: ${images}`);
  //   })
  //   .catch(err => res.status(500).send(err));
});

// // Get One by id(original code)
// router.get('/:id', getImage, (req, res) => {
//   // Image.findOneByPhoneNum(req.params.phoneNum)
//   //   .then((image) => {
//   //     if (!image) return res.status(404).send({ err: 'image not found' });
//   //     res.send(`findOne successfully: ${image}`);
//   //   })
//   //   .catch(err => res.status(500).send(err));

//   // res.json(res.image);
//   // res.send(res.image.name);
//   console.log(`get one by id\n ${res.image}`);
//   res.send(res.image);
// });

// // Create new image(original code)
// router.post('/post', upload.single('images'), async function (req, res, next) {
//     const image = new Image({
//       imageName: req.body.imageName,
//       image: req.body.image
//     })
//     try {
//       console.log(`imageName is ${req.body.imageName}`);
//       console.log(`image is ${req.body.image}`);

//       console.log(`image saved file info: ${req.file}`)
      
//       console.log("포스트 성공!!!!!");
//       const newImage = await image.save();
//       console.log("after save");
//       // res.send(req.body.name);
//       // res.send(req.body.phoneNum);
//       if (newImage._id){
//         // res.send(JSON.stringify(newImage._id));
//         console.log(JSON.stringify(newImage._id));
//       } else {
//         console.log("id of image is null");
//       }
//       res.status(201).json(newImage);
  
//     } catch (err) {
//       console.log(err.message);
//       res.status(400).json({message: err.message});
//     }
//   // req.file 은 `avatar` 라는 필드의 파일 정보입니다.
//   // 텍스트 필드가 있는 경우, req.body가 이를 포함할 것입니다.
// })

// // Create new image(original code)
// router.post('/post', async (req, res) => {
//   const image = new Image({
//     imageName: req.body.imageName,
//     image: req.body.image
//     // profileImage: req.body.profileImage
//   })
//   try {
//     console.log(`imageName is ${req.body.imageName}`);
//     console.log(`image is ${req.body.image}`);
    
//     console.log("포스트 성공!!!!!");
//     const newImage = await image.save();
//     console.log("after save");
//     // res.send(req.body.name);
//     // res.send(req.body.phoneNum);
//     if (newImage._id){
//       // res.send(JSON.stringify(newImage._id));
//       console.log(JSON.stringify(newImage._id));
//     } else {
//       console.log("id of image is null");
//     }
//     res.status(201).json(newImage);

//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({message: err.message});
//   }
// });

// Update by id
router.put('/put/:id', getImage, async (req, res) => {
  if (req.body.name != null) {
    res.image.name = req.body.name;
  }
  if (req.body.phoneNum != null) {
    res.image.phoneNum = req.body.phoneNum;
  }
  try {
    const updatedImage = await res.image.save();
    console.log("update image");
    res.send(updatedImage);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Delete by id
router.delete('/delete/:id', getImage, async (req, res) => {
  try {
    console.log(`deleted image ㅎㅎ\n ${res.image}`);
    await res.image.remove();
    res.json({ message: "Deleted image" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Delete All
router.delete('/deleteAll', async (req, res) => {
  try {
    const images = await Image.remove();
    // await res.image.remove();
    res.json(images);
    res.json({message: "deleted all~~~"});
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // Image.deleteByPhoneNum(req.params.phoneNum)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => res.status(500).send(err));
});

async function getImage(req, res, next){
  let image;
  try {
    image = await Image.findById(req.params.id);
    if (image == null) {
      return res.status(404).json({ message: 'Cannot find Image' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.image = image;
  next();
}


module.exports = router;