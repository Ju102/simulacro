import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from './../Global'
import axios from 'axios';

class Menu extends Component {

    url = Global.urlHospitales;

    state = {
        hospitales: [],
    }

    getHospitales = () => {

        var request = "webresources/hospitales";

        console.log("Obteniendo lista de hospitales...");
        axios.get(this.url + request).then(response => {
            console.log("Lista de hospitales obtenida.");
            this.setState({
                hospitales: response.data
            });
            console.log("Lista de hospitales cargada");
        });
    }

    componentDidMount = () => {
        this.getHospitales();
        // Escucha cambios globales de hospitales para refrescar el menú sin recargar
        window.addEventListener('hospital:changed', this.getHospitales);
    }

    componentWillUnmount = () => {
        // Limpia el listener al desmontar
        window.removeEventListener('hospital:changed', this.getHospitales);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <NavLink className="navbar-brand" to="/">
                        HOSPITAL
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menuPrincipal">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Inicio
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="/"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Hospitales
                                </a>
                                <ul className="dropdown-menu">
                                    {
                                        this.state.hospitales.map((hospital, index) => {
                                            return (<li key={index}>
                                                <NavLink className="dropdown-item" to={"hospital/" + hospital.idhospital}>{hospital.nombre}</NavLink>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create">
                                    Añadir Hospital
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu;