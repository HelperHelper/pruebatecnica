# Test TG (Angular)

#1.1. Validar los campos tanto en el front como en el back:
- Usuario (debe ser único), Email (debe ser único) Contraseña
(mínimo 6 caracteres).
- Usar migraciones para crear las tablas en la base de datos
2. El usuario podrá iniciar sesión y gestionar una lista de tareas: Crear,
Consultar, Modificar, Borrar, las tareas deben llevar los siguientes campos:
- Nombre
- Fecha de inicio
- Fecha fin
- Estado
3. Después de creada una tarea en cualquier momento se podrá cambiar su
estado:
- INICIADA
- EN PROCESO
- CANCELADA
- COMPLETADA
Si el estado es “COMPLETADA” se debe deshabilitar el cambio de estado.
4. El usuario podrá visualizar un reporte de la cantidad de tareas por cada
estado:
- TOTAL INICIADAS
- TOTAL EN PROCESO
- TOTAL CANCELADAS
- TOTAL COMPLETADAS

## funcionamiento
todo funcionando perfectamente el api se creo en laravel
el front se creo en angular, de entra en la app para ejecutarla con "npm start", una vez iniciada podrás ver un listado general de las tareas que se van agregando podrás listar por tipo de tareas seleccionando el estado de cada una o editar y borrarlas, antes de poder crear una tarea se debe registrar y posteriormente iniciar seccion en la app