import axios from 'axios';
import React, { Component } from 'react'
import Global from '../Global';
import { Navigate } from 'react-router-dom';

class Create extends Component {

    state = {
        status: false
    }

    url = Global.urlHospitales;

    cajaId = React.createRef();
    cajaNombre = React.createRef();
    cajaDireccion = React.createRef();
    cajaTelefono = React.createRef();
    cajaCamas = React.createRef();

    createHospital = (event) => {
        event.preventDefault();

        var request = "/webresources/hospitales/post";

        var id = parseInt(this.cajaId.current.value);
        var nombre = this.cajaNombre.current.value;
        var direccion = this.cajaDireccion.current.value;
        var telefono = this.cajaTelefono.current.value;
        var camas = parseInt(this.cajaCamas.current.value);

        var hospital = {
            idhospital: id,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            camas: camas
        };

        axios.post(this.url + request,hospital).then(response => {
            console.log("Hospital creado correctamente.");
            // Notificar globalmente que la lista de hospitales ha cambiado
            window.dispatchEvent(new CustomEvent('hospital:changed'));
            this.setState({
                status: true
            });
        });

        
    }

    render() {

        if (this.state.status === true) {
            this.setState({
                status: false
            });
            return <Navigate to="/"/>;
        }

        return (
            <div className='container'>
                <h2>Registrar Hospital</h2>
                <div className='container p-4' style={{ border: "1px solid black" }}>
                    <h4>Rellenar</h4>
                    <form style={{ marginTop: "10px" }} onSubmit={this.createHospital}>
                        <label className='form-label'>Introduce el ID: </label>
                        <input className='form-control' type='text' ref={this.cajaId} />
                        <label className='form-label'>Introduce el nombre: </label>
                        <input className='form-control' type='text' ref={this.cajaNombre} />
                        <label className='form-label'>Introduce la dirección: </label>
                        <input className='form-control' type='text' ref={this.cajaDireccion} />
                        <label className='form-label'>Introduce el teléfono: </label>
                        <input className='form-control' type='text' ref={this.cajaTelefono} />
                        <label className='form-label'>Introduce el número de camas: </label>
                        <input className='form-control' type='text' ref={this.cajaCamas} />
                        <button className='btn btn-success'>Añadir</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;