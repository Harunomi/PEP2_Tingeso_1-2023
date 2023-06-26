import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeComponent from './components/HomeComponent';
import CrearProveedorComponent from './components/CrearProveedorComponent';
import HeaderComponent from './components/HeaderComponent';
import ListaProveedorComponent from './components/ListaProveedoresComponent';
import SubirArchivoAComponent from './components/SubirArchivoAComponent';
import ListaAcopioComponent from './components/ListaAcopioComponent';
import SubirArchivoGComponent from './components/SubirArchivoGComponent';
import ListaGrasaSolidoComponent from './components/ListaGrasaSolidoComponent';



function App() {
  return (
    <div>
      <HeaderComponent /> 
      <ToastContainer
        position='top-center' />
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route exact path="/crear-proveedor" component={CrearProveedorComponent}></Route>
            <Route exact path="/proveedores" component={ListaProveedorComponent}></Route>
            <Route exact path="/subir-archivo-acopio" component={SubirArchivoAComponent}></Route>
            <Route exact path="/ver-acopio" component={ListaAcopioComponent}></Route>
            <Route exact path="/subir-grasa-solido" component={SubirArchivoGComponent}></Route>
            <Route exact path="/ver-grasa-solido" component={ListaGrasaSolidoComponent}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
