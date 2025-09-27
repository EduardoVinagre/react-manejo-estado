import React, { act } from "react";

const initialState = {
    loading: false,
    error: false,
    value: '',
    deleted: false,
    confirmed: false,
}

const actionTypes = {
    confirm: 'CONFIRM',
    delete: 'DELETE',
    error: 'ERROR',
    check: 'CHECK',
    write: 'WRITE',
    reset: 'reset',
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
    [actionTypes.confirm]: {
        ...state,
        loading: false,
        error: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.write]: {
        ...state,
        value: payload
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]:{
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

    const onConfirm = () => dispatch({type: actionTypes.confirm })
    const onError = () => dispatch({type: actionTypes.error })
    const onCheck = () => dispatch({type: actionTypes.check })
    const onDelete = () => dispatch({type: actionTypes.delete })
    const onReset = () => dispatch({type: actionTypes.reset })
    const onWrite = ({target: { value }}) => dispatch({type: actionTypes.write, payload: value })

    React.useEffect(() => {
        console.log('Inicio');
        if (!!state.loading) {
            setTimeout(() => {
                console.log('Iniciando la validacion');
                if (state.value === SECURITY_CODE) {
                    onConfirm()
                }
                else {
                    onError()
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
                    onChange={ onWrite } />
                <button onClick={ onCheck }>Comprobar</button>
            </div>
        )
    } else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Esta seguro de eliminar</p>
                <button
                    onClick={ onDelete }>Si, eliminar</button>
                <button onClick={ onReset }>No, conservar</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                <button onClick={ onReset }>Recuperar estado</button>
            </React.Fragment>
        )
    }

}

export { UseReducer };