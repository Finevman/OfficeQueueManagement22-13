'use strict';
const sqlite = require('sqlite3');


const db = new sqlite.Database('oqm.db', err => { if (err) throw err;});


// exports.getLength = (id) => {
//     return new Promise((resolve,reject)=>{
//         db.get("SELECT COUNT(IdTicket) FROM Queues WHERE IdTicket<? AND IsCalled =0",[id],(err,row)=>{
//             if (err)
//             reject(err);
//         else
//             resolve(row);
//         });
//       });
//     }



        exports.getQueueByService = (s) =>{
            console.log(s);
            return new Promise((resolve,reject)=>{
          
              db.get("SELECT IdTicket FROM Queues where IdTicket LIKE '?%'",[s],(err,rows)=>{
                console.log(rows);
                if(err){
                  reject (err);
                  return;
                }
                if (rows == undefined)
                resolve({ error: 'NOT found' });
                else
                resolve (rows)
              });
            });
          }

        
          exports.getQueues = () =>{
            return new Promise((resolve,reject)=>{
          
              db.all("SELECT * FROM Queues ",[],(err,rows)=>{
                if(err){
                  reject (err);
                  return;
                }
                resolve (rows)
              });
            });
          }
    
          exports.getServices = () =>{
            return new Promise((resolve,reject)=>{
          
              db.all("SELECT * FROM Services ",[],(err,rows)=>{
                if(err){
                  reject (err);
                  return;
                }
                resolve (rows)
              });
            });
          }
    


// exports.getLastTicketID = () => {
//     return new Promise((resolve,reject)=>{
//         db.get("SELECT IdTicket FROM Queues ORDER BY IdTicket DESC LIMIT 1",[],(err,row)=>{
//             if (err)
//             reject(err);
//         else
//             resolve(row == undefined ? 1 : row.IdTicket);
//         });
//       });
//     }


exports.getTicket = (id,) => {
    return new Promise(async (resolve, reject) => {
        db.run("INSERT INTO Queues (IdTicket,IsCalled) VALUES (?,0)",
            [id], function (err) {
                if (err)
                    reject(err);
                else
                    resolve('New ticket id added into queues.');
            });
    });
  }

  //The Queue must be clear after some times(maybe one day), or the number of idTicket will grow too big.
  exports.deleteQueues = () => {
    return new Promise(async (resolve, reject) => {
        db.run("DELETE FROM Queues",
            [], function (err) {
                if (err)
                    reject(err);
                else
                    resolve('All ticket in queues are cleared.');
            });
    });
  }