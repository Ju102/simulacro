import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';

export class Edit extends Component {

    url = Global.urlHospitales;

    state = {
        status: false
    }

    editarHospital = (event) => {
        event.preventDefault();

        // Lógica para editar el hospital

        var request = "/webresources/hospitales/put";

        axios.put(this.url + request, {
            idhospital: this.props.idhospital,
            nombre: this.props.nombre,
            direccion: this.props.direccion,
            telefono: this.props.telefono,
            camas: this.props.camas
        }).then(response => {
            console.log("Hospital editado correctamente.");
            this.setState({
                status: true
            });
        });
    }

    render() {
            return(
            <div> Edit</div >
        )
    }
}

export default Edit