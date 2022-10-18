const APIURL = 'http://localhost:3001/api/v0';

/*************************AUTHENTICATION API**********************/

const logIn = async (credentials) => {
    const response = await fetch(APIURL + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    }
    else {
        const errDetails = await response.text();
        throw errDetails;
    }
};

const guest = { id: 0, name: 'Guest' }; //Dummy object in case of error

//API: getUserInfo----------------------------------------------------
const getUserInfo = async () => {
    const response = await fetch(APIURL + '/sessions/current', {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else {
        return guest;
    }
};

//FINAL STEP-->LOGOUT-->Destroy the session info associated to the authorized user
const logOut = async () => {
    const response = await fetch(APIURL + '/sessions/current', {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}

/*************************SERVICES API**********************/

async function getServices(){
    const res = await fetch('http://localhost:3001'+'/api/services', {
        method:'GET',
        credentials: 'include',
    });
    if(res.ok){
        const studyPlan = await res.json();
        return studyPlan;
    }else{
        const err = await res.text();
        // console.log(err)
        throw err;
    }
}

/*************************TICKET API**********************/

async function takeTicket(service){
    const res = await fetch('http://localhost:3001'+'/api/Ticket/'+service, {
        method:'POST',
        credentials: 'include',
    });
    if(res.ok){
        const tId = await res.json();
        return tId;
    }else{
        const err = await res.text();
        // console.log(err)
        throw err;
    }
}


/************************************************/

/*************OBJECTS API****************/

/*** API Structure left for reference
//API: readRiddles--------------------------------------------------------
async function readRiddles() {

    const url = APIURL + '/riddles';
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const list = await response.json();
            const riddleList = list.map((r) => new Riddle(r.id, r.question, r.difficulty, r.duration, r.correct_answer, r.hint_1, r.hint_2, r.status_riddle, r.user_id));
            return riddleList;
        } else {
            // application error (404, 500, ...)
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        // network error
        console.log(ex);
        throw ex;
    }
}

//API:addRiddle function---------------------------------
async function addRiddle(riddle_to_add) {
    const url = APIURL + '/riddles/addRiddle';
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(riddle_to_add),
            headers: {
                'Content-Type': 'application/json'
            }

        });
        if (response.ok) {
            return true;
        } else {
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}

//API:updateRiddleStatus function--------------------
async function updateRiddleStatus(id, status) {
    const url = APIURL + `/riddles/updateRiddleStatus/${id}/${status}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        if (response.ok) {
            return true;
        } else {
            console.log(response.statusText);
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (ex) {
        throw ex;
    }
}
****/


//EXPORT FUNCTIONS------------------------------
const API = { logIn, getUserInfo, logOut, getServices, takeTicket}
export default API;