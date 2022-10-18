var express = require('express');
var router = express.Router();
var c = require('./userController');


//add a new user with all information needed. (Name, Lastname, Email, Password, Salt, Role)
router.post('/User',c.addUser);
//delete a user with it's id
router.delete('/User/:id',c.deleteUser);
//get all users
router.get('/User',c.readUsers);
//update a user's role with it's id (need a id and role in body)
router.put('/User',c.updateUserRole);

module.exports = router