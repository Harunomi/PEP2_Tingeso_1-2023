import axios from 'axios';

const PROVEEDOR_API_URL = "http://localhost:8080/proveedor";

class ProveedorService {
    
    obtenerProveedores(){
        return axios.get(PROVEEDOR_API_URL);
    }

    crearProveedor(proveedor){
        return axios.post(PROVEEDOR_API_URL,proveedor);
    }

    borrarTodo(){
        return axios.post(PROVEEDOR_API_URL + "/borrarTodo");
    }
}

export default new ProveedorService()