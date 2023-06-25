import React, { Component } from 'react';
import ProveedorService from '../services/ProveedorService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CrearProveedorComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      codigo: '',
      nombre: '',
      categoria: '',
      retencion: ''
    };

    this.cambiarCodigoHandle = this.cambiarCodigoHandle.bind(this);
    this.cambiarNombreHandle = this.cambiarNombreHandle.bind(this);
    this.cambiarCategoriaHandle = this.cambiarCategoriaHandle.bind(this);
    this.cambiarRetencionHandle = this.cambiarRetencionHandle.bind(this);
    this.guardarProveedorHandle = this.guardarProveedorHandle.bind(this);
  }

  guardarProveedorHandle = (event) => {
    event.preventDefault();
    let proveedor = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      categoria: this.state.categoria,
      retencion: this.state.retencion
    };
    ProveedorService.crearProveedor(proveedor).then((res) => {
      toast.success("Proveedor creado correctamente");  // Mostrar notificación de éxito
      this.props.history.push("/Home");  // Redirigir al componente HomeComponent
    });
  };

  cambiarCodigoHandle = (event) => {
    this.setState({ codigo: event.target.value });
  };

  cambiarNombreHandle = (event) => {
    this.setState({ nombre: event.target.value });
  };

  cambiarCategoriaHandle = (event) => {
    this.setState({ categoria: event.target.value });
  };

  cambiarRetencionHandle = (event) => {
    this.setState({ retencion: event.target.value });
  };

  render() {
    const { codigo, nombre, categoria, retencion } = this.state;
    const isDisabled = codigo === '' || nombre === '' || categoria === '' || retencion === '';

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <h1>Crear Proveedor</h1>
          </div>
          <div className="col-12">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Codigo</label>
                  <input
                    name="codigo"
                    className="form-control"
                    value={this.state.codigo}
                    onChange={this.cambiarCodigoHandle}
                    placeholder="Codigo"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Nombre</label>
                  <input
                    name="nombre"
                    value={this.state.nombre}
                    onChange={this.cambiarNombreHandle}
                    className="form-control"
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Categoria</label>
                  <select
                    className="form-select"
                    aria-label="Categoria"
                    name="categoria"
                    value={this.state.categoria}
                    onChange={this.cambiarCategoriaHandle}
                    required
                  >
                    <option value="">Haga click aqui para seleccionar una opcion</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Retencion</label>
                  <select
                    className="form-select"
                    aria-label="Retencion"
                    name="retencion"
                    value={this.state.retencion}
                    onChange={this.cambiarRetencionHandle}
                    required
                  >
                    <option value="">Haga click aqui para seleccionar una opcion</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" onClick={this.guardarProveedorHandle} disabled={isDisabled}>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CrearProveedorComponent;