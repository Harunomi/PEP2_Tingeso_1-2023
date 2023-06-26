import axios from 'axios'

const URL = "http://localhost:8080/planilla";
class PlanillaService{

    obtenerPlanilla(){
        return axios.get(URL);
    }

    subirPlanilla(file){
        return axios.post(URL,file);
    }

    borrarTodo(){
         return axios.post(URL + "/borrarTodo");
    }
}

export default new PlanillaService()