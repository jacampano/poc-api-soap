const http = require('http');
const soap = require('strong-soap').soap;
const fs = require('fs');
const path = require('path');
const { parseXML, buildXML } = require('./utils/xmlUtils');

// Ruta al archivo XML donde guardaremos las tareas
const tasksFilePath = path.resolve(__dirname, './data/tasks.xml');

// Definir el servicio SOAP
const service = {
  TaskService: {
    TaskPort: {
      // Método para obtener todas las tareas
      getAllTasks: (_, callback) => {
        console.log('Solicitud recibida para GetAllTasks');
        //const tasks = loadTasks(); // Obtener las tareas
        parseXML(tasksFilePath)
        .then(data => { callback(null, { tasks: data.tasks || [] }); })
        .catch(err => callback(err));        
      },
      
      // Método para obtener una tarea por ID
      getTaskById(args, callback) {
        const { id } = args;
        parseXML(tasksFilePath)
        .then(data => {
            const tasks = data.tasks?.task || [];
            const task = tasks.find(t => t.id === id);
            if (!task) return callback(new Error('Task not found'));
            callback(null, { task });
        })
        .catch(err => callback(err));
      },

      // Método para crear una nueva tarea
      createTask(args, callback) {
        const { title, completed } = args;
        const task = { id: Date.now(), title, completed: completed === 'true' };        
        parseXML(tasksFilePath)
        .then(data => {
            const tasks = data.tasks?.task || [];
            tasks.push(task); // Agregar nueva tarea
            return buildXML(tasksFilePath, { tasks: { task: tasks } });
        })
        .then(() => callback(null, { task }))
        .catch(err => callback(err));
      },

      // Método para actualizar una tarea por ID
      updateTask(args, callback) {
        const { id, title, completed } = args;
        const task = { id, title, completed: completed === 'true' }; 
        parseXML(tasksFilePath)
        .then(data => {
            let tasks = data.tasks?.task || [];
            let index = tasks.findIndex(t => t.id === task.id);
            if (index === -1) return callback(new Error('Task not found'));
            tasks[index] = task; // Actualizar la tarea
            return buildXML(tasksFilePath, { tasks: { task: tasks } });
        })
        .then(() => callback(null, { task }))
        .catch(err => callback(err));        
      },

      // Método para eliminar una tarea por ID
      deleteTask(args, callback) {
        const { id } = args;
        parseXML(tasksFilePath)
        .then(data => {
            let tasks = data.tasks?.task || [];
            tasks = tasks.filter(t => t.id !== id); // Eliminar tarea
            return buildXML(tasksFilePath, { tasks: { task: tasks } });
        })
        .then(() => callback(null, { success: true }))
        .catch(err => callback(err));
      },
    },
  },
};

// Definir el archivo WSDL para el servicio
const wsdlFilePath = path.join(__dirname, 'tasks.wsdl');
const xml = fs.readFileSync(wsdlFilePath, 'utf8');

const server = http.createServer((req, res) => {
  res.end('SOAP API for tasks is running!');
});

// Inicializar el servicio SOAP
const soapServer = soap.listen(server, '/tasks', service, xml);

// Iniciar el servidor HTTP en el puerto 3000
server.listen(4000, () => {
  console.log('Servidor SOAP escuchando en http://localhost:4000/tasks');
});
