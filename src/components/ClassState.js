import React from "react";
import { Loading } from "./Loading";
import { configure } from "@testing-library/dom";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            error: false,
            loading: false,
            confirmed: false,
            deleted: false
        };
    }

    componentDidUpdate() {
        console.log('Inicio');
        if (!!this.state.loading) {
            setTimeout(() => {
                console.log('Iniciando la validacion');
                if (this.state.value === SECURITY_CODE) {
                    this.setState({
                        error: false,
                        loading: false,
                        confirmed: true
                    });
                } else {
                    this.setState({
                        error: true,
                        loading: false,
                        confirmed: false
                    });
                }
                console.log('Terminando la validacion')
            }, 3000);
        }
        console.log('fin');
    }

    render() {
        if (!this.state.deleted && !this.state.confirmed) {
            return (
                <div>
                    <h2>Eliminar {this.props.name}</h2>
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
                        onChange={(event) => {
                            console.log('Actualizando');
                            this.setState({ value: event.target.value });
                        }}
                    />
                    <button onClick={() => this.setState({ loading: true })}>Comprobar</button>
                </div>
            )
        } else if (this.state.confirmed && !this.state.deleted) {
            return (
                <React.Fragment>
                    <p>Esta seguro de eliminar</p>
                    <button
                        onClick={
                            () => {
                                this.setState({
                                    deleted: true
                                })
                            }
                        }>Si, eliminar</button>
                    <button onClick={
                        () => {
                            this.setState({
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
                        () => {
                            this.setState({
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
}

export { ClassState };