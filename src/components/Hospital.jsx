import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export class Hospital extends Component {

    urlHospital = Global.urlHospitales;
    urlDoctores = Global.urlDoctores;

    state = {
        status: false,
        hospital: null,
        doctores: []
    }

    loadHospital = () => {
        var request = "/webresources/hospitales/" + this.props.idhospital;

        console.log("Cargando datos de hospital con ID " + this.props.idhospital + "...");
        axios.get(this.urlHospital + request).then(response => {
            this.setState({
                hospital: response.data
            })
        })
        console.log("Datos del hospital cargados.");
    }

    loadDoctoresByIdHospital = () => {
        var request = "/api/doctores/doctoreshospital/" + this.props.idhospital;

        console.log("Obteniendo lista de doctores...");
        axios.get(this.urlDoctores + request).then(response => {
            this.setState({
                doctores: response.data
            })
        })
    }

    deleteHospital = () => {
        console.log("Eliminando hospital con ID " + this.props.idhospital + "...");
        var request = "/webresources/hospitales/delete/" + this.props.idhospital;
        axios.delete(this.urlHospital + request).then(response => {
            console.log("Hospital eliminado correctamente.");
            // Notificar globalmente que la lista de hospitales ha cambiado
            window.dispatchEvent(new CustomEvent('hospital:changed'));
            this.setState({
                status: true
            });
        });
    }

    componentDidMount = () => {
        this.loadHospital();
        this.loadDoctoresByIdHospital();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idhospital !== this.props.idhospital) {
            console.log(`Cambiando de ID ${oldProps.idhospital} a ${this.props.idhospital}`);
            this.loadHospital();
            this.loadDoctoresByIdHospital();
        }
    }

    render() {

        if (this.state.status === true) {
            this.setState({
                status: false
            });
            return <Navigate to="/"/>;
        }

        return (
            <div className='container p-3'>
                <h1>Información de Hospital</h1>
                {
                    this.state.hospital != null &&
                    <div id='infohospital' className='container mt-4 p-3' style={{ border: "1px solid black" }}>
                        <h3>Hospital {this.state.hospital.nombre}</h3>
                        <p>Dirección: {this.state.hospital.direccion}</p>
                        <p>Teléfono: {this.state.hospital.telefono}</p>
                        <p>Nº de camas: {this.state.hospital.camas}</p>
                    </div>
                }

                {
                    this.state.doctores.length !== 0 &&
                    <div className='container mt-4' style={{ border: "1px solid black" }}>
                        <h3>Lista de Doctores</h3>
                        <table className='table mt-5 table-bordered'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Apellido</th>
                                    <th>Especialidad</th>
                                    <th>Salario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.doctores.map((doctor, index) => {
                                        return <tr key={index}>
                                            <td>{doctor.idDoctor}</td>
                                            <td>{doctor.apellido}</td>
                                            <td>{doctor.especialidad}</td>
                                            <td>{doctor.salario}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <button className='btn btn-danger' onClick={() => { this.deleteHospital() }}>Eliminar</button>
            </div>
        )
    }
}

export default Hospital