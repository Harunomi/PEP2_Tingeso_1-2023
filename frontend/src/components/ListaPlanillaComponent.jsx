import React, { Component } from 'react';
import PlanillaService from '../services/PlanillaService'

class ListaPlanillaComponent extends Component {
    constructor(props){
        super(props);

        this.state = {
            planilla:[]
        };

    }

    componentDidMount(){
        PlanillaService.obtenerPlanilla().then((res) =>{
            this.setState({planilla: res.data});
        });
    }

    render(){
        const { planilla } = this.state;
        return (
            <div className='container-sm'>
                {planilla.length === 0 ? (
                    <div className="alert alert-info">No hay planilla disponible.</div>
                ) : (
                    <table className="table table-dark table-striped table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>Quincena</th>
                                <td>{planilla.quincena}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Codigo Proveedor</th>
                                <td>{planilla.proveedor}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}
export default ListaPlanillaComponent