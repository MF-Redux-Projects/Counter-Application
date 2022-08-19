//Select Dom Element
const counterWrapperEl = document.getElementById("counter-wrapper");
const counterCloneEl = document.getElementById("counter-clone");
const addCounterEl = document.getElementById("add-counter");
const resetEl = document.getElementById("reset");

//Initial State
const initialState = {
    counter: [
        {
            idName: "counter-1",
            counter: 0,
        },
    ],
};

//Action Indentifier
const INCREMENT = "increment";
const DECREMENT = "decrement";
const COUNTER = "counter";

//Action Creator
const increment = (id, value) => {
    return {
        type: INCREMENT,
        payload: {
            id: id,
            value: value,
        },
    };
};

const decrement = (id, value) => {
    return {
        type: DECREMENT,
        payload: {
            id: id,
            value: value,
        },
    };
};

const counter = (value) => {
    return {
        type: COUNTER,
        payload: value,
    };
};

//Create Reducer Function
function counterReducer(state = initialState, action) {
    let index = 0;
    let currentState = state;
    if (action.type === INCREMENT || action.type === DECREMENT) {
        Object.keys(state.counter).forEach((key) => {
            if (state.counter[key].idName === action.payload.id) {
                if (action.type === INCREMENT) {
                    currentState.counter[key].counter = state.counter[key].counter + action.payload.value;
                } else {
                    currentState.counter[key].counter = state.counter[key].counter - action.payload.value;
                }
            }
        });
    }
    switch (action.type) {
        case INCREMENT:
            return {
                ...currentState,
            };
        case DECREMENT:
            return {
                ...currentState,
            };

        case COUNTER:
            return {...state, counter: [...state.counter, action.payload]};
        default:
            return state;
    }
}

//Create Store
const store = Redux.createStore(counterReducer);

//Subscribe to Store
const render = () => {
    const state = store.getState();

    state.counter.forEach((item) => {
        document.getElementById(item.idName).innerHTML = item.counter;
    });
};
render();

//subscribe to store changes
store.subscribe(render);

//Button Click Listener
function handleIncrement(event) {
    let id = event.target.parentNode.parentNode.childNodes[1].id;
    store.dispatch(increment(id, 3));
}

function handleDecrement(event) {
    let id = event.target.parentNode.parentNode.childNodes[1].id;
    store.dispatch(decrement(id, 2));
}

let counterId = 1;
addCounterEl.addEventListener("click", () => {
    counterId++;
    let counterIdName = "counter-" + counterId;
    const newCounter = counterCloneEl.cloneNode(true);
    newCounter.childNodes[1].id = counterIdName;
    counterWrapperEl.appendChild(newCounter);
    store.dispatch(
        counter({
            idName: counterIdName,
            counter: 0,
        })
    );
});

//Reset State
resetEl.addEventListener("click", () => {
    const state = store.getState();

    state.counter.forEach((item) => {
        item.counter = 0;
        document.getElementById(item.idName).innerHTML = 0;
    });
});