# OfficeQueueManagement22-13

Technology used: Javascript - React

## DB Documentation 
The tables present in the DB are the following:

### Counters
The list of the counters available in the office
- Id: Primary key identifying the counters of the office

### Services
The list of the services available in the office
- ServiceName: Primary key identifying a type of service
- AverageTime: The average time needed to deliver the associated service

### Users
The list of the users, their credentials and their roles
- Id: Primary key identifying a user
- Name: The name of the user
- Lastname: The last name of the user
- Email: The email of the user
- Role: The role of the user
- Password: The hashed password of the user
- Salt: The salt used in the encryption process

### Counters_Services
Association table that links counters with the services they provide
- IdCounter: The Id of a counter
- ServiceName: The name of the service provided

Both these fields are primary key

### Queues
Table that saves all the tickets of the day, both served and not, for synchronization purposes
- IdTicket: Primary key identifying a single ticket, of type XYY, where X is a letter identifying a type service and YY are numbers
- IsCalled: Boolean specifying whether a ticket has already been called or not 

### Service_Data
Table that saves each time a service is delivered and by who
- ServiceName: The name of the service delivered
- User: The email of the user that delivered the service
- DateTime: The time at which the service was delivered
- IsServed: Boolean specifying whether the ticket called was served or absent

The first three fields are primary key

### Users:

Mario Rossi:
- email: mario.rossi@gmail.com
- password: hello12
- role: officier

Paulina Knight:
- email: paulina.knight@gmail.com
- password: hello13
- role: manager

Carlene Ross:
- email: carlene.ross@gmail.com
- password: hello14
- role: admin 

## API

#### GET /api/Services

- **Get all existing services**.
- **Response**: `200 OK` (success); body: List with service name and average required time.

```
[
	{
		"ServiceName": "Managment",
		"AverageTime": 15
	},
	{
		"ServiceName": "Accountant",
		"AverageTime": 30
	},
	{
		"ServiceName": "Help",
		"AverageTime": 5
	}
]
```

- **Error responses**: `500 Internal Server Error` (generic error).

#### POST /api/Ticket/:ServiceName

- **Generate a new ticket**.
- **Response**: `200 OK` (success); body: Value of the ticket ID i.e 'M12'.
- **Error responses**: `500 Internal Server Error` (generic error).
