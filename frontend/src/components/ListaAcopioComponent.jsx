import React, { Component } from 'react'
import AcopioService from '../services/AcopioService';
class ListaAcopioComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            acopio: []
        };
    }

    componentDidMount() {
        AcopioService.obtenerAcopio().then((res) => {
            this.setState({ acopio: res.data });
        });
    }
    render() {
        const { acopio } = this.state;

        return (
            <div className="container-sm">
                {acopio.length === 0 ? (
                    <div className="alert alert-info">No hay una lista de acopio disponible.</div>
                ) : (
                    <table className="table table-dark table-striped table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>Fecha</th>
                                <th>Turno</th>
                                <th>Proveedor</th>
                                <th>KLS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {acopio.map((acopio) => (
                                <tr key={acopio.id}>
                                    <td>{acopio.fecha}</td>
                                    <td>{acopio.turno}</td>
                                    <td>{acopio.proveedor}</td>
                                    <td>{acopio.kls}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
export default ListaAcopioComponent