package com.tingeso.planillaservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcopioModel {
    private String fecha; // (AAA/MM/DD)
    private String turno;
    private String proveedor;
    private float kls;
}
