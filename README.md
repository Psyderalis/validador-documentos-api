
# Validador de Revisión Técnica

Esta API permite validar certificados de revisión técnica en formato PDF o imagen (JPG/PNG). El servicio procesa el documento utilizando OCR, análisis de metadatos y lectura de código QR para identificar signos de manipulación o adulteración. Como resultado, la API devuelve un informe indicando si el documento es válido o presenta alteraciones.

## Flujo de funcionamiento

#### Carga de documento

El cliente envía un archivo PDF o imagen mediante un endpoint de carga.

#### Procesamiento

OCR: extrae el texto y datos clave del certificado.

Metadatos: analiza información técnica del archivo (software usado, fechas de creación/modificación, etc.).

Código QR: decodifica el contenido y lo valida con la información extraída.

#### Análisis de señales

Se identifican inconsistencias, patrones sospechosos o campos alterados.

#### Respuesta

Devuelve un JSON con:
```
{
  "valid": true,
  "signals": [],
}
```

Donde:

```valid```: indica si el documento es auténtico.

```signals```: lista de alertas o anomalías detectadas.

### Endpoints

POST /api/documents - Recibe y guarda un documento  
GET /api/documents/{document-name} - Inicia el análisis y entrega un resultado  

#### Formatos soportados

PDF, JPG, PNG

#### Tecnologías utilizadas

* Node.js / Express
* Tesseract OCR
* ExifTool
* Sharp
* jsQR
* pdf2pic


## Instalación y uso

#### 1. Clonar el repositorio
```
git clone https://github.com/Psyderalis/validador-documentos-api.git
cd validador-documentos-api
```
#### 2. Instalar dependencias del sistema
Para que la librería pdf2pic funcione correctamente, asegúrate de tener instalados:
* GraphicsMagick
* Ghostscript
Info: https://github.com/yakovmeister/pdf2image#readme
##### IMPORTANTE: para ejecutar correctamente pdf2pic la ruta absoluta del archivo a convertir NO debe tener espacios.

#### 3. Instalar dependencias de Node.js
```
npm install
```
#### 4. Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias:
```
PORT=3000
```
#### 5. Crear una carpeta "uploads/"

Debes crear esta carpeta en la raíz del proyecto para guardar ahí los documentos.

#### 6. Ejecutar la API
```
npm start
```
¡Listo! ya puedes usar los endpoints.

### Alcances:
Para que la aplicación pueda validar correctamente el certificado, la imagen de este debe ser nítida.

### Futuras mejoras:
* Historial de documentos verificados
* Comparación visual del archivo contra plantillas válidas
* Sistema de usuarios con autenticación
* Dockerizar
* Pruebas unitarias

