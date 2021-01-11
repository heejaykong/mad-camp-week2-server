const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Get All
router.get('/getAll', async (req, res) => {
  try {
    const contacts = await Contact.find();
    // res.json(contacts);
    console.log("get all 요청했음")
    res.send(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // Contact.findAll()
  //   .then((contacts) => {
  //     if (!contacts.length) return res.status(404).send({ err: 'Contact not found' });
  //     res.send(`find successfully: ${contacts}`);
  //   })
  //   .catch(err => res.status(500).send(err));
});

// Get One by id
router.get('/get/:id', getContact, (req, res) => {
  // Contact.findOneByPhoneNum(req.params.phoneNum)
  //   .then((contact) => {
  //     if (!contact) return res.status(404).send({ err: 'Contact not found' });
  //     res.send(`findOne successfully: ${contact}`);
  //   })
  //   .catch(err => res.status(500).send(err));

  // res.json(res.contact);
  // res.send(res.contact.name);
  console.log(`get one by id\n ${res.contact}`);
  res.send(res.contact);
});

// Create new contact
router.post('/post/:name/:phoneNum', async (req, res) => {
  const contact = new Contact({
    name: req.params.name,
    phoneNum: req.params.phoneNum
    // profileImage: req.body.profileImage
  })
  try {
    console.log(`name is ${req.params.name}`);
    console.log(`phoneNum is ${req.params.phoneNum}`);

    console.log(contact.name);
    console.log(contact.phoneNum);

    console.log("포스트 성공!!!!!");
    const newContact = await contact.save();
    console.log("after save");
    // res.send(req.body.name);
    // res.send(req.body.phoneNum);
    // if (contact._id){
    //   res.send(JSON.stringify(contact._id));
    //   console.log(JSON.stringify(contact._id));
    // } else {
    //   console.log("id of contact is null");
    // }
    // console.log(newContact._id);
    // res.send(newContact._id);

    // console.log(newContact._id)
    // res.send(newContact._id);
    
    res.status(201).json(newContact);
    // res.status(201).send(newContact._id);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({message: err.message});
  }
});

// Update by id
router.put('/put/:id/:name/:phoneNum', getContact, async (req, res) => {
  if (req.params.name != null) {
    res.contact.name = req.params.name;
  }
  if (req.params.phoneNum != null) {
    res.contact.phoneNum = req.params.phoneNum;
  }
  
  // if (req.body.name != null) {
  //   res.contact.name = req.body.name;
  // }
  // if (req.body.phoneNum != null) {
  //   res.contact.phoneNum = req.body.phoneNum;
  // }
  // if (req.body.profileImage != null) {
  //   res.contact.profileImage = req.body.profileImage;
  // }
  try {
    const updatedContact = await res.contact.save();
    // res.json(updatedContact);  
    console.log("update contact:");
    console.log(updatedContact);
    res.send(updatedContact);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
  // Contact.updateByPhoneNum(req.params.phoneNum, req.body)
  //   .then(contact => res.send(contact))
  //   .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/delete/:id', getContact, async (req, res) => {
  try {
    console.log(`deleted contact ㅎㅎ\n ${res.contact}`);
    await res.contact.remove();
    res.json({ message: "Deleted contact" });
  } catch (err) {
    res.status(500).json({message: err.message});
  }
  // Contact.deleteByPhoneNum(req.params.phoneNum)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => res.status(500).send(err));
});

// Delete All
router.delete('/deleteAll', async (req, res) => {
  try {
    const contacts = await Contact.remove();
    // await res.contact.remove();
    res.json(contacts);
    res.json({message: "deleted all~~~"});
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
  // Contact.deleteByPhoneNum(req.params.phoneNum)
  //   .then(() => res.sendStatus(200))
  //   .catch(err => res.status(500).send(err));
});

async function getContact(req, res, next){
  let contact;
  try {
    contact = await Contact.findById(req.params.id);
    if (contact == null) {
      return res.status(404).json({ message: 'Cannot find Contact' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.contact = contact;
  next();
}

module.exports = router;