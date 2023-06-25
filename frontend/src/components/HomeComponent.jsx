import React, { Component } from 'react'
class HomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div class="container-sm">
                <table class="table table-dark table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td><p>Cargar archivos de Acopio (en formato .csv)</p></td>
                            <td>
                                <a class="btn btn-primary" href="/subirArchivoA" role="button">Subir Archivo</a>
                                <a class="btn btn-danger" href="/vaciarAcopio" role="button">Vaciar base de datos</a>
                                <a class="btn btn-primary" href="/listaAcopio" role="button">Ver Acopio</a>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Cargar Archivo de Grasas y Solidos (en formato .csv)</p></td>
                            <td>
                                <a class="btn btn-primary" href="/subirArchivoG" role="button">Subir Archivo</a>
                                <a class="btn btn-danger" href="/vaciarGrasaSolido" role="button">Vaciar base de datos</a>
                                <a class="btn btn-primary" href="/listaGrasaSolido" role="button">Ver lista de Grasas y Solidos</a>
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