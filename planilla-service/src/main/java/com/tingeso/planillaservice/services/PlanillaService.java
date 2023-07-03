package com.tingeso.planillaservice.services;

import com.tingeso.planillaservice.entities.PlanillaEntity;
import com.tingeso.planillaservice.models.AcopioModel;
import com.tingeso.planillaservice.models.GrasaSolidoModel;
import com.tingeso.planillaservice.models.ProveedorModel;
import com.tingeso.planillaservice.repositories.PlanillaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class   PlanillaService {
    @Autowired
    private PlanillaRepository planillaRepository;

    @Autowired
    RestTemplate restTemplate;

    public List<AcopioModel> obtenerAcopio() {
        ResponseEntity<List<AcopioModel>> response = restTemplate.exchange(
                "http://acopio-service/acopio",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<AcopioModel>>() {}
        );
        List<AcopioModel> retorno = response.getBody();
        return retorno;
    }

    public List<GrasaSolidoModel> obtenerGrasaSolido() {
        ResponseEntity<List<GrasaSolidoModel>> response = restTemplate.exchange(
                "http://grasasolido-service/grasasolido",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<GrasaSolidoModel>>() {}
        );
        List<GrasaSolidoModel> retorno = response.getBody();
        return retorno;
    }

    public List<ProveedorModel> obtenerProveedores() {
        ResponseEntity<List<ProveedorModel>> response = restTemplate.exchange(
                "http://proveedor-service/proveedor",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<ProveedorModel>>() {}
        );
        List<ProveedorModel> retorno = response.getBody();
        return retorno;
    }

    public ArrayList<PlanillaEntity> obtenerPlanilla(){
        return (ArrayList<PlanillaEntity>) planillaRepository.findAll();
    }

    public void borrarTodo(){
        planillaRepository.deleteAll();
    }
    public int getDia(AcopioModel acopio){
        String[] partes = acopio.getFecha().split("/");
        return Integer.parseInt(partes[2]);
    }
    public int totalDiasQuincena(ArrayList<AcopioModel>acopio){
        try{
            int diaInicial = getDia(acopio.get(0));
            int diaActual;
            int totalDiasQuincena = 0;
            if (diaInicial <=15){
                diaActual = diaInicial;
                while (diaActual <=15 && totalDiasQuincena != acopio.size()){
                    diaActual = getDia(acopio.get(totalDiasQuincena));
                    totalDiasQuincena++;
                }
            }else{
                diaActual = diaInicial;
                while (diaActual <=31 && diaActual > 15 && totalDiasQuincena != acopio.size()){
                    diaActual = getDia(acopio.get(totalDiasQuincena));
                    totalDiasQuincena++;
                }
            }
            return totalDiasQuincena;
        }catch (IndexOutOfBoundsException e){
            return 0;
        }

    }

    public ArrayList<AcopioModel> acopioPorQuincena(ArrayList<AcopioModel> entrada,int ultimoIndice){
        ArrayList<AcopioModel> salida = new ArrayList<>();
        for (int i = 0; i < ultimoIndice; i++) {
            salida.add(entrada.get(i));
        }
        return salida;
    }

    public void calcularQuincenas(){
        ArrayList<AcopioModel> acopio = new ArrayList<>(this.obtenerAcopio());
        ArrayList<GrasaSolidoModel> grasaSolido = new ArrayList<>(this.obtenerGrasaSolido());
        ArrayList<ProveedorModel> proveedores = new ArrayList<>(this.obtenerProveedores());
        ArrayList<AcopioModel> quincenaActual;
        ArrayList<PlanillaEntity> planillas = (ArrayList<PlanillaEntity>) planillaRepository.findAll();
        while(!(acopio.isEmpty())){
            /*
            la logica del programa corresponde a: en primer lugar revisamos el indice del ultimo
            elemento correspondiente a la primera quincena a calcular
            luego creamos un ArrayList correspondiente al primer periodo de la quincena
            recorremos a los proveedores de manera de ir calculando los datos correspondiente a dicha quincena
            una vez creada cada plantilla de proveedores, se actualiza la lista de acopio eliminando la quincena
            ya calculada
             */
            int ultimoIndice = totalDiasQuincena(acopio);
            quincenaActual = acopioPorQuincena(acopio,ultimoIndice);
            for (int i = 0; i < proveedores.size(); i++) {
                PlanillaEntity planillaActual = new PlanillaEntity();
                planillaActual.setQuincena(setQuincenaString(quincenaActual.get(0).getFecha()));
                planillaActual.setCodigo(proveedores.get(i).getCodigo());
                planillaActual.setNombre(proveedores.get(i).getNombre());
                planillaActual.setTotalDias(totalDiasLeche(proveedores.get(i).getCodigo(),quincenaActual));
                float KLSactual = totalKLS(proveedores.get(i).getCodigo(),quincenaActual,ultimoIndice);
                planillaActual.setTotalKLS(KLSactual);
                planillaActual.setPromedioDiarioKLS(promedioDiarioKLS(KLSactual,planillaActual.getTotalDias()));
                float grasaActual = obtenerGrasa(grasaSolido,proveedores.get(i).getCodigo());
                float solidoActual = obtenerST(grasaSolido,proveedores.get(i).getCodigo());
                planillaActual.setPorcentajeGrasa(grasaActual);
                planillaActual.setPorcentajeSolidos(solidoActual);
                planillaActual.setPagoGrasa(pagoGrasa(grasaActual,KLSactual));
                planillaActual.setPagoSolidos(pagoST(solidoActual,KLSactual));
                planillaActual.setPagoLeche(pagoPorCategoria(KLSactual,proveedores.get(i).getCategoria()));
                planillaActual.setBonificacionFrecuencia(bonificacionFrecuencia(acopio,proveedores.get(i).getCodigo(),planillaActual.getPagoLeche()));
                planillaActual.setPagoAcopioLeche(planillaActual.getPagoLeche() +
                        planillaActual.getPagoGrasa() +
                        planillaActual.getPagoSolidos() +
                        planillaActual.getBonificacionFrecuencia());
                planillaActual = descuentoVariaciones(planillaActual,planillas);
                planillaActual.setPagoTotal(planillaActual.getPagoAcopioLeche() -
                        planillaActual.getDctoVariacionLeche() -
                        planillaActual.getDctoVariacionGrasa() -
                        planillaActual.getDctoVariacionST());
                planillaActual.setMontoRetencion(calcularMontoRetencion(planillaActual.getPagoTotal(),proveedores.get(i).getRetencion()));
                planillaActual.setMontoFinal(planillaActual.getPagoTotal() - planillaActual.getMontoRetencion());
                planillas.add(planillaActual);
                //System.out.println(planillaActual);
                planillaRepository.save(planillaActual);
                // se repite el proceso para cada proveedor en la misma quincena

            }
            // una vez terminada la quincena, se busca eliminar la actual de la lista de quincenas y repetir el proceso para la siguiente
            // hasta que la lista de acopio sea vacia
            acopio = borrarQuincena(acopio,ultimoIndice);

        }

    }
    public float promedioDiarioKLS(float klsActual,float totalDias){
        if (totalDias == 0){
            return 0;
        }else{
            return klsActual/totalDias;
        }
    }

    public String setQuincenaString(String fecha){
        String[] partes = fecha.split("/");
        if (Integer.parseInt(partes[2]) < 16){
            return partes[0] + "/" + partes[1] + "/" + "1";
        }else{
            return partes[0] + "/" + partes[1] + "/" + "2";
        }

    }

    public float totalKLS(String codigo, ArrayList<AcopioModel> acopio,int ultimoIndice){
        float totalKLS = 0;
        for (int i = 0; i < ultimoIndice; i++) {
            if (acopio.get(i).getProveedor().equals(codigo)){
                totalKLS = totalKLS + acopio.get(i).getKls();
            }
        }
        return totalKLS;
    }

    public float pagoPorCategoria(float kls,String categoria){
        if (categoria.equals("A")){
            return kls * 700;
        } else if (categoria.equals("B")) {
            return kls * 550;
        } else if (categoria.equals("C")) {
            return kls * 400;
        }else if (categoria.equals("D")){
            return kls * 250;
        }else{
            return 0;
        }
    }

    public int totalDiasLeche(String codigo,ArrayList<AcopioModel> acopio){
        int total = 0;
        for (int i = 0; i < acopio.size(); i++) {
            if (acopio.get(i).getProveedor().equals(codigo)){
                total++;
            }
        }
        return total;
    }

    public float obtenerGrasa(ArrayList<GrasaSolidoModel> grasaSolido,String codigo){
        float salida = 0;
        for (int i = 0; i < grasaSolido.size(); i++) {
            if (grasaSolido.get(i).getProveedor().equals(codigo)){
                salida = grasaSolido.get(i).getGrasa();
            }
        }
        return salida;
    }

    public float obtenerST(ArrayList<GrasaSolidoModel> grasaSolido,String codigo){
        float salida = 0;
        for (int i = 0; i < grasaSolido.size(); i++) {
            if (grasaSolido.get(i).getProveedor().equals(codigo)){
                salida = grasaSolido.get(i).getSolido();
            }
        }
        return salida;
    }

    public float pagoGrasa(float grasa,float KLS){
        if (grasa >= 0 && grasa < 21){
            return 30 * KLS;
        } else if (grasa >= 21 && grasa < 46) {
            return 80 * KLS;
        } else if (grasa >=46 && grasa < 101){
            return 120 * KLS;
        }else{
            return 0;
        }
    }

    public float pagoST(float solidosT, float KLS){
        if(solidosT>=0 && solidosT <8){
            return KLS * -130;
        } else if (solidosT >= 8 && solidosT < 19) {
            return KLS * -90;
        } else if (solidosT >= 19 && solidosT < 36) {
            return KLS * 90;
        } else if (solidosT >= 36 && solidosT < 101) {
            return KLS * 150;
        }else{
            return 0;
        }
    }

    public double bonificacionFrecuencia(ArrayList<AcopioModel>acopio,String codigo,float pagoKLS){
        int tarde = 0;
        int manyana = 0;
        for (int i = 0; i < acopio.size(); i++) {
            if (acopio.get(i).getProveedor().equals(codigo)){
                if (acopio.get(i).getTurno().equals("M")){
                    manyana++;
                }
                if (acopio.get(i).getTurno().equals("T")){
                    tarde++;
                }
            }
        }
        if ((tarde+manyana)>=10 && tarde>0 && manyana>0){ // tarde y manyana
            return (pagoKLS*0.20);
        }else if ((tarde+manyana)>=10 && tarde == 0){ // solo manyana
            return (pagoKLS*0.12);
        } else if ((tarde+manyana)>=10 && manyana == 0) { // solo tarde
            return (pagoKLS*0.08);
        }else{
            return 0;
        }
    }

    public double descuentoVariacionKLS(float variacion, double pagoTotal){
        if (variacion < 0) {// caso en donde la variacion sea negativa
            float aux = variacion*-1; // auxiliar para ver los rangos de las variaciones
            if (aux >= 0 && aux < 9){
                return 0;
            } else if (aux >= 9 && aux < 26) {
                return 0.07 * pagoTotal;
            } else if (aux >= 26 && aux < 46) {
                return 0.15 * pagoTotal;
            } else {
                return 0.3 * pagoTotal;
            }
        }
        // en caso de no haber una variacion negativa, entonces retornamos 0
        return 0;
    }

    public double descuentoVariacionGrasa(float variacion,double pagoTotal){
        if (variacion < 0){
            float aux = variacion*-1;
            if(aux >= 0 && aux < 16){
                return 0;
            } else if (aux >=16 && aux < 26) {
                return 0.12 * pagoTotal;
            } else if (aux >= 26 && aux < 41) {
                return 0.2 * pagoTotal;
            }else{
                return 0.3 * pagoTotal;
            }
        }
        return 0;
    }

    public double descuentoVariacionST(float variacion, double pagoTotal){
        if (variacion < 0){
            float aux = variacion*-1;
            if(aux >= 0 && aux < 7){
                return 0;
            } else if (aux >=7 && aux < 13) {
                return 0.18 * pagoTotal;
            } else if (aux >= 13 && aux < 36) {
                return 0.27 * pagoTotal;
            }else{
                return 0.45 * pagoTotal;
            }
        }
        return 0;
    }

    public PlanillaEntity descuentoVariaciones(PlanillaEntity planillaActual, ArrayList<PlanillaEntity> planillas){
        PlanillaEntity planillaAnterior = new PlanillaEntity();
        int aux = 0;
        for (int i = planillas.size(); i > 0 ; i = i - 1) {
            // recorro la plantilla desde el final hasta el comienzo en busca del a primera aparicion del proveedor en la plantilla
            if (planillas.get(i-1).getCodigo().equals(planillaActual.getCodigo())){
                planillaAnterior = planillas.get(i-1);
                aux = 1; // bandera que indica que encontramos una planilla en la lista de planillas
                break;
            }
        }
        if (aux == 1) { // caso donde exista una plantilla anterior para poder comparar las v ariaciones de los porcentajes de leche, grasa y solidos totales.
            planillaActual.setVariacionLeche((planillaActual.getTotalKLS() - planillaAnterior.getTotalKLS()) / planillaAnterior.getTotalKLS() * 100);
            planillaActual.setVariacionGrasa((planillaActual.getPorcentajeGrasa() - planillaAnterior.getPorcentajeGrasa()) / planillaAnterior.getPorcentajeGrasa() * 100);
            planillaActual.setVariacionSolidos((planillaActual.getPorcentajeSolidos() - planillaAnterior.getPorcentajeSolidos()) / planillaAnterior.getPorcentajeSolidos() * 100);
            planillaActual.setDctoVariacionLeche(descuentoVariacionKLS(planillaActual.getVariacionLeche(),planillaActual.getPagoAcopioLeche()));
            planillaActual.setDctoVariacionGrasa(descuentoVariacionGrasa(planillaActual.getVariacionGrasa(),planillaActual.getPagoAcopioLeche()));
            planillaActual.setDctoVariacionST(descuentoVariacionST(planillaActual.getVariacionSolidos(),planillaActual.getPagoAcopioLeche()));
        }else{ // caso en donde no exista na una plantilla anterior para comparar, entonces se definen todas las variaciones como 0 ( puesto qiue no existen otra para comparar)
            planillaActual.setVariacionLeche(0);
            planillaActual.setVariacionGrasa(0);
            planillaActual.setVariacionSolidos(0);
            planillaActual.setDctoVariacionLeche(0);
            planillaActual.setDctoVariacionGrasa(0);
            planillaActual.setDctoVariacionST(0);
        }
        return planillaActual;

    }

    public double calcularMontoRetencion(double pagoTotal, String retencion){
        if ((pagoTotal > 950000) && retencion.equals("Si")){
            return pagoTotal * 0.13;
        }else{
            return 0;
        }
    }

    public ArrayList<AcopioModel> borrarQuincena(ArrayList<AcopioModel> acopio, int inicio){
        ArrayList<AcopioModel> salida = new ArrayList<>();
        for (int i = inicio+1; i < acopio.size() ; i++) {
            salida.add(acopio.get(i));
        }
        return salida;
    }

}
