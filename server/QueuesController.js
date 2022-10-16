
const dao = require('./QueuesDao');




//Always use the lastid+1 to creat new id.
exports.getTicket =async function(req,res)  {
    const lastId = await dao.getLastTicketID();
    dao.getTicket(lastId+1).then(
        result => {
             return res.status(200).json(result);                       
        },
        error => {
            return res.status(500).send(error);
        }
    )

}

//Input you id of ticket, get the length of queue before you
exports.getLength =async function(req,res)  {
    dao.getLength(req.params.IdTicket).then(
        result => {
             return res.status(200).json(result);                       
        },
        error => {
            return res.status(500).send(error);
        }
    )

}

exports.clearQueues =async function(req,res)  {
    dao.deleteQueues().then(
        result => {
             return res.status(200).json(result);                       
        },
        error => {
            return res.status(500).send(error);
        }
    )

}