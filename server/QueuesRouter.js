var express = require('express');
var router = express.Router();
var c = require('./QueuesController');


//Enter service name to get a ticket 
router.post('/Ticket/:ServiceName',c.getTicket);
//Delete all queues
router.delete('/Queues',c.clearQueues);
//Enter your ticket id and get the queue length before you.
router.get('/Length/:IdTicket',c.getLength);
//get all services and it's averageTime
router.get('/Services',c.getServices);

module.exports = router