import axios from 'axios';

const URL = "http://localhost:8080/planilla";
class PlanillaService{

    obtenerPlanilla(){
        return axios.get(URL);
    }

    calcularPlanilla(){
        return axios.get(URL + "/calcular");
    }

    borrarTodo(){
        return axios.post(URL + "/borrarTodo");
    }
}

export default new PlanillaService()