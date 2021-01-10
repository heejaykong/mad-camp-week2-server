// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Get All
// router.get('/getAll', async (req, res) => {
//   try {
//     const users = await User.find();
//     console.log("user get all");
//     res.send(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
//   // User.findAll()
//   //   .then((users) => {
//   //     if (!users.length) return res.status(404).send({ err: 'User not found' });
//   //     res.send(`find successfully: ${users}`);
//   //   })
//   //   .catch(err => res.status(500).send(err));
// });

// // Get One by id
// router.get('/:id', getUser, (req, res) => {
//   console.log(`get one by id\n ${res.contact}`);
//   res.send(res.contact);
//   // User.findOneByUserIP(req.params.userIP)
//   //   .then((user) => {
//   //     if (!user) return res.status(404).send({ err: 'User not found' });
//   //     res.send(`findOne successfully: ${user}`);
//   //   })
//   //   .catch(err => res.status(500).send(err));
// });

// // Create new user document
// router.post('/post', async (req, res) => {
//   const user = new User({
//     userIP: req.body.userIP,
//     token: req.body.token,
//     contacts: req.body.contacts,
//     images: req.body.images
//   })
//   try{
//     console.log(`userIP is ${req.body.userIP}`);
//     console.log(`token is ${req.body.token}`);    
//     console.log("포스트 성공!!!!!");
//     const newUser = await user.save();
//     console.log("after save");
//     // res.send(req.body.name);
//     // res.send(req.body.phoneNum);
//     if (user._id){
//       res.send(JSON.stringify(user._id));
//       console.log(JSON.stringify(user._id));
//     } else {
//       console.log("id of user is null");
//     }

//     res.status(201).json(newUser);
//   } catch (err) {
//     console.log(err.message);
//     res.status(400).json({message: err.message});
//   }
//   // User.create(req.body)
//   //   .then(user => res.send(user))
//   //   .catch(err => res.status(500).send(err));
// });

// // Update by id
// router.put('/put/:id', getUser, async (req, res) => {
//   if(req.body.contacts) res.user.contacts = res.body.contacts;
//   if(req.body.images) res.user.images = res.body.images;
//   try{
//     const updatedUser = await res.user.save();

//   }catch(err){
//     res.status(400).json({message: err.message});
//   }
//   // User.updateByUserIP(req.params.userIP, req.body)
//   //   .then(user => res.send(user))
//   //   .catch(err => res.status(500).send(err));
// });

// // Delete by userIP
// router.delete('/userIP/:userIP', (req, res) => {
//   User.deleteByUserIP(req.params.userIP)
//     .then(() => res.sendStatus(200))
//     .catch(err => res.status(500).send(err));
// });

// function getUser(req, res, next){
//   next();
// }

// module.exports = router;