# Test TG (Angular)

### Requisitos
* Editor de texto (Visual Studio Code, Notepad++, o alguno con el que se sienta cómodo programando)
* Node para poder lanzar la aplicación

### Models
#### Customer
Entidad para guardar la información de cliente.

#### Product
Entidad para guardar la información de los productos puestos a la venta.

#### Sale
Entidad que guarda la información de las ventas, tanto del cliente que la ha realizado como de los productos vendidos.

**Los ejercicios se han de resolver completando los ficheros que sean necesarios del proyecto Angular**
**Se suministra un paquete para ayudar en la creación de los componentes, su uso no es obligatorio y se puede realizar los ejercicios como uno mejor lo estime oportuno**
**https://ng.ant.design/components/overview/en**
**Se valorará positivamente la limpieza del código**

### Ejercicio 1
Se nos ha pedido la creación de un listado de nuestros clientes, por lo que vamos a crear un listado en los que mostrar los datos que tenemos de ellos en nuestra base de datos. Estos datos son el identificador del cliente, el nombre y su dirección de Email. La estructura inicial se encuentra totalmente disponible (customer-list), faltaría completar con la obtención de los datos del servicios (customer.service.ts) y la maquetación del listado.

Como la persona que nos ha mandado a crear el listado le gustan los detalles, la inclusión de cualquier opción de QoL siempre será de agradecer. Ordenación del listado, filtrado, etc...

Como se muestran los datos en el listado es libre, se valorará que los datos sean fácilmente legibles.

### Ejercicio 2
Siguiendo la estructura del ejercicio anterior, queremos crear una tabla con los productos que vendemos.

Como al cliente le gusta el dinero, quiere que la tabla se encuentre ordenada por precio de producto descendente.

Se debe proporcionar una forma rápida al usuario para acceder a esta información desde el menú lateral

### Ejercicio 3
Hay que crear una vista de detalle de cliente, al que se accederá desde el listado creado en el primer ejercicio.

En esta vista de detalle, se verá la información del usuario (Diseño libre), y una tabla con las compras que ha realizado el mismo, mostrando: Nombre del producto, cantidad de producto comprado, precio total pagado, y luego un peso total de la compra.

En el caso de que no se hayan realizado compras, se mostrará una tabla vacía.
