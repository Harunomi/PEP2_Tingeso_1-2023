import React, { Component } from 'react';
import ProveedorService from '../services/ProveedorService';

class ListaProveedoresComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      proveedores: []
    };
  }

  componentDidMount() {
    ProveedorService.obtenerProveedores().then((res) => {
      this.setState({ proveedores: res.data });
    });
  }

  render() {
    const { proveedores } = this.state;

    return (
      <div className="container-sm">
        {proveedores.length === 0 ? (
          <div className="alert alert-info">No hay proveedores disponibles.</div>
        ) : (
          <table className="table table-dark table-striped table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Retencion</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor) => (
                <tr key={proveedor.id}>
                  <td>{proveedor.codigo}</td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.categoria}</td>
                  <td>{proveedor.retencion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ListaProveedoresComponent;
