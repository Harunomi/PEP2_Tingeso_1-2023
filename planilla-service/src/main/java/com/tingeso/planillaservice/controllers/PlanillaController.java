package com.tingeso.planillaservice.controllers;

import com.tingeso.planillaservice.entities.PlanillaEntity;
import com.tingeso.planillaservice.services.PlanillaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/planilla")
public class PlanillaController {
    @Autowired
    PlanillaService planillaService;

    @GetMapping
    public ResponseEntity<ArrayList<PlanillaEntity>> listaPlanilla(){
        ArrayList<PlanillaEntity> planilla = planillaService.obtenerPlanilla();
        if (planilla.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(planilla);

    }
    @GetMapping("/calcular")
    public void calcularPlanilla(){
        planillaService.calcularQuincenas();
    }

    @PostMapping("/borrarTodo")
    public void borrarTodo(){
        planillaService.borrarTodo();
    }

}
