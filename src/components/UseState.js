import React from "react";

function UseState({ name }) {
    const SECURITY_CODE = 'paradigma';
    const [state, setState] = React.useState({
        loading: false,
        error: false,
        value: ''
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
                        error:false
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
}

export { UseState };