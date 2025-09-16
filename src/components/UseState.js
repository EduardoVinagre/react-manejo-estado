import React from "react";

function UseState({ name }) {
    const SECURITY_CODE = 'paradigma';
    const [state, setState] = React.useState({
        loading: false,
        error: false,
        value: '',
        deleted: false,
        confirmed: false,
    });

    React.useEffect(()=>{
        console.log('Inicio');        
        if(!!state.loading){
            setTimeout(()=> {
                console.log('Iniciando la validacion');
                setState({
                    ...state,
                    loading:false,
                });
                console.log(state);
                if(state.value === SECURITY_CODE){
                    setState({
                        ...state,
                        loading: false,
                        error:false,
                        confirmed: true
                    })
                }
                else{
                    setState({
                        ...state,
                        loading: false,
                        error:true
                    })
                }
                console.log(state);
                console.log('Terminando la validacion');
            }, 3000);    
        }
        console.log('fin');
    },[state.loading]);

    if(!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar { name }</h2>
                <p>Por favor, escribe el código de seguridad para confirmar que quieres eliminar</p>

                {(state.error && !state.loading) && 
                    (<p>Error: El código es incorrecto</p>)}
                {state.loading && 
                    (<p>Cargando...</p>)}
                <input 
                placeholder="Código de seguridad"
                value={state.value}
                onChange={(event)=>{
                    console.log(event.target.value);
                    setState({
                        ...state,
                        value: event.target.value
                    });
                }}/>
                <button onClick={()=> {setState({
                    ...state,
                    loading:true
                    })}}>Comprobar</button>
            </div>
            )
    } else if (!!state.confirmed && !state.deleted){
        return (
            <React.Fragment>
                <p>Esta seguro de eliminar</p>
                <button 
                    onClick={
                        ()=>{
                            setState({
                                ...state,
                                deleted: true
                            })
                        }
                    }>Si, eliminar</button>
                <button onClick={
                        ()=>{
                            setState({
                                ...state,
                                confirmed: false,
                                value: ''
                            })
                        }
                    }>No, conservar</button>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>
                                <button onClick={
                        ()=>{
                            setState({
                                ...state,
                                confirmed: false,
                                deleted: false,
                                value: ''
                            })
                        }
                    }>Recuperar estado</button>
            </React.Fragment>
        )
    }
    
}

export { UseState };