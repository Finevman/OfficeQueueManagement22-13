
const dao = require('./QueuesDao');




//Always use the lastid+1 to creat new id.
exports.getTicket =async function(req,res)  {
    const s =req.params.ServiceName;
    const c =s.charAt(0);
    // console.log(c);
    const Queues = await dao.getQueues();
    var count = 0;
    for (const queue of Queues) {
        if (queue.IdTicket.charAt(0)==c){
            
            count =parseInt(queue.IdTicket.substr(1 , queue.IdTicket.length-1 ));

        }
     
    }
    count++;
    count.toString();
    const tId =c+count;
    dao.getTicket(tId).then(
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
    console.log(req.params.IdTicket);
    const c =req.params.IdTicket.charAt(0);
    const id = parseInt(req.params.IdTicket.substr(1 , req.params.IdTicket.length-1 ));
    console.log(id);
    const Queues = await dao.getQueues();
    var num = 0;
    var counter = 0 ;
    for (const queue of Queues) {
        if (queue.IdTicket.charAt(0)==c){
            if(queue.IsCalled==0){
            num =parseInt(queue.IdTicket.substr(1 , queue.IdTicket.length-1 ));
            if (num<id) counter++;
            else res.status(200).json(counter);
        }
        }
     
    }
    // dao.getLength().then(
    //     result => {
    //          return res.status(200).json(result);                       
    //     },
    //     error => {
    //         return res.status(500).send(error);
    //     }
    // )

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