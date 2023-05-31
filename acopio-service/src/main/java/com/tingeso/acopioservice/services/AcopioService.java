package com.tingeso.acopioservice.services;

import com.tingeso.acopioservice.entities.AcopioEntity;
import com.tingeso.acopioservice.repositories.AcopioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.processing.Generated;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Scanner;

@Service
public class AcopioService {
    @Autowired
    AcopioRepository acopioRepository;
    private AcopioEntity acopioEntity;
    private File archivo;

    public ArrayList<AcopioEntity> obtenerAcopio(){
        return (ArrayList<AcopioEntity>) acopioRepository.findAll();
    }

    public String save(MultipartFile file){
        if(!file.isEmpty()){
            try{
                // se copia el contenido y la direccion del archivo
                byte [] bytes= file.getBytes();
                Path path = Paths.get(file.getOriginalFilename());
                Files.write(path,bytes);
            }catch(IOException e){
                throw new RuntimeException(e);
            }
        }
        archivo = new File(file.getOriginalFilename());
        try{
            Scanner obj = new Scanner(archivo);
            while(obj.hasNextLine()){
                acopioEntity = new AcopioEntity(); // se crea un objeto de tipo acopio
                String[] partes = obj.nextLine().split(";"); // se separa por ;
                acopioEntity.setFecha(partes[0]);
                acopioEntity.setTurno(partes[1]);
                acopioEntity.setProveedor(partes[2]);
                acopioEntity.setKls(Float.parseFloat(partes[3]));
                acopioRepository.save(acopioEntity); // se guarda el objeto creado en la base de datos

            }
            obj.close();
        }catch (FileNotFoundException e){
            throw new RuntimeException(e);
        }
        return "Archivo guardado exitosamente";
    }

    public void borrarTodo(){
        acopioRepository.deleteAll();
    }

}
