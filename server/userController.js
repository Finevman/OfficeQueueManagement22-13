
const dao = require('./DAO');



exports.readUsers =async function(req,res)  {

    dao.readUsers().then(
        result => {
            return res.status(200).json(result);                       
        },
        error => {
            return res.status(500).send(error);
        }
    )
}



exports.addUser =async function(req,res)  {

    dao.addUser(req.body.Name, req.body.Lastname, req.body.Email, req.body.Password, req.body.Salt, req.body.Role).then(
        result => {
            return res.status(200).json();                       
        },
        error => {
            return res.status(500).send(error);
        }
    )
}

exports.updateUserRole =async function(req,res)  {

    dao.updateUserRole(req.body.id,req.body.role).then(
        result => {
            return res.status(200).json();                       
        },
        error => {
            return res.status(500).send(error);
        }
    )
}

exports.deleteUser =async function(req,res)  {

    dao.deleteUser(req.params.id).then(
        result => {
            return res.status(200).json();                       
        },
        error => {
            return res.status(500).send(error);
        }
    )
}




