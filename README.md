# PEP2_Tingeso_1-2023
Microservicios
## TO DO:
  [] HU1: Ingreso de datos de los proveedores desde pantalla.
  [] HU2: Importar acopio de leche desde el archivo Excel.
  [] HU3: Importar valores de Grasa y Solidos Totales desde archivo Excel.
  [] HU4: Calcular planilla de pagos de leche y mostrar reporte por pantalla de la planilla.
  
## Requerimientos
### FrontEnd
  - Un unico frontend desarrollado usando ReactJS
### BackEnd
  - Cada microservicio es desarrollado usando Spring Boot usando una arquitectura de capas ( @RestController, @Service, @Repository y @Entity)
  - Cada historia de usuario es implementado en un unico microservicio
  - Cada microservicio debe tener su propia base de datos relacional (MySQL en este caso)
  - Usar patrones de microservicios _ConfigServer, Service Discovery (Eureka Server)_ y _API Gateway_.

### Despiegue de la aplicacion web en produccion
  - Tanto frontend como todos los microservicios del backend deben ser empaquetados en contenedores independienes y luego ser almacenados en _Docker Hub_.
  - El frontend y todos los microservicios deben ser desplegados hacia un cluster de _Kubernetes (minikube)_ desde las imagenes almacenadas en _Docker Hub_. Se deben usar scripts del tipo Deployment, Service, etc. El cluster de Kubernetes puede estar localmente o en la nube.
  - La aplicacion debe poder ser accedida desde un navegador web.

### Monitoreo
  - Se debe tener un dashboard que permita monitorear el estado de los microservicios usando _Spring Boot Actuator, Prometheus y Grafana._
