package com.tingeso.grasasolidoservice.repositories;

import com.tingeso.grasasolidoservice.entities.GrasaSolidoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrasaSolidoRepository extends CrudRepository<GrasaSolidoEntity,Long> {
}
