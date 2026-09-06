# HealthSync Pro

## Descripción

HealthSync Pro es una API REST desarrollada para la gestión básica de información médica. El sistema permite administrar pacientes, médicos, especialidades, citas y diagnósticos, manteniendo las relaciones entre las diferentes entidades.

La aplicación fue desarrollada utilizando NestJS y TypeORM, con MySQL como sistema de gestión de base de datos.

Entre sus principales funcionalidades se encuentran la gestión de pacientes, médicos y especialidades, la asignación de especialidades a los médicos, el registro de citas médicas y la creación de diagnósticos asociados a cada cita.

---

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías:

* **Node.js**
* **NestJS**
* **TypeScript**
* **TypeORM**
* **MySQL**
* **class-validator**
* **class-transformer**
* **Postman** para realizar pruebas de los endpoints.
* **Git y GitHub** para el control de versiones y trabajo colaborativo.

---

## Funcionalidades principales

HealthSync Pro cuenta con los siguientes módulos:

### Pacientes

Permite gestionar la información de los pacientes mediante operaciones CRUD.

Información registrada:

* Nombre
* Apellido
* Documento
* Fecha de nacimiento
* Teléfono
* Correo electrónico
* Dirección

### Médicos

Permite registrar y administrar la información de los médicos.

Información registrada:

* Nombre
* Apellido
* Documento
* Teléfono
* Correo electrónico

### Especialidades

Permite administrar las diferentes especialidades médicas disponibles en el sistema.

### Médico - Especialidad

Permite asignar una o varias especialidades a un médico mediante una entidad intermedia.

Esta relación permite que un médico pueda tener diferentes especialidades y que una especialidad pueda estar asociada a diferentes médicos.

### Citas

Permite registrar y administrar las citas médicas.

Cada cita está relacionada con:

* Un paciente.
* Un médico y su especialidad.

Además, se implementaron validaciones para:

* Evitar registrar citas en fechas pasadas.
* Evitar que un médico tenga dos citas programadas para la misma fecha y hora.
* Verificar que el paciente exista.
* Verificar que la relación médico-especialidad exista.

### Diagnósticos

Permite registrar diagnósticos asociados a una cita médica.

También se implementaron restricciones para evitar eliminar una cita cuando existen diagnósticos asociados a ella.

---

## Relaciones del sistema

El modelo de datos implementa las siguientes relaciones principales:

```text
Paciente
   │
   │ 1:N
   ▼
Cita
   │
   │ N:1
   ▼
Médico - Especialidad
   ▲               ▲
   │               │
   │ N:1           │ N:1
   │               │
Médico        Especialidad


Cita
 │
 │ 1:N
 ▼
Diagnóstico
```

---

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* MySQL
* Git

También se recomienda utilizar:

* Visual Studio Code
* MySQL Workbench
* Postman

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/erlin-martinez-ds/healthsync-pro.git
```

### 2. Ingresar a la carpeta del proyecto

```bash
cd healthsync-pro
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## Configuración de la base de datos

Antes de ejecutar el proyecto, se debe crear una base de datos en MySQL.

Por ejemplo:

```sql
CREATE DATABASE healthsync_pro;
```

Luego se debe configurar la conexión mediante un archivo `.env`.

---

## Variables de entorno

Crear un archivo llamado:

```text
.env
```

en la raíz del proyecto.

Ejemplo de configuración:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
DB_DATABASE=healthsync_pro
```

> **Importante:** No se debe subir el archivo `.env` al repositorio, ya que puede contener información sensible como contraseñas de acceso a la base de datos.

---

## Ejecución del proyecto

### Modo desarrollo

```bash
npm run start:dev
```

### Modo normal

```bash
npm run start
```

Una vez iniciado el servidor, la API estará disponible en:

```text
http://localhost:3000
```

---

## Compilación del proyecto

Para comprobar que el proyecto compila correctamente:

```bash
npm run build
```

---

## Endpoints principales

### Pacientes

```text
GET    /pacientes
GET    /pacientes/:id
POST   /pacientes
PATCH  /pacientes/:id
DELETE /pacientes/:id
```

### Médicos

```text
GET    /medicos
GET    /medicos/:id
POST   /medicos
PATCH  /medicos/:id
DELETE /medicos/:id
```

### Especialidades

```text
GET    /especialidades
GET    /especialidades/:id
POST   /especialidades
PATCH  /especialidades/:id
DELETE /especialidades/:id
```

### Médico - Especialidad

```text
GET    /medico-especialidad
GET    /medico-especialidad/:id
POST   /medico-especialidad
PATCH  /medico-especialidad/:id
DELETE /medico-especialidad/:id
```

### Citas

```text
GET    /citas
GET    /citas/:id
GET    /citas/:id/detalle
POST   /citas
PATCH  /citas/:id
DELETE /citas/:id
```

### Diagnósticos

```text
GET    /diagnosticos
GET    /diagnosticos/:id
POST   /diagnosticos
PATCH  /diagnosticos/:id
DELETE /diagnosticos/:id
```

---

## Consulta detallada de una cita

El proyecto cuenta con un endpoint para obtener la información completa de una cita:

```text
GET /citas/:id/detalle
```

La respuesta incluye información relacionada con:

* La cita.
* El paciente.
* El médico.
* La especialidad.
* Los diagnósticos asociados.

Ejemplo:

```json
{
  "id_cita": 4,
  "fecha": "11/09/2026, 10:00",
  "motivo": "Consulta de control cardiológico",
  "paciente": {
    "nombre": "Juan",
    "apellido": "Pérez"
  },
  "medico": {
    "nombre": "Carlos",
    "apellido": "Rodriguez",
    "especialidad": {
      "nombre": "Cardiología"
    }
  },
  "diagnosticos": [
    {
      "descripcion": "Hipertensión arterial. Se recomienda realizar seguimiento médico"
    }
  ]
}
```

---

## Validaciones implementadas

Entre las principales validaciones implementadas se encuentran:

* Validación de datos mediante DTOs.
* Validación de tipos de datos.
* Verificación de campos obligatorios.
* Verificación de la existencia de registros relacionados.
* Restricción de citas en fechas pasadas.
* Prevención de citas duplicadas para un mismo médico en la misma fecha y hora.
* Prevención de asignaciones duplicadas entre médico y especialidad.
* Manejo de registros inexistentes mediante respuestas `404`.
* Restricción para eliminar citas que tengan diagnósticos asociados.

---

## Pruebas realizadas

Los endpoints fueron probados utilizando Postman.

Se realizaron pruebas para verificar:

* Creación de registros.
* Consulta individual y consulta general.
* Actualización de información.
* Eliminación de registros.
* Manejo de registros inexistentes.
* Validación de relaciones entre entidades.
* Validación de citas duplicadas.
* Validación de fechas.
* Restricciones de eliminación.
* Consulta detallada de citas.

Finalmente, el proyecto fue compilado correctamente utilizando:

```bash
npm run build
```

---

## Control de versiones

El proyecto utiliza Git y GitHub para el control de versiones.

El desarrollo se realizó utilizando ramas y Pull Requests para integrar los cambios al branch principal:

```text
main
```

---

## Integrantes

* Erlin Martinez
* Milton Pillimue
* Jhonier Burbano

---

## Estado del proyecto

API desarrollada y funcional.

Las funcionalidades principales fueron implementadas, probadas mediante Postman y compiladas correctamente.
