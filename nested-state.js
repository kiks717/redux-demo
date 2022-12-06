const redux = require('redux')
const produce = require('immer').produce
const initalState = {
    name : "Kristina",
    address : {
        street : '123 Main St',
        city: 'Chicago',
        state : 'Chicago'
    }
}

const STREET_UPDATE = 'STREET_UPDATE'
const updateStreet = (street) => {
    return {
        type : STREET_UPDATE,
        payload : street
    }
}

const reducer = (state = initalState,action) => {
    switch (action.type){
        case STREET_UPDATE : 
            // return {
            //     ...state,
            //     ...state.address,
            //     street: action.payload
            // }
        
            default : {
                return state
        }
    }
}
const store = redux.legacy_createStore(reducer)
console.log('Inital state',store.getState());

const unsubscribe  = store.subscribe(() => {
    console.log('Updated state', store.getState());
})
store.dispatch(updateStreet('456 Main St'))
unsubscribe()