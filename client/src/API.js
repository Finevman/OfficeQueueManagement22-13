import Answer from './Answer.js';
import Riddle from './Riddle.js';

const APIURL = 'http://localhost:3001/api/v36';

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
/************************************************/

/*************RIDDLES API****************/

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

/*************TIMERS API****************/

//API: readTimers--------------------------------------------------------
async function readTimers() {

    const url = APIURL + '/timers/readTimers';
    try {
        const response = await fetch(url);
        if (response.ok) {
            return true;
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

//API: getTimerArray--------------------------------------------------------
async function getTimerArray() {

    const url = APIURL + '/timers/timerArray';
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const list = await response.json();
            const timerArray = list.map((t) => ({ id: t.id, timer: t.timer }));
            return timerArray;
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

//API:addTimer function---------------------------------
async function addTimer(timer_to_add) {
    const url = APIURL + '/timers/addTimer';
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(timer_to_add),
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

/*************ANSWERS API****************/

//API: readRiddleAnswers--------------------------------------------------------
async function readRiddleAnswers(riddle_id) {
    const url = APIURL + `/answers/readRiddleAnswers/${riddle_id}`;
    try {
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // process the response
            const list = await response.json();
            const answerList = list.map((a) => new Answer(a.id_user, a.id_riddle, a.answer, a.is_correct));
            return answerList;
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

//API:addAnswer function---------------------------------
async function addAnswer(answer_to_add) {
    const url = APIURL + '/answers/addAnswer';
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(answer_to_add),
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

/*************USERS API****************/

//API: readUsersScore--------------------------------------------------------
async function readUsersScore() {

    const url = APIURL + '/users/score';
    try {
        const response = await fetch(url);
        if (response.ok) {
            // process the response
            const list = await response.json();
            return list;
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

//API: getWinner--------------------------------------------------------
async function getWinner(id) {

    const url = APIURL + `/users/winner/${id}`;
    try {
        const response = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // process the response
            const winner = await response.json();
            if (winner !== false)
                return "The winner was " + winner.name;
            else
                return 'No one solved this riddle';
        } else {
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

//API:increaseScore function--------------------
async function increaseScore(newScore) {
    const url = APIURL + `/users/increaseScore/${newScore}`;
    console.log("IncreaseScore url: ", url);
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


//EXPORT FUNCTIONS------------------------------
const API = { logIn, getUserInfo, logOut, readRiddles, addRiddle, increaseScore, addAnswer, updateRiddleStatus, readRiddleAnswers, getWinner, readUsersScore, addTimer, readTimers, getTimerArray }
export default API;