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



function App() {
  return (
    <div>
      <HeaderComponent /> 
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeComponent}></Route>
            <Route exact path="/crear-proveedor" component={CrearProveedorComponent}></Route>
            <Route exact path="/proveedores" component={ListaProveedorComponent}></Route>
            <Route exact path="/subirArchivoA" component={SubirArchivoAComponent}></Route>
          </Switch>
        </div>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
