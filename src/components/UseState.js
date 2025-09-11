import React from "react";

function UseState({ name }) {
    const SECURITY_CODE = 'paradigma';
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        console.log('Inicio');        
        if(!!loading){
            setError(false);
            setTimeout(()=> {
                console.log('Iniciando la validacion');
                console.log('Terminando la validacion');
                setLoading(false);
                if(value !== SECURITY_CODE){
                    setError(true)
                }
            }, 3000);    
        }
        console.log('fin');
    },[loading]);

    return (
    <div>
        <h2>Eliminar { name }</h2>
        <p>Por favor, escribe el código de seguridad para confirmar que quieres eliminar</p>

        {error && 
            (<p>Error: El código es incorrecto</p>)}
        {loading && 
            (<p>Cargando...</p>)}
        <input 
        placeholder="Código de seguridad"
        value={value}
        onChange={(event)=>{
            setValue(event.target.value);
        }}/>
        <button onClick={()=> setLoading(true)}>Comprobar</button>
    </div>
    )
}

export { UseState };