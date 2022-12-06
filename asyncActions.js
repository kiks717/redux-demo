const redux = require('redux');
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
//loading flag
const initalState = {
    loading : false,
    users : [],
    error : ''
};
        //OVO SU ACTION TYPES
const FETCH_USERS_REQUSTED = 'FETCH_USERS_REQUSTED';
const FETCH_USERS_SUCCSSEDED = 'FETCH_USERS_SUCCSSEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';
        //OVO SU ACTION TYPES


            //OVO SU ACTION CREATORS ZA SVAKI ACTION TYPE 
const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUSTED,
    }
};

const fetchUsersSuccess = (users) => {
    return {
        type  : FETCH_USERS_SUCCSSEDED,
        payload : users,
    }
};

const fetchUsersFaliure = (error) => {
    return {
        type : FETCH_USERS_FAILED,
        payload: error
    }
};
            //OVO SU ACTION CREATORS ZA SVAKI ACTION TYPE 


const reducer = (state = initalState,action) => {
    switch(action.type){
        case FETCH_USERS_REQUSTED:
            return{
                ...state,
                loading :true
            }
        case FETCH_USERS_SUCCSSEDED:
            return {
                loading :false,
                users : action.payload,
                error: ''
            }
        case FETCH_USERS_FAILED:
            return {
                loading : false,
                users : [],
                error : action.payload
            }
    }
};
        //ACTION CREATOR
        //VRACA FUNKCIJU KOJA IMA PRISTUP DISPATCH
    /*omoguceno je putem thunkMiddleware */

const fetchUsers = () => {
    return function(dispatch){

        dispatch(fetchUsersRequest());

        axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            // respone.data is the users 
            const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
        //ako dispatch uspije saljemo users 
        })
        
        .catch(error => {
            // err.message is the error message
        dispatch(fetchUsersFaliure(error.message));
        })
    }
}
        //ACTION CREATOR

const store = createStore(reducer,applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());