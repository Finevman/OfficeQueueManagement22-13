var express = require('express');
var router = express.Router();
var c = require('./QueuesController');



router.post('/Ticket',c.getTicket);
router.delete('/Queues',c.clearQueues);
router.get('/Length/:IdTicket',c.getLength);

module.exports = router