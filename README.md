# 501-pract-Vayavop
Práctica para módulo frontend JS de FullStack Web13 Keepcoding. Copia de wallapop


## Requisitos mínimos
- Listado de alumnos
  - Imagen
  - Nombre
  - Descripción (reducida)
  - Precio
  - Compra o venta
  - Estados de interfaz
    - Vacio
    - Error
    - Carga
  - Enviar a detallas de anuncios al hacer click
  - Si el usuario está loggeado aparecer botón de crear anuncio
- Detalle de anuncio
  - Los mismos detalles pero completo.
  - Si el producto es del dueño, y está loggeado debe mostrar botón que permita eliminar anuncio, con confirmación previa
- Creación de anuncio
  - Sólo si el usuario ha hecho login
    - Foto (opcional) --> Subir archivo
    - Nombre (obligatorio)
    - Descripción (obligatorio)
    - Precio (obligatorio)
    - Compra/Venta (obligatorio)
  - Enviará petición backend para la creación
    - Mostrar estados del anuncio
  - Si no estoy loggado me redirecciona al listado de productos (atrapar navegaciones url directamente a la paǵina de creación)
- Login
  - Formulario para Hacer el logeado
  - Gestión de un token JWT
- Registro
  - Formulario para registro
    - Debe tener campo para la contraseña y la confirmación de la contraseña

## Requisitos opcionales
- Gestionar la paginación (API entregará sólo 10 elementos)
- Implementar un buscador de anuncios
- Permitir editar un anuncio
  - Sólo si el usuario es el dueño y está loggeado
- Permitir el filtrado usando tags
  - tags estáticos
  - tags dinámicos

## API REST a utilizar en backend
