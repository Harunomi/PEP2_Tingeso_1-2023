import React, { Component } from 'react';
import GrasaSolidoService from '../services/GrasaSolidoService';


class ListaGrasaSolidoComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grasaSolido: []
        };
    }

    componentDidMount() {
        GrasaSolidoService.obtenerGrasaSolido().then((res) => {
            this.setState({ grasaSolido: res.data });
        });
    }
    render() {
        const { grasaSolido } = this.state;
        return (
            <div className='container-sm'>
                {grasaSolido.length === 0 ? (
                    <div className="alert alert-info">No hay lista de grasas y solidos disponible.</div>
                ) : (
                    <table className="table table-dark table-striped table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>Proveedor</th>
                                <th>Grasa</th>
                                <th>Solido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grasaSolido.map((grasaSolido) => (
                                <tr key={grasaSolido.id}>
                                    <td>{grasaSolido.proveedor}</td>
                                    <td>{grasaSolido.grasa}</td>
                                    <td>{grasaSolido.solido}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default ListaGrasaSolidoComponent;