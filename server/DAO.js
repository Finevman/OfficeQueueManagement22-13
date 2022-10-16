'use strict';

const sqlite = require('sqlite3');
//const { Resolver } = require('dns/promises');

const db = new sqlite.Database('oqm.db', (err) => {
  if (err) {
    throw err;
  }
});

/*************USERS CRUD************/
function readUsers() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM USERS';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO USERS (Name, Lastname, Email, Password, Salt, Role) VALUES(?,?,?,?,?,?)';
    db.run(sql, user.name, user.lastname, user.email, user.password, user.salt, user.role, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

//update role
function updateUserRole(id, role) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE USERS SET Role = ? where Id = ?';
    db.run(sql, role, id, (err, rows) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM USERS WHERE Id = ?';
    db.run(query, id, (err) => {
      if (err) {
        reject(err);
      } else
        resolve(true);
    });
  });
};

/*************SERVICES CRUD************/

function readServices() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM SERVICES';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function addService(service) {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO SERVICES (ServiceName, AverageTime) VALUES(?,?)';
    db.run(sql, service.name, service.averageTime, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

function updateServiceName(name) {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE SERVICES SET ServiceName = ? where ServiceName = ?';
    db.run(sql, role, name, (err, rows) => {
      if (err)
        reject(err);
      else
        resolve(true);
    });
  });
}

function deleteService(name) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM SERVICES WHERE ServiceName = ?';
    db.run(query, name, (err) => {
      if (err) {
        reject(err);
      } else
        resolve(true);
    });
  });
};

/*************QUEUES FUNCTIONS************/

function readTicketsToBeServed() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Queues WHERE IsCalled = 0 ORDER BY IdTicket';  // IsCalled = 0 -> not served
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/*************COUNTERS FUNCTIONS************/

function readCounters() {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Counters ';
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getCounterByService(serviceName) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT IdCounter FROM Counters_Services WHERE ServiceName = ?';
    db.get(sql, serviceName, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        resolve(false);
      else
        resolve(rows);
    })
  })
}

function getServiceByCounter(idCounter) {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT ServiceName FROM Counters_Services WHERE IdCounter = ?';
    db.get(sql, idCounter, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        resolve(false);
      else
        resolve(rows);
    })
  })
}

/*************SERVICES DATA FUNCTIONS************/

module.exports = {
  readUsers, addUser, updateUserRole, deleteUser, readServices, addService, updateServiceName, deleteService,
  readTicketsToBeServed, readCounters, getCounterByService, getServiceByCounter
};