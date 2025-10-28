import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Menu from './components/Menu'
import Home from './components/Home'
import Hospital from './components/Hospital'
import Create from './components/Create'

export class Router extends Component {
    render() {
        function HospitalElement() {
            let { idhospital } = useParams();

            return <Hospital idhospital={idhospital} />
        }

        return (
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hospital/:idhospital" element={<HospitalElement />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </BrowserRouter>
        )
    }
}

export default Router