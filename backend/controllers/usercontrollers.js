import { userModel } from "../models/userModels.js";
import jwt from "jsonwebtoken";
//crear usuarios
//eliminar usuarios
//actualizar usuarios
//traer usuarios
//traer un usuario 
//logear un usuario

export default {
    //asincrono significa que se puede tardar en ejecutar
    createUser: async (req, res)=>{
        try {
            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;

            if(!name || !password || !email){
                res.status(400).json({
                    "msg":"parametros invalidos"
                })
            }

            const user = {
                name: name,
                password: password,
                email: email
            }

            await userModel.create(user);
            res.status(200).json({
                "msg": "usuario creado con exito"
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"ocurrio un error al crear un usuario"});
            return;

        }
    }, 
    deleteUser:async (req, res) =>{
        try {
            const id= req.params.id
            const user = await userModel.findById(id);
            if(!user){
                res.status(400).json({
                    "msg": "No se encontro usuario para eliminar"
                })
                return;
            }
            await userModel.deleteOne({
                _id:id
            });
            res.status(200).json({
                "msg": "Usuario eliminado con exito"
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"ocurrio un error al eliminar un usuario"});
            return;
            
        }
    },
    updateUser: async (req, res)=>{
        try {
            const id = req.params.id;
            const user = await userModel.findById(id);
            if(!user){
                res.status(400).json({
                    "msg": "No se encontro usuario para actualizar"
                })
                return;
            }

            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;

            if(!name || !password || !email){
                res.status(400).json({
                    "msg":"parametros invalidos"
                })
                return;
            }
            await userModel.findByIdAndUpdate(id,{
                $set:{
                    name:name,
                    password:password,
                    email:email
                }
            });
            res.status(200).json({
                "msg":"Usuario actualizado con exito"
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"ocurrio un error al actualizar un usuario"
            });
            return;
            
        }
    },
    getAllUsers: async (req, res)=>{
        try {
            const users = await userModel.find();
            res.status(200).json({
                "msg":"Usuarios obtenidos con exito", users
            });
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg:"ocurrio un error al obtener usuarios"
            });
            return;
        }
    },
    getUser: async (req, res)=>{
        try {
            const id = req.params.id;
            const user = await userModel.findById(id);
            if (!user) {
                res.status(400).json({
                    "msg":"No se encontro usuario"
                })
                return;
            }
            res.status(200).json({
                "msg":"Usuario encontrado con exito", user
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "msg":"ocurrio un error al obtene usuario"
            });
            return;
        }
    },
    login: async (req, res)=>{
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await userModel.findOne({email, password});
            if (!user) {
                res.status(401).json({
                    "msg":"Credenciales invalidas"
                })
                return;
            }
            const token = jwt.sign(JSON.stringify(user), "shhhh");
            res.status(200).json({
                "msg":"Logueado con exito", token, user
            })
            return;
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "msg":"ocurrio un error al loguear usuarios"
            });
            return;
        }
    }
}