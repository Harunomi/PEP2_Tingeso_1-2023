import React, { Component } from 'react'
import AcopioService from '../services/AcopioService';
import GrasaSolidoService from '../services/GrasaSolidoService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    vaciarAcopio(){
        AcopioService.borrarTodo();
        toast.success("Lista de acopio eliminada.");
    }

    vaciarGrasaSolido(){
        GrasaSolidoService.borrarTodo();
        toast.success("Lista de grasa y solidos eliminada.");
    }

    render() {
        return (
            <div class="container-sm">
                <table class="table table-dark table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td><p>Cargar archivos de Acopio (en formato .csv)</p></td>
                            <td>
                                <a class="btn btn-primary" href="/subir-archivo-acopio" role="button">Subir Archivo</a>
                                <a class="btn btn-danger" onClick={this.vaciarAcopio} role="button">Vaciar base de datos</a>
                                <a class="btn btn-primary" href="/ver-acopio" role="button">Ver Acopio</a>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Cargar Archivo de Grasas y Solidos (en formato .csv)</p></td>
                            <td>
                                <a class="btn btn-primary" href="/subir-grasa-solido" role="button">Subir Archivo</a>
                                <a class="btn btn-danger" onClick={this.vaciarGrasaSolido} role="button">Vaciar base de datos</a>
                                <a class="btn btn-primary" href="/ver-grasa-solido" role="button">Ver lista de Grasas y Solidos</a>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Calcular planilla de pagos de leche.</p></td>
                            <td>
                                <a class="btn btn-primary" href="/calcularPlanilla" role="button">Calcular planilla</a>
                                <a class="btn btn-danger" href="/vaciarPlanilla" role="button">Vaciar base de datos</a>
                                <a class="btn btn-primary" href="/listaPlanilla" role="button">Reporte de la planilla</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}

export default HomeComponent