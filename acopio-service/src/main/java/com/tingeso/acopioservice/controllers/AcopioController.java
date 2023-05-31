package com.tingeso.acopioservice.controllers;

import com.tingeso.acopioservice.entities.AcopioEntity;
import com.tingeso.acopioservice.services.AcopioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@RestController
@RequestMapping("/acopio")
public class AcopioController {
    @Autowired
    AcopioService acopioService;

    @GetMapping
    public ResponseEntity<List<AcopioEntity>> obtenerAcopio(){
        List<AcopioEntity> acopio = acopioService.obtenerAcopio();
        if (acopio.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(acopio);
    }

    @PostMapping
    public void cargarA(@RequestParam("acopio")MultipartFile file, RedirectAttributes ms){
        acopioService.save(file);
        ms.addFlashAttribute("mensaje1","Acopio cargado correctamente");
    }

    @PostMapping("/borrarTodo")
    public void borrarTodo(){
        acopioService.borrarTodo();
    }
}
