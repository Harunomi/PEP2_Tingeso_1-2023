package com.tingeso.planillaservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrasaSolidoModel {
    private String proveedor;
    private float grasa;
    private float solido;
}
