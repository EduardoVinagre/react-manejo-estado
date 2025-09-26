import React from "react";

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

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'RESET':{
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    }
})

const reducer = (state, action) => {
    if(reducerObject(state)[action.type]){
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state;
    }
};

function UseReducer({ name }) {
    const SECURITY_CODE = 'paradigma';
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        console.log('Inicio');
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Iniciando la validacion');
                if (state.value === SECURITY_CODE) {
                    dispatch({type: 'CONFIRM'});
                }
                else {
                    dispatch({type: 'ERROR'});
                }
                console.log(state);
                console.log('Terminando la validacion');
            }, 3000);
        }
        console.log('fin');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad para confirmar que quieres eliminar</p>

                {(state.error && !state.loading) &&
                    (<p>Error: El código es incorrecto</p>)}
                {state.loading &&
                    (<p>Cargando...</p>)}
                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        console.log(event.target.value);
                        dispatch({ type: 'WRITE', payload: event.target.value });
                    }} />
                <button onClick={() => {
                    dispatch({type: 'CHECK'});
                }}>Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Esta seguro de eliminar</p>
                <button
                    onClick={
                        () => {
                            dispatch({type: 'DELETE'});
                        }
                    }>Si, eliminar</button>
                <button onClick={
                    () => {
                        dispatch({type: 'RESET'});
                    }
                }>No, conservar</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={
                    () => {
                        dispatch({type: 'RESET'});
                    }
                }>Recuperar estado</button>
            </React.Fragment>
        )
    }

}

export { UseReducer };