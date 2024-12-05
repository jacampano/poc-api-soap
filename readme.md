# SOAP API Example

## Descripción
Ejemplo de API que gestiona tareas

## Requisitos

- Node.js

## Instalación

1. Abre un terminal en la carpeta `soap-api-example`.
2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```
3. Ejecuta el siguiente comando para levantar la SOAP REST:

```bash
npm start
```

La API se levantará en http://localhost:4000/tasks


## Datos
Las tareas se guardan en .\data\tasks.xml

## Uso API
**getAllTasks:** Lista todas las tareas.
* Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tas="http://www.example.org/tasks">
    <soapenv:Header/>
    <soapenv:Body>
        <tas:getAllTasks/>
    </soapenv:Body>
</soapenv:Envelope>
```
* Response: 200

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Header/>
    <soap:Body>
        <ns1:getAllTasksResponse xmlns:ns1="http://www.example.org/tasks">
            <tasks>
                <task>
                    <id>id</id>
                    <title>nombreTarea</title>
                    <completed>true|false</completed>
                </task>
            </tasks>
        </ns1:getAllTasksResponse>
    </soap:Body>
</soap:Envelope>
```

**getTaskById:** Obtiene una tarea por su ID.
* Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tas="http://www.example.org/tasks">
   <soapenv:Header/>
   <soapenv:Body>
      <tas:getTaskById>
         <id>id</id>
      </tas:getTaskById>
   </soapenv:Body>
</soapenv:Envelope>
```
* Response: 200

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Header/>
   <soap:Body>
      <ns1:getTaskByIdResponse xmlns:ns1="http://www.example.org/tasks">
         <task>
            <id>id</id>
            <title>nombreTarea</title>
            <completed>true|false</completed>
         </task>
      </ns1:getTaskByIdResponse>
   </soap:Body>
</soap:Envelope>
```

**createTask:** Crea una nueva tarea.
* Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tas="http://www.example.org/tasks">
   <soapenv:Header/>
   <soapenv:Body>
      <tas:createTask>
         <title>nombreTarea</title>
         <completed>true|false</completed>
      </tas:createTask>
   </soapenv:Body>
</soapenv:Envelope>
```
* Response: 200

```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Header/>
   <soap:Body>
      <ns1:createTaskResponse xmlns:ns1="http://www.example.org/tasks">
         <task>
            <id>id</id>
            <title>nombreTarea</title>
            <completed>true|false</completed>
         </task>
      </ns1:createTaskResponse>
   </soap:Body>
</soap:Envelope>
```

**updateTask:** Actualiza una tarea por su ID.
* Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tas="http://www.example.org/tasks">
   <soapenv:Header/>
   <soapenv:Body>
      <tas:updateTask>
         <id>id</id>
         <title>nombreTareaActualizada</title>
         <completed>true|false (actualizado)</completed>
      </tas:updateTask>
   </soapenv:Body>
</soapenv:Envelope>
```
* Response: 200
```xml
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
   <soap:Header/>
   <soap:Body>
      <ns1:updateTaskResponse xmlns:ns1="http://www.example.org/tasks">
         <task>
            <id>id</id>
            <title>nombreTarea</title>
            <completed>true|false</completed>
         </task>
      </ns1:updateTaskResponse>
   </soap:Body>
</soap:Envelope>
```

**deleteTask:** Elimina una tarea por su ID.
* Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tas="http://www.example.org/tasks">
   <soapenv:Header/>
   <soapenv:Body>
      <tas:deleteTask>
         <id>id</id>
      </tas:deleteTask>
   </soapenv:Body>
</soapenv:Envelope>
```
* Response: 200
```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Body>
    <ns1:deleteTaskResponse xmlns:ns1="http://www.example.org/tasks">
      <success>true</success>
    </ns1:deleteTaskResponse>
  </soap:Body>
</soap:Envelope>
```

Para más información, después de levantar la API navegar al WSDL: http://localhost:4000/tasks?wsdl