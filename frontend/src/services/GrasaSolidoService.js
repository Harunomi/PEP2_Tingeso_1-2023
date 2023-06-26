import axios from 'axios';

const URL = "http://localhost:8080/grasasolido";

class GrasaSolidoService{
    obtenerGrasaSolido(){
        return axios.get(URL);
    }

    subirGrasaSolido(file){
        return axios.post(URL,file);
    }

    borrarTodo(){
        return axios.post(URL+ "/borrarTodo");
    }
}

export default new GrasaSolidoService()