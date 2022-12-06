 const redux = require('redux');
 const createdStore = redux.legacy_createStore;
 const bindActionCreators = redux.bindActionCreators;
 const combineReducer = redux.combineReducers;
 const reduxLogger = require('redux-logger');
 const applMiddleware = redux.applyMiddleware
 const logger = reduxLogger.createLogger();
 

                    //APP AND ACTION

//koji je tip akcije(narucivanje)
const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCED = 'CAKE_RESTOCED';
//definisemo akciju(objekat sa type property cija je vrijednost ova constanta)
 
                        //DEFINISATI ACTION I ACTION CREATOR TO RESTOCK ITEMS
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

//kreirati akciju,funkcija koja vraca akciju 
function orderCake(){
    return {
        type : CAKE_ORDERED,
        payload : 1
    }
};
function restockCake(qty = 1){
    return {
        type : CAKE_RESTOCED,
        payload : qty,
    }
};

function orderIceCream(qty = 1){
    return {
        type : ICECREAM_ORDERED,
        payload : qty
    }
};
function restockIceCream(qty = 1){
    return {
        type : ICECREAM_RESTOCKED,
        payload : qty
    }
}

                    //REDUCER
         //(prevState,action) => newState

const initalCakeState = {
    numOfCakes : 10
};
const initalIceCreamState = {
    numOfIceCreams : 20
};
const cakeReducer = (state = initalCakeState,action) => {
    switch(action.type){
        case CAKE_ORDERED :
            return {
                ...state,
                numOfCakes : state.numOfCakes - 1
            };

        case CAKE_RESTOCED : 
            return {
                ...state,
                numOfCakes : state.numOfCakes + action.payload
            }
            default : 
            return state;
    }
};

const iceCreamReducer = (state = initalIceCreamState,action) => {
    switch(action.type){
        case ICECREAM_ORDERED :
            return {
                ...state,
                numOfIceCreams : state.numOfIceCreams - 1

            }
        case ICECREAM_RESTOCKED : 
            return {
                ...state,
                numOfIceCreams : state.numOfIceCreams + action.payload
            }
        case CAKE_ORDERED: 
        //za svaku kupljenu tortu dajemo gratis sladoled
            return{
                ...state,
                numOfIceCreams : state.numOfIceCreams - 1,
            }
            default :
            return state;
    }
};

const rootReducer = combineReducer({
    cake : cakeReducer,
    iceCream : iceCreamReducer
});
const store = createdStore(rootReducer);

console.log("inital State", store.getState());




                    //LISTENER 
const unsubscribe = store.subscribe(() => {
    console.log('Updated state', store.getState());
});
//kad god se updejtuje logujemo u clg
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());

// store.dispatch(restockCake())
const actions = bindActionCreators({orderCake,restockCake,orderIceCream,restockIceCream}, store.dispatch)
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);

actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);
        // ovo ce dati isti output kao i store.dispatch
unsubscribe();

//can't log out cuz im unable to install store 
//but console is 

                //kada se porucuju torte
/*Inital state : {numOfCakes : 10}, numOfIcecreams : 20*/
/*Updated state : {numOfCakes : 9}, numOfIcecreams : 20 */
/*Updated state : {numOfCakes : 8}, numOfIcecreams : 20 */
/*Updated state : {numOfCakes : 7}, numOfIcecreams : 20 */

                //kada se porucuju sladoledi 
/*Updated state : {numOfCakes : 10}, numOfIcecreams : 19 */
/*Updated state : {numOfCakes : 10}, numOfIcecreams : 18 */
/*Updated state : {numOfCakes : 10}, numOfIcecreams : 17 */
/*Updated state : {numOfCakes : 10}, numOfIcecreams : 20 */


/*Updated state : {numOfCakes : 10} ovo je od restockCake */



// const reducer = (state = initalState,action) => {
//         //state=initalValue-pocetno stanje 10 
//         switch(action.type){
//             case CAKE_ORDERED :
//                 return {
//                     //potrebno je sacuvati i prethodno stanje u slucaju da ima jos neki property
//                     ...state,//kopiraj prvo pa onda update ako ima nesto 
//                     numOfCakes : state.numOfCakes - 1
//                     /*ako ima neka akcija tj kupovina
//                     kolicina treba da se umanji za 1 */
//                 }
//             case CAKE_RESTOCED : 
//                 return {
//                     ...state,
//                     numOfCakes : state.numOfCakes + action.payload
//                 }
// //for iceCream
//             case ICECREAM_ORDERED : 
//                 return {
//                     ...state,
//                     numOfIceCreams : state.numOfIceCreams - 1
//                 }
//             case ICECREAM_RESTOCKED : 
//                 return {
//                     ...state,
//                     numOfIceCreams : state.numOfIceCreams + action.payload
//                 }
            
//                 default :
//                 return state
//                 //ako se nista nije promjenilo 
//                 //zelim normalno stanje
//         }
// };