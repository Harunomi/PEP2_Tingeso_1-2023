package com.tingeso.proveedorservice.repositories;

import com.tingeso.proveedorservice.entities.ProveedorEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ProveedorRepository extends CrudRepository<ProveedorEntity,Long> {
}
