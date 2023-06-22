package com.tingeso.planillaservice.repositories;

import com.tingeso.planillaservice.entities.PlanillaEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanillaRepository extends CrudRepository<PlanillaEntity,Long> {
}
