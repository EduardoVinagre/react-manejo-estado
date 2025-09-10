import React from "react";
import { Loading } from "./Loading";

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: true,
            loading: false
        };
    }

    componentDidUpdate(){
        console.log('Inicio');
        if(!!this.state.loading){
            setTimeout(()=> {
                console.log('Iniciando la validacion');
                console.log('Terminando la validacion')
                this.setState({loading: false});
            }, 3000);    
        }
        console.log('fin');
    }

    render() {
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad para confirmar que quieres eliminar</p>
                {this.state.error && 
                    (<p>Error: El código es incorrecto</p>)}
                {
                    this.state.loading && (
                        <Loading />
                    )
                }
                <input placeholder="Código de seguridad"/>
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }
}

export { ClassState };