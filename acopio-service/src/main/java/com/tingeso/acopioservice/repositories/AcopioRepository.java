package com.tingeso.acopioservice.repositories;

import com.tingeso.acopioservice.entities.AcopioEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcopioRepository extends CrudRepository<AcopioEntity,Long> {
}
