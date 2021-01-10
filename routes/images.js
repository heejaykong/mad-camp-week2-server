const express = require('express');
const router = express.Router();
const Image = require('../models/image');

// Get All
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find();
    // res.json(users);
    console.log("get all 요청했음")
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // User.findAll()
  //   .then((users) => {
  //     if (!users.length) return res.status(404).send({ err: 'User not found' });
  //     res.send(`find successfully: ${users}`);
  //   })
  //   .catch(err => res.status(500).send(err));
});

// Get One by id
router.get('/:id', getUser, (req, res) => {
  // User.findOneByPhoneNum(req.params.phoneNum)
  //   .then((user) => {
  //     if (!user) return res.status(404).send({ err: 'User not found' });
  //     res.send(`findOne successfully: ${user}`);
  //   })
  //   .catch(err => res.status(500).send(err));

  // res.json(res.user);
  // res.send(res.user.name);
  console.log(`get one by id\n ${res.user}`);
  res.send(res.user);
});

// Create new user
router.post('/post', async (req, res) => {
  const user = new User({
    name: req.body.name,
    phoneNum: req.body.phoneNum
    // profileImage: req.body.profileImage
  })
  try{
    console.log(`name is ${req.body.name}`);
    console.log(`phoneNum is ${req.body.phoneNum}`);
    
    console.log("포스트 성공!!!!!");
    const newUser = await user.save();
    console.log("after save");
    // res.send(req.body.name);
    // res.send(req.body.phoneNum);
    if (user._id){
      res.send(JSON.stringify(user._id));
      console.log(JSON.stringify(user._id));
    } else {
      console.log("id of user is null");
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({message: err.message});
  }
});

// Update by id
router.put('/put/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.phoneNum != null) {
    res.user.phoneNum = req.body.phoneNum;
  }
  // if (req.body.profileImage != null) {
  //   res.user.profileImage = req.body.profileImage;
  // }
  try {
    const updatedUser = await res.user.save();
    // res.json(updatedUser);  
    console.log("update user");
    res.send(updatedUser);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
  // User.updateByPhoneNum(req.params.phoneNum, req.body)
  //   .then(user => res.send(user))
  //   .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/delete/:id', getUser, async (req, res) => {
  try {
    console.log(`deleted user ㅎㅎ\n ${res.user}`);
    await res.user.remove();
    res.json({ message: "Deleted user" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  // User.deleteByPhoneNum(req.params.phoneNum)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => res.status(500).send(err));
});

// Delete All
router.delete('/deleteAll', async (req, res) => {
  try {
    const users = await User.remove();
    // await res.user.remove();
    res.json(users);
    res.json({message: "deleted all~~~"});
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // User.deleteByPhoneNum(req.params.phoneNum)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => res.status(500).send(err));
});

async function getUser(req, res, next){
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find User' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}


module.exports = router;