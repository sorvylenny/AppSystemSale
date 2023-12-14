# SystemSales

SystemSales es una aplicación de gestión de ventas desarrollada con Angular, .NET y Angular Material. La aplicación incluye un sistema de autenticación, módulo de ventas, historial de ventas, generación de informes, registro de usuarios, registro de productos y visualización de ventas de las últimas semanas. Estas características están diseñadas para ser accesibles solo para los usuarios administradores.

## Funcionalidades Principales

SystemSales es una aplicación web que ofrece las siguientes funcionalidades:

### 1. Autenticación de Usuarios

- **Login**: Los usuarios pueden iniciar sesión proporcionando su correo electrónico y contraseña para el usuario admin email:prueba@example.com, clave:1234, supervisor email:prueba1@example.com, empleado email:prueba2@example.com, clave:abc123.

### 2. Módulo de Venta

- **Registro de Venta**: Permite a los usuarios registrar ventas, incluyendo detalles como los productos vendidos, la cantidad y el tipo de pago.

### 3. Historial de Ventas

- **Consulta de Historial de Ventas**: Los usuarios pueden acceder al historial de ventas utilizando el número de factura o seleccionando un rango de fechas.

### 4. Generación de Reportes

- **Generación de Reportes**: Los usuarios pueden generar informes basados en las fechas seleccionadas.

### 5. Registro de Usuarios

- **Registro de Usuarios**: Permite registrar nuevos usuarios y realizar operaciones de edición o eliminación de usuarios existentes.

### 6. Registro de Productos

- **Registro de Productos**: Los usuarios pueden registrar nuevos productos, así como editar o eliminar productos existentes.

### 7. Visualización de Ventas de las Últimas Semanas

- **Visualización de Ventas Recientes**: Esta funcionalidad solo está disponible para los usuarios con el rol de administrador. Permite visualizar las ventas de las últimas semanas.

SystemSales ofrece múltiples roles de usuario, incluyendo supervisores y empleados, con diferentes niveles de acceso y permisos. La autenticación garantiza que cada usuario solo tenga acceso a las funcionalidades permitidas por su rol.

## Tecnologías Utilizadas

- Angular: 16.2.0
- .NET: .NET 7.0 
- Angular Material: 16.2.10

## Dependencias 

Este proyecto utiliza las siguientes dependencias:

- [Angular: Plataforma para construir aplicaciones web escalables y dinámicas.](https://angular.io/)
  - [@angular/animations](https://angular.io/api/animations) (^16.2.0)
  - [@angular/common](https://angular.io/api/common) (^16.2.0)
  - [@angular/compiler](https://angular.io/api/compiler) (^16.2.0)
  - [@angular/core](https://angular.io/api/core) (^16.2.0)
  - [@angular/forms](https://angular.io/api/forms) (^16.2.0)
  - [@angular/platform-browser](https://angular.io/api/platform-browser) (^16.2.0)
  - [@angular/platform-browser-dynamic](https://angular.io/api/platform-browser-dynamic) (^16.2.0)
  - [@angular/router](https://angular.io/api/router) (^16.2.0)
- [Bootstrap: Marco de diseño para páginas web.](https://getbootstrap.com/)
  - [bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) (^5.3.2)
- [ng-image-slider: Componente de Angular para crear sliders de imágenes.](https://www.npmjs.com/package/ng-image-slider)
  - [ng-image-slider](https://www.npmjs.com/package/ng-image-slider) (^7.0.1)
- [RxJS: Biblioteca para programación reactiva.](https://rxjs.dev/)
  - [rxjs](https://rxjs.dev/) (~7.8.0)
- [TypeScript: Superset de JavaScript que agrega tipos estáticos al lenguaje.](https://www.typescriptlang.org/)
  - [typescript](https://www.typescriptlang.org/) (~5.1.3)
  
## Otras Dependencias

- [tslib](https://www.npmjs.com/package/tslib) (^2.3.0)
- [zone.js](https://github.com/angular/zone.js) (~0.13.0)
- [xlsx] (https://sheetjs.gitbooks.io/docs/)/(https://github.com/SheetJS/js-xlsx) (^0.18.5)
- [sweetalert2] (https://sweetalert2.github.io/)/(https://github.com/sweetalert2/sweetalert2) (^11.6.16)

## Cómo Descargar y Ejecutar el Proyecto

Si deseas ejecutar este proyecto en otra computadora, sigue estos pasos:

### Clonar el Repositorio

Primero, clona el repositorio de SystemSales desde GitHub a tu computadora local:

## Cómo Empezar

1. Clona este repositorio: `git clone <https://github.com/sorvylenny/AppSystemSale>`
2. Instala las dependencias: `npm install ` 
3. Inicia la aplicación: `ng serve`
4. Abre tu navegador web y visita `http://localhost:4200/`
5. Validar el enviroments que este en  `http://www.systemsales.somee.com/api/` si no le da alli descargue el backend y cambielo al localhost.
6. El backend está implementado en .NET y se encuentra disponible en el siguiente enlace: [http://www.systemsales.somee.com/swagger/index.html](http://www.systemsales.somee.com/swagger/index.html). Para ejecutar localmente, copia esta URL y tendrás acceso a todas las funcionalidades del sistema.

¡Disfruta explorando la aplicación!

## Autor

Este proyecto fue desarrollado por `Katherine Flores` <floresmKatherine@gmail.com>.
