const initialState = {
    loading: false,
    error: false,
    value: '',
    deleted: false,
    confirmed: false,
}

// const reducer = (state, action) => {

// };

const reducerIf = (state, action) => {
    if(action.type === 'ERROR'){
        return {
            ...state,
            error: true,
            loading: false,
        }
    } else if(action.type === 'CHECK'){
        return {
            ...state,
            loading: false,
        }
    } else {
        return {
            ...initialState
        }
    }
};

const reducerSwitch = (state, action) => {
    switch(action.type){
    case 'ERROR':
        return {
            ...state,
            error: true,
            loading: false,
        }
    case 'CHECK':
        return {
            ...state,
            loading: false,
        }
    default:
        return {
            ...initialState
        }
        
    } 
}

const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    }
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state)[action.type]
    } else {
        return state;
    }
};