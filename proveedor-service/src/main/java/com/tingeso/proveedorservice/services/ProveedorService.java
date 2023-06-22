package com.tingeso.proveedorservice.services;

import com.tingeso.proveedorservice.entities.ProveedorEntity;
import com.tingeso.proveedorservice.repositories.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class ProveedorService {
    @Autowired
    ProveedorRepository proveedorRepository;

    public ArrayList<ProveedorEntity> obtenerProveedores(){
        return (ArrayList<ProveedorEntity>) proveedorRepository.findAll();
    }

    public void guardarProveedor(ProveedorEntity proveedor){
        proveedorRepository.save(proveedor);
    }

    public void borrarTodo(){
        proveedorRepository.deleteAll();
    }
}
