# **PORTAL DE NECESIDADES**
## Segundo proyecto de BOOTCAMP HACKABOSS

### **DESCRIPCIÓN**
Implementar  una API  que permita  ges tionar una web donde  pers onas  que neces iten alg ún 
s ervicio digital puedan  pedir ayuda a otros  us uarios  (es tilo Fiverr). Por  ejemplo:  traducir  un 
texto, editar una foto, revisar un documento, etc... Solo necesidades que puedan realizarse 
mediante  un fichero  digital. 
 
 
 
### **USUARIO ANÓNIMO:**

- Ver lis ta de s ervicios  requeridos  

- Login (Email y Pas s word) 

- Registro (Nombre, Email, Biografía, Foto, ...) 
 
### **USUARIOS REGISTRADOS:** 

-  Crear un nuevo  servicio requerido 

   - Título 

   - Explicación 

   - Fichero

- Es coger un servicio requerido  por  otro  usuario y poder:  
    - Hacer comentarios  
    - Subir  un fichero  con el trabajo  requerido  realizado
  
- Marcar  un servicio requerido  como  ya resuelto

- Opcional 
    - Gestión del perfil de usuario (Nombre, Email, Biografía, Foto, ...) 

### PARA INICAR EL PROYECTO

- 1º: Copia el repositorio
```
git clone https://github.com/EvegeniyNekrasov/portal_de_necesidades.git
```
- 2º: En la consola escribe: npm install (para instalar todas las librerias necesarias)
- Para probar el uploadImg endpoint escribe http://localhost:3000/ en tu navegador y sube la imagen
- Para el headers, debemos introducir en el campo Authorization, el token suministrado.
- Los campos en postman que llevan los '*' son obligatorios para rellenar.
- En todos los post incluimos los datos en el body "x-www-form-urlencoded".

- 3º: Comenzamos a usar la API:
    - Comprobamos con Service List, si hay algun servicio creado.
    - Nos registramos con Register.
    - Hacemos login, para obtener el token, nos lo muestra en la respuesta del postman, que debemos copiar para usarlo mas adelante.
    - Hacemos uso del endpoint uploadImg, para añadir la imagen al usuario ya creado.
    - Para crear un nuevo servicio, usamos service add, entrar en headers e introducir el token. En el Body, introduciremos los datos que nos solicita.
    - Para añadir un comentario y un archivo, usamos Add Comment, tenemos que introducir en el heathers el token y usamos el enpoint uploadImg para añadir el archivo o imagen.
    - Para añadir una nueva tarea, usamos New task, introducimos el id del servicio en la url, y el username en el body, tambien el token en header.
    - Para marcar como completado, usamos Mark as Complete. Haciendo Post con el ID de servicio requerido, en el url.