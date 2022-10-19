
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
        const  _charStr ='abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
        let min = 0, max = _charStr.length-1, salt = '';
        let len = 32;

        for(var i = 0, index; i < len; i++){
             
            let index = Math.floor(Math.random()*(max-min+1)+min),
            numStart = _charStr.length - 10;
            if(i==0&&index>=numStart){
                index = RandomIndex(min, max, i);
            }
                     
            salt += _charStr[index];
        }
    // console.log(salt);
    dao.addUser(req.body.Name, req.body.Lastname, req.body.Email, req.body.Password, salt, req.body.Role).then(
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




