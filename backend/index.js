import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usercontrollers from "./controllers/usercontrollers.js";

mongoose.connect('mongodb://localhost:27017/evaluacionTutores')
.then(() => {
    console.log('¡La conexión ha sido exitosa!');
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
res.send('Hola desde mi servidor');
});

app.post('/create', (req, res) => {
const { name, last_name, email } = req.body;

if (!name || !last_name || !email) {
    return res.status(400).json({
    msg: '¡Necesitamos todos las respuestas para almacenar un documento!',
    });  }

const obj = {
    Name: name,
    Last_name: last_name,
    Email: email,
};

  // Simulación de guardado
console.log("Datos recibidos:", obj);

return res.status(200).json({
    msg: '¡Formulario registrado con éxito!',
});
});

app.get('/dates', async (req, res) => {
const response = await DatesModel.find();
return res.status(200).json(response);
});

// guardar respuestas del cuestionario
app.post('/save-answers', (req, res) => {
const { TutorName, StudentName, Subject, respuestas } = req.body;

if (!TutorName || !StudentName || !Subject || !respuestas) {
    return res.status(400).json({
    msg: 'Faltan campos obligatorios',
    });
}

  // Simula almacenamiento en DB
console.log("Respuestas del formulario:");
console.log("Tutor:", TutorName);
console.log("Estudiante:", StudentName);
console.log("Materia:", Subject);
console.log("Respuestas:", respuestas);

return res.status(200).json({
    msg: 'Respuestas almacenadas con éxito',
});
});

// Rutas de usuarios
app.post("/user/create", usercontrollers.createUser);
app.delete("/user/delete/:id", usercontrollers.deleteUser);
app.put("/user/update/:id", usercontrollers.updateUser);
app.get("/users", usercontrollers.getAllUsers);
app.get("/user/:id", usercontrollers.getUser);
app.post("/login", usercontrollers.login);

app.listen(4000, () => {
console.log('¡Servidor en línea en el puerto 4000!');
});
