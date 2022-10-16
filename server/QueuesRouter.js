var express = require('express');
var router = express.Router();
var c = require('./QueuesController');


//Enter service name to get a ticket 
router.post('/Ticket/:ServiceName',c.getTicket);
router.delete('/Queues',c.clearQueues);
router.get('/Length/:IdTicket',c.getLength);

module.exports = router