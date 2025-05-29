import express from 'express';
import mongoose from 'mongoose';
import { DatesModel } from './models/DatesModel.js';

mongoose.connect('mongodb://localhost:27017/citas')
.then(()=>{
    console.log('¡La conexión ha sido exitosa!')
})
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hola desde mi servidor') //<- Es un endpoint
});

app.post('/create',(req,res)=>{
    const name = req.body.name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const date = req.body.date;
    const description = req.body.description;
    const email = req.body.email;

    if(!name || !last_name || !age || !date || !description || !email){
        return res.status(400).json({
            msg:'¡Necesitamos todos los valores para almacenar un documento!'
        })
    }
    const obj = {
        Name: name,
        Last_name: last_name,
        Age: age,
        Date: date,
        Description: description,
        Email: email,
    };
    DatesModel.create(obj);
    return res.status(200).json({
        msg:'¡Cita almacenada con éxito!'
    })
})

app.listen(4000,()=>{
    console.log('¡Servidor en linea!');
    
})