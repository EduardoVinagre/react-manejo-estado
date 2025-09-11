import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false
        };
    }

    componentDidUpdate(){
        console.log('Inicio');
        if(!!this.state.loading){
            setTimeout(()=> {
                console.log('Iniciando la validacion');
                if(this.state.value === SECURITY_CODE){
                    this.setState({
                        error: false,
                        loading: false
                    });
                } else {
                    this.setState({
                        error: true,
                        loading: false
                    });
                }
                console.log('Terminando la validacion')
            }, 3000);    
        }
        console.log('fin');
    }

    render() {
        return (
            <div>
                <h2>Eliminar { this.props.name }</h2>
                <p>Por favor, escribe el código de seguridad para confirmar que quieres eliminar</p>
                {(this.state.error && !this.state.loading) && 
                    (<p>Error: El código es incorrecto</p>)}
                {
                    this.state.loading && (
                        <Loading />
                    )
                }
                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(event)=>{
                        console.log('Actualizando');
                        this.setState({ value: event.target.value });
                    }}
                />
                <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
            </div>
        )
    }
}

export { ClassState };