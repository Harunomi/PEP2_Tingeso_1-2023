import React, { Component } from 'react';
import PlanillaService from '../services/PlanillaService'

class ListaPlanillaComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planilla: []
        };

    }

    componentDidMount() {
        PlanillaService.obtenerPlanilla().then((res) => {
            this.setState({ planilla: res.data });
        });
    }

    render() {
        const { planilla } = this.state;
        return (
            <div className='container' style={{ textAlign: 'left' }}>
                <div className='container-sm'>
                    {planilla.length === 0 ? (
                        <div className="alert alert-info">No hay planilla disponible.</div>
                    ) : (
                        <table class="table table-dark table-striped table-bordered">
                            <thead class="thead-light">
                                <tr>
                                    <th>Quincena</th>
                                    <th>Codigo proveedor</th>
                                    <th>Nombre proveedor</th>
                                    <th>Total KLS leche</th>
                                    <th>Dias que envio leche</th>
                                    <th>Promedio diario KLS leche</th>
                                    <th>%Variacion leche</th>
                                    <th>%Grasa</th>
                                    <th>%Variacion grasa</th>
                                    <th>%Solidos Totales</th>
                                    <th>%VariacionST</th>
                                    <th>Pago por leche</th>
                                    <th>Pago por Grasa</th>
                                    <th>Pago por Solidos Totales</th>
                                    <th>Bonificacion por Frecuencia</th>
                                    <th>Dcto. Variacion Leche</th>
                                    <th>Dcto. Variacion Grasa</th>
                                    <th>Dcto. Variacion ST</th>
                                    <th>Pago TOTAL</th>
                                    <th>Pago Acopio Leche</th>
                                    <th>Monto Retencion</th>
                                    <th>Monto Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {planilla.map((planilla) => (
                                    <tr key={planilla.id}>
                                        <td>{planilla.quincena}</td>
                                        <td>{planilla.codigo}</td>
                                        <td>{planilla.nombre}</td>
                                        <td>{planilla.totalKLS}</td>
                                        <td>{planilla.totalDias}</td>
                                        <td>{planilla.promedioDiarioKLS}</td>
                                        <td>{planilla.variacionLeche}</td>
                                        <td>{planilla.porcentajeGrasa}</td>
                                        <td>{planilla.variacionGrasa}</td>
                                        <td>{planilla.porcentajeSolidos}</td>
                                        <td>{planilla.variacionSolidos}</td>
                                        <td>{planilla.pagoLeche}</td>
                                        <td>{planilla.pagoGrasa}</td>
                                        <td>{planilla.pagoSolidos}</td>
                                        <td>{planilla.bonificacionFrecuencia}</td>
                                        <td>{planilla.dctoVariacionLeche}</td>
                                        <td>{planilla.dctoVariacionGrasa}</td>
                                        <td>{planilla.dctoVariacionST}</td>
                                        <td>{planilla.pagoTotal}</td>
                                        <td>{planilla.pagoAcopioLeche}</td>
                                        <td>{planilla.montoRetencion}</td>
                                        <td>{planilla.montoFinal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}
export default ListaPlanillaComponent