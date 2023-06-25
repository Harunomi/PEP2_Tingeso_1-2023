import React, { Component } from 'react'
import ProveedorService from '../services/ProveedorService';

class HeaderComponent extends Component {
    constructor (props){
        super(props)

        this.state = {

        }
    }
    borrarTodo(){
        ProveedorService.borrarTodo();
    }
    
    render(){
        return (
            <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">Tingeso Evaluacion 1</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/crear-proveedor">Crear Proveedor</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/proveedores">Listado de los Proveedores</a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="/" onClick={this.borrarTodo}>Vaciar lista de Proveedores</a>
                        </li>
                    </ul>
                </div>
            </nav>
            </>
        )
    }
}

export default HeaderComponent