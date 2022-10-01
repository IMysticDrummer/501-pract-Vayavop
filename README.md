# 501-pract-Vayavop
Práctica para módulo frontend JS de FullStack Web13 Keepcoding. Copia de wallapop

## Prerrequisitos
### Sparrest
Para poder probar esta aplicación dinámica frontend, lo primero se debe instalar
el simulador de backend [Sparrest](https://github.com/kasappeal/sparrest.js).  
Instalar **según las instrucciones indicadas en el repositiorio**, salvo que **no se debe crear el archivo db.json**.  
Asegurar instalar sparrest en algún directorio diferente de dónde vayamos a instalar VayaPop.  

## Instalar VayaPop
Clonar el repositorio de [VayaPop](https://github.com/IMysticDrummer/501-pract-Vayavop).  
No hace falta ninguna dependencia.

## Instalación de la *base de datos* de prueba
Copiar el archivo db.json, incluido en la instalación de VayaPop, en el directorio donde hayamos instalado Sparrest.  
**Sólo en este momento se puede lanzar Sparrest** desde node.js, según las instrucciones.

## Lanzar VayaPop
Simplemente desde cualquier servidor, o utilizando "Live Server" desde node.js, se puede acceder a la página principal de la aplicación.

# Características de Vayapop
## Página principal
En la página principal tendremos un listado con vista reducida de los anuncios.  
Si pinchamos en los anuncios, nos llevará a una página de detalle, en la que muestra todo el anuncio completo.  
Desde la página principal tenemos una pequeña navegación que nos permitirá:
- Ir a la página de registro (signup)
- Ir a la página de login (login)
- *Si el usuario está loggeado*, permitirá crear un anuncio.

## Página de detalle del anuncio
Mostrará un sólo anuncio, con todos los detalles del mismo.

## Página de registro / login
*Notas de desarrollo*.  
Realmente se trata de la misma página de desarrollo, tratada dinámicamente.
Según el parámetro de url que se envíe (sign o log), la página convertirá los textos y el comportamiento para hacer una cosa o la otra.

## Registro
Se pide un identificador y una password para realizar el registro en VayaPop.
Cuando se cree el usuario, automáticamente lo loggea y lo desvía a la página principal.
### Requisitos
- Ambos campos deben tener datos
- La password debe tener al menos 6 caracteres
  - Con los dos requisitos anteriores cumplidos, se activa el botón de registro.
- La password y el username no pueden ser el mismo
- La password sólo puede tener letras (mayúsculas y minúsculas) y números.

## Login
- El botón de login se activará cuando se cumplan los dos primeros requisitos de la parte de registro.
- Logeará al ususario y le desviará a la página principal.

## Requisitos mínimos
- Listado de anuncios
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

- Detalle de anuncio
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
