import axios from "axios";

const URL = "http://localhost:8080/acopio";

class AcopioService{
    obtenerAcopio(){
        return axios.get(URL);
    }

    subirArchivo(file){
        return axios.post(URL,file);
    }

    borrarTodo(){
        return axios.post(URL + "/borrarTodo")
    }
}

export default new AcopioService()