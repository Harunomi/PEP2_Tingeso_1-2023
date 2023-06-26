package com.tingeso.grasasolidoservice.controllers;

import com.tingeso.grasasolidoservice.entities.GrasaSolidoEntity;
import com.tingeso.grasasolidoservice.services.GrasaSolidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@RequestMapping("/grasasolido")
public class GrasaSolidoController {
    @Autowired
    GrasaSolidoService grasaSolidoService;

    @GetMapping
    public ResponseEntity<List<GrasaSolidoEntity>> obtenerGrasaSolido(){
        List<GrasaSolidoEntity> grasasolido = grasaSolidoService.obtenergrasaSolidos();
        if(grasasolido.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(grasasolido);
    }

    @PostMapping
    public void cargarG(@RequestParam("file")MultipartFile file, RedirectAttributes ms){
        grasaSolidoService.save(file);
        ms.addFlashAttribute("mensaje2","Archivo grasa solidos cargado correctamente");
    }

    @PostMapping("/borrarTodo")
    public void borrarTodo(){
        grasaSolidoService.borrarTodo();
    }

}
