import React from "react";

function UseState({ name }) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(()=>{
        console.log('Inicio');
        if(!!loading){
            setTimeout(()=> {
                console.log('Iniciando la validacion');
                console.log('Terminando la validacion')
                setLoading(false);
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
        <input placeholder="Código de seguridad"/>
        <button onClick={()=> setLoading(true)}>Comprobar</button>
    </div>
    )
}

export { UseState };